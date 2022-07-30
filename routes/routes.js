const fs = require("fs");
const dotenv = require("dotenv");
const { htmlDocs } = require("./htmlHandler");
const { styleSheets } = require("./styleSheetHandler");
const { mainScript } = require("./mainScriptHandler");
const { publicImages } = require("./publicAssetHandler");
const { dataBase } = require("./dataBaseHandler");
const { connectToDataBase } = require("../utilities/database.js");
const { validPathList } = require("../utilities/validPaths");

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

  if (!validPathList.includes(path)) {
    fs.readFile("./view/pageNotFound.html", null, (err, html) => {
      if (err) throw err;
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write(html);
      res.end();
    });
  }
};

module.exports = routeHandlers;
