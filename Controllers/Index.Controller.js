const createError = require("http-errors");
const Index = require("../Models/Index");
const Offer = require("../Models/Offer");
const Term = require("../Models/Term");
const Merge = require("../Models/Merge");
var similarity = require( 'compute-cosine-similarity' );
const StopWords = require("../Models/StopWord");
const axios = require('axios');
const { SuccessResponse } = require("../Helpers/Response.Helper");
const Vector = require("../Models/Vector");
let offerCount = 0;
let docWordsCount = [];
let vectors = [];
const offersInPage = 500;
const termsInPage = 2000;
const mergesInPage = 2000;

const removeStopWords = async (results) => {
  const stopWords = await StopWords.find();
  const stopWordsList = convert(stopWords);
  return results.filter(function (el) {
    return !stopWordsList.includes(el.token)&&!isNumeric(el.token);
  });
}
const tokenization = (results) => {
  tokens = [];
  results.forEach((element) =>
    (element.description + " " +
    element.offerType.offerTypeArabicName +  " " +
    element.businessOffer.BusinessOfferArabicName +  " " +
    element.region.regionArabicName +  " " +
    element.region.province.provinceArabicName)   
    .split(/[\s,\n:.]+/)
      .map((ee) => tokens.push({ token: ee, offerId: element._id }))
  );
  return tokens;
};

const tokenizationQuery = (query) => {
  tokens = [];
  query.split(" ").map((ee) => tokens.push({ token: ee, offerId:1 }))
  return tokens;
};


const editMerger = (merger, term) => {
  for(let i=0;i<merger.length;i++) {
    if (merger[i].term.term == term.term 
      && merger[i].term.offerId == term.offerId
      ) {
      
      merger[i].frequency = merger[i].frequency + 1;
      return merger;
    }
  }
  merger.push({ term: term, frequency: 1 });
  return merger;
};

const convert = (stopWords) => {
  let list = [];
  stopWords.forEach((element) => list.push(element.word));
  return list;
};

const merge = async() => {
  const mergesCount = await Merge.countDocuments()
  if(mergesCount!==0){
    console.log("Merging is done already");
    return;
  }
  let i = 0;
  let merger = [];
  const termsCount = await Term.countDocuments()
  let countDone = 0;
  for(;;)
  {
    let terms = await Term.find({}, 
      { 
        "_id":0,
        "__v":0
      },
      {
        skip: termsInPage * (i++),
        limit: termsInPage,
      }
       ).lean();
    if(terms.length === 0) break;
    for(let j=0;j<terms.length;j++)
    {
      merger = editMerger(merger, terms[j]);
    }
    countDone += terms.length;
    console.log("Merging: %i %",countDone / termsCount*100)
  }
  merger.map(merge=>{
    const record = new Merge({term:merge.term,frequency:merge.frequency})
    record.save();
  })
};
const AddToIndex = (index, element) => {
  try
  {
    let check = false;
    index.forEach(async (record) => {
      try{
        if (record.term == element.term.term) {
          record.N_Doc = record.N_Doc + 1;
          record.Tot_Frequency = record.Tot_Frequency + element.frequency;
          record.OfferList.push({
            "offerId":element.term.offerId,
            "frequency":1,
            "tf_idf":1
          });
          check = true;
          return;
        }
      }
      catch(error){
        return "error ",error;
      }
    });

    if (!check) {
      let offers = [];
      offers.push({
        "offerId":element.term.offerId,
        "frequency":1,
        "tf_idf":1
      });
      index.push({
        term: element.term.term,
        N_Doc: 1,
        Tot_Frequency: element.frequency,
        OfferList: offers,
      });
    }
    return index; //final;
  }
  catch(error){
    return "error ",error;
  }
};

const build = async () => {
  try {
    const indexsCount = await Index.countDocuments()
    if(indexsCount!==0){
      console.log("Index is done already");
      return;
    }
    let i = 0;
    let index = [];
    const mergesCount = await Merge.countDocuments()
    let countDone = 0;
    for(;;)
    {
      let merges = await Merge.find({}, 
        { 
          "_id":0,
          "__v":0
        },
        {
          skip: mergesInPage * (i++),
          limit: mergesInPage,
        }
        ).lean();

      if(merges.length === 0) break;
      merges.forEach(element => {
        index = AddToIndex(index, element);
      });
      countDone += merges.length;
      console.log("Indexing: %i %",countDone / mergesCount*100)
    }
    index.map(element => {
      const record = new Index(element);
      record.save();
    });
    return index; //final;
  }
  catch(error){
    return "error ",error;
  }
  
};
function isNumeric(num){
  return !isNaN(num)
}
const calcTfIDF = async (final) => {
  try {
    await final.map(element => {
      let offerList = element.OfferList;
      offerList.map(offer=>{
        const TF = Math.log2(100.0 * offer.frequency / docWordsCount.filter(word=>String(word.key)===String(offer.offerId))[0].value);
        const DF = element.N_Doc
        const IDF = Math.log2(offerCount/DF)
        const TF_IDF = TF*IDF;
        offer.tf_idf = TF_IDF;
        return offer
      })
      element.OfferList = offerList;
      return element
    })
    return final
  }
  catch(error){
    return "error ",error;
  }
}


const setDocWordsCount = (final) => {
  try {
        final.map((element) => {
          let offerList = element.OfferList;
          offerList.map( (offer)=>{
            docWordsCount = docWordsCount.map(word=> String(word.key)===String(offer.offerId)?{key:word.key,value:word.value+1}:word)
            if (!docWordsCount.some(word=>String(word.key)===String(offer.offerId)))
              docWordsCount.push({key:offer.offerId,value:1});
          })
    })
  } catch(error){

  }
}

const convertQuery = async (query) => {
  try {
    let queryMap = []
    query = tokenizationQuery(query);
    query = await removeStopWords(query)
    //send results to python
    await axios.post('http://localhost:8080', 
      {"offers":query}
      ,{headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }})
    .then(async function (response) {
      try {
        query = response.data.offers
        query.map(offer => {
          queryMap = queryMap.map(word=> word.term===offer.token?{term:offer.token,tf_idf:word.tf_idf+1}:word)
          if (!queryMap.some(word=>word.term===offer.token))
            queryMap.push({term:offer.token,tf_idf:1});
          
        })
      } catch(error){
        console.log("error"+error);
      }
    })
    .catch(function (error) {
      console.log("error"+error);
    });
      return queryMap;
    } catch(error){
    console.log("error: ",error);
  }
};
const getIntersection = (leftVector, rightVector) => {
  let newLeftVector = [];
  let newRightVector = [];
  leftVector.map(leftItem=>{
    newLeftVector.push(leftItem.tf_idf)
    for (const rightItem of rightVector)
    {
      if(leftItem.term===rightItem.term){
        newRightVector.push(rightItem.tf_idf)
        break;
      }
    }
    if(newLeftVector.length!==newRightVector.length)
      newRightVector.push(0);
  })
  return {left:newLeftVector,right:newRightVector}
}
const calcCosineSimilarity = async (query) => {
  try {
    let cosineResults = []
    if(vectors.length===0)
      vectors = await Vector.find({})
    vectors.map(vector=>{
      const {left,right} = getIntersection(query,vector.TermList);
      if(left.length===0||right.length===0) return 
      const temp = similarity( left, right )
      if(temp>0) cosineResults.push({offerId:vector.offerId,similarity:temp})
      /*if(temp===1){
        console.log("left");
        console.log(left);
        console.log("right");
        console.log(right);
      }*/
  })
  cosineResults = cosineResults.sort((a, b) => {
    return b.similarity - a.similarity;
  });
  cosineResults = cosineResults.map(offer => offer.offerId);
  
  return cosineResults;
  } catch(error){
    return "error "+error;
  }
}
const filterResult = (offersByText, offersByFilter) => {
  return offersByText.map(offerByText=>{
    for (const offerByFilter of offersByFilter)
      if (String(offerByFilter._id) === String(offerByText)) 
        return offerByFilter;
  }).filter(offer=>{if(offer)return true; else return false;})
}
const stemming = async() => {
  const termsCount = await Term.countDocuments()
  if(termsCount!==0){
    console.log("Stemming is done already");
    return;
  }
  let i = 0;
  let terms = []
  let countDone = 0;
  for(;;)
  {
    let results = await Offer.find({}, 
      { 
        description: 1,
        region: 1,
        offerType: 1,
        businessOffer: 1
      }, {
        skip: offersInPage * i++,
        limit: offersInPage,
      });
    if(results.length === 0) break;
    countDone += results.length;
    results = tokenization(results);
    results = await removeStopWords(results)
    //send results to python
    await axios.post('http://localhost:8080', {
      "offers":results
    },{headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }})
    .then(async function (response) {
      try {
        terms = terms.concat(response.data.offers)
      } catch(error){
        console.log("error"+error);
      }
    })
    .catch(function (error) {
      console.log("error"+error);
    });
    console.log("stemming: %i %",countDone / offerCount*100)
  }
  terms.map(offer => {
    const term = new Term({offerId:offer.offerId,term:offer.token})
    term.save();
  })
}
module.exports = {
  buildIndex: async (req, res, next) => {
    try {
      offerCount = await Offer.countDocuments({});
      await stemming();
      await merge();
      await build();
      res.send(new SuccessResponse(true,"terms"));
      /*      let results = await Offer.find({}, 
        { 
          description: 1,
          region: 1,
          offerType: 1,
          businessOffer: 1
        });

      results = tokenization(results);
      results = await removeStopWords(results)
      //send results to python
      axios.post('http://localhost:8080', {
        "offers":results
      },{headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }})
      .then(async function (response) {
        try {
          var merger_list = await merge(response.data.offers);
          let final = await build(merger_list);
          setDocWordsCount(final)
          final = await calcTfIDF(final);
          await final.forEach((element) => {
            const record = new Index(element);
            record.save();
          });
          res.send(new SuccessResponse(true,{}));
        } catch(error){
          console.log("error"+error);
        }
      })
      .catch(function (error) {
        console.log("error"+error);
      });*/
    } catch (error) {
      console.log("error1"+error.message);
      if (error.name === "ValidationError")
        return next(createError(422, error.message));
      next(error);
    }
  },
  buildOffersVectors: async(req, res, next) => {
    const index = await Index.find({}).lean();
    let vectors = [];
    index.map(entry=>{
      offers = entry.OfferList;
      offers.map(offer=>{
        vectors = vectors.map(vector=> String(vector.offerId)===String(offer.offerId)?
          {...vector,TermList:vector.TermList.concat({term:entry.term,tf_idf:offer.tf_idf})}:vector)
        if (!vectors.some(vector=> String(vector.offerId)===String(offer.offerId)))
          vectors.push({offerId:offer.offerId,TermList:[{term:entry.term,tf_idf:offer.tf_idf}]});
      })
    });
    vectors.map(vector => {
      const record = new Vector(vector);
      record.save();
    })
    res.send(new SuccessResponse(true,{}));
  },
  /*
  buildOffersVectors: async(req, res, next) => {
    let index = await Index.find({}).lean();
    let vectors = [];
    let offers = []
    index.splice(0,2600)
    index.map(entry=>{
      offers = entry.OfferList;
      offers.map((offer)=>{
        console.log(offer)
        //vectors = vectors.map(vector=> String(vector.OfferId)===String(offer._id)?
        //  {...vector,TermList:vector.TermList.concat({term:entry.term,tf_idf:offer.tf_idf})}:vector)
        //if (!vectors.some(vector=> String(vector.OfferId)===String(offer._id)))
        //  vectors.push({OfferId:offer._id,TermList:[{term:entry.term,tf_idf:offer.tf_idf}]});
      })
    });
    vectors.map(vector => {
      const record = new Vector(vector);
      record.save();
    })
    res.send(new SuccessResponse(true,{}));
  },*/
  searchQuery: async(req, res, next) => {
    let query = "الحمدانية ٦٠٦ , ط ١ اربع اتجاهات مساحة ٣٢٠ متر \n٧ غرف وصالون حمامين البناء مدخلين امامي خلفي وضع البيت وسط تسليم اسكان السعر ٧٣٠ مليون وبازار خفيف "
    let queryMap = await convertQuery(query);
    //console.log("queryMap",queryMap);
    const vectors = await calcCosineSimilarity(queryMap);
    res.send(new SuccessResponse(true,{vectors}));
  },
  searchByText: async(query, offers) => {
    let queryMap = await convertQuery(query);
    const result = await calcCosineSimilarity(queryMap);
    const resultAfterFilter = filterResult(result, offers);
    return resultAfterFilter;
  }
};
