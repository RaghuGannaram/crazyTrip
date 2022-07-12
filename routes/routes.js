const dotenv = require("dotenv");
const { htmlDocs } = require("./htmlHandler");
const { styleSheets } = require("./styleSheetHandler");
const { mainScript } = require("./mainScriptHandler");
const { publicImages } = require("./publicAssetHandler");
const { dataBase } = require("./dataBaseHandler");
const { connectToDataBase } = require("../utilities/Database.js");

dotenv.config();
connectToDataBase();

const routeHandlers = (req, res) => {
  const baseURL = req.protocol + "://" + req.headers.host + "/";
  const reqURL = new URL(req.url, baseURL);
  const path = reqURL.pathname;

  htmlDocs(req, res, path);
  styleSheets(req, res, path);
  mainScript(req, res, path);
  dataBase(req, res, path);
  publicImages(req, res, path);

};

module.exports = routeHandlers;
