const fs = require("fs");

function mainScript(req, res, path) {
  if (path == "/javascript/main.js") {
    fs.readFile("./utilities/main.js", null, (err, jscode) => {
      if (err) throw err;
      res.writeHead(200, { "Content-Type": "application/javascript" });
      res.write(jscode);
      res.end();
    });
  }
}

module.exports = {
  mainScript,
};
