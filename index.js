const http = require("http");
const fs = require("fs");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");
const routeHandler = require("./routes/routes.js");

const port = process.env.PORT || 3000;
const runHelmet = helmet.contentSecurityPolicy({
  directives: {
    "script-src": ["'self'", "'unsafe-inline'"],
  },
  reportOnly: true,
});
const logger = morgan("dev", {
  // skip: (req, res) => (res.statusCode < 400),
  // stream: fs.createWriteStream(path.join(__dirname,"/logs/" , "access.log"), {flags: 'w'})
});

const httpServer = http.createServer((req, res) => {
  runHelmet(req, res, (err) => {
    if (err) {
      res.statusCode = 500;
      res.end("Unexpected error while configuring Helmet");
    }
    logger(req, res, (err) => {
      if (err) {
        res.statusCode = 500;
        res.end("Unexpected error while configuring Morgan");
      }
      routeHandler(req, res);
    });
  });
});

httpServer.listen(port, () => {
  console.log(`travelblog started at 127.0.0.1:${port}`);
});
