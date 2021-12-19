const transport = require("../Config/InitiateMail.Config");
const OTP = require("../Models/OTP");
const moment = require("moment");

//Generate Code
generateCodeAndSaveIt = async (email) => {
  return new Promise((resolve, reject) => {
    (async () => {
      const digits = "0123456789";
      let randomNum = "";
      for (let i = 0; i < 5; i++) {
        randomNum += digits[Math.floor(Math.random() * 10)];
      }

      const { otpCode } = await OTP.findOneAndUpdate(
        { email },
        {
          email: email,
          otpCode: randomNum,
          expiryDate: moment.utc().add(1, "hours"),
        },
        {
          new: true,
          upsert: true,
        }
      );
      resolve(otpCode);
    })();
  });
};

// Send mail in otpCode
sendMail = (to, subject, text) => {
  try {
    const message = {
      from: process.env.REAL_ESTATE_EMAIL,
      to,
      subject,
      text,
    };

    transport.sendMail(message);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  generateCodeAndSendMail: async (to, subject) => {
    const otpCode = await generateCodeAndSaveIt(to);
    sendMail(to, subject, otpCode);
  },
};

// send message example

// const message = {
//     from: 'elonmusk@tesla.com', // Sender address
//     to: 'to@email.com',         // List of recipients
//     subject: 'Design Your Model S | Tesla', // Subject line
//     text: 'Have the most fun you can in a car. Get your Tesla today!' // Plain text body
// };
// transport.sendMail(message, function(err, info) {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log(info);
//     }
// });
