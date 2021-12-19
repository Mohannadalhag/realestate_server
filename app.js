const express = require("express");
const morgan = require("morgan");
//const winston = require("./config/InitiateWinston.Config");
const createError = require("http-errors");
const cors = require("cors");
const { LINK_NOT_FOUND } = require("./Helpers/ServerErrors.Helper");
const { ErrorResponse } = require("./Helpers/Response.Helper");
require("dotenv").config();
require("./Config/InitiateMongoDB.Config");
require("./Config/firebase/init_firebase");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./Documentation/Api/Doc.yml");

const AuthenticationRoute = require("./Routes/Authentication.Route");
const ProfileRoute = require("./Routes/Profile.Route");
const OfferRoute = require("./Routes/Offer.Route");
// const StaticValuesRoute = require("./Routes/StaticValues.route");
// const KeyWordsRoute = require("./Routes/KeyWords.route");
const IndexRoute = require("./Routes/Index.route");
const SearchRoute = require("./Routes/Search.route");

const TestRoute = require("./Routes/Test.route");

// import dashboard routes
const GenderRoute = require("./Routes/dashboard/GenderDashboard.Route");
const RoleRoute = require("./Routes/dashboard/RoleDashboard.Route");
const UserRoute = require("./Routes/dashboard/UserDashboard.Route");
const ProvinceRoute = require("./Routes/dashboard/ProvinceDashboard.Route");
const DashboardOfferRoute = require("./Routes/dashboard/Dashboard.Offer.Route");

const app = express();
//app.use(morgan("combined", { stream: winston.stream }));
//app.use(morgan("combined"));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

const fs = require("fs");
const dir = "./images";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

app.use("/images", express.static("images"));
app.use("/auth", AuthenticationRoute);
app.use("/profile", ProfileRoute);
app.use("/offer", OfferRoute);
app.use("/index", IndexRoute);
app.use("/test", TestRoute);

// app.use("/static-values", StaticValuesRoute);
// app.use("/keywords", KeyWordsRoute);
// app.use("/index", IndexRoute);
app.use("/search", SearchRoute);

// set dashboard routes
const PREFIX_DASHBOARD_URL = "/dashboard";
app.use(PREFIX_DASHBOARD_URL + "/gender", GenderRoute);
app.use(PREFIX_DASHBOARD_URL + "/role", RoleRoute);
app.use(PREFIX_DASHBOARD_URL + "/user", UserRoute);
app.use(PREFIX_DASHBOARD_URL + "/province", ProvinceRoute);
app.use(PREFIX_DASHBOARD_URL + "/offer", DashboardOfferRoute);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { explorer: true })
);

app.use(async (req, res, next) => {
  next(
    createError.NotFound({
      array_error: [
        new ErrorResponse(
          "app (root application)",
          "params",
          "This Link does not found"
        ),
      ],
      code: LINK_NOT_FOUND,
    })
  );
});

//Error handler
app.use((err, req, res, next) => {
  // // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get("env") === "development" ? err : {};

  // add this line to include winston logging
  //--------------------------------------------
  // const winstonResponse = JSON.stringify({
  //   success: false,
  //   error: {
  //     status: "" + err.status || "500",
  //     code: "" + err.message.code,
  //     elements: err.message.array_error,
  //   },
  // });

  // winston.error(
  //   `${req.method} - ${req.originalUrl} - ${req.ip} - ${winstonResponse} `
  // );
  res.status(err.status || 500);
  res.send({
    success: false,
    error: {
      status: "" + err.status || "500",
      code: "" + err.message.code,
      elements: err.message.array_error,
    },
  });
});

const PORT = process.env.PORT || 3008;
const HOST = process.env.HOST;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`and API Documentation on url : http://${HOST}:${PORT}/api-docs`);
});
