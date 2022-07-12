const fs = require("fs");

function styleSheets(req, res, path) {
    function renderSheet(fileLocation) {
      res.writeHead(200, { "Content-Type": "text/css" });
      let content = fs.readFileSync(fileLocation, "utf8");
      res.write(content);
      res.end();
    }
  
    if (path == "/css/style.css") renderSheet("./view/css/style.css");
    if (path == "/css/normalize.css") renderSheet("./view/css/normalize.css");
  }

  module.exports = {
    styleSheets
  };