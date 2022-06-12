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

function publicImages(req, res, path) {
  function renderImage(fileLocation) {
    res.writeHead(200, { "Content-type": "image/jpg" });
    let img = fs.readFileSync(fileLocation, "binary");
    res.write(img, "binary");
    res.end();
  }
  if (path == "/public/favicon.png") renderImage("./public/favicon.png");
  if (path == "/images/card-image-1.jpg") renderImage("./public/card-image-1.jpg");
  if (path == "/images/card-image-2.jpg") renderImage("./public/card-image-2.jpg");
  if (path == "/images/card-image-3.jpg") renderImage("./public/card-image-3.jpg");
  if (path == "/images/card-image-4.jpg") renderImage("./public/card-image-4.jpg");
  if (path == "/images/grid-image-1.jpg") renderImage("./public/grid-image-1.jpg");
  if (path == "/images/grid-image-2.jpg") renderImage("./public/grid-image-2.jpg");
  if (path == "/images/grid-image-3.jpg") renderImage("./public/grid-image-3.jpg");
  if (path == "/images/grid-image-4.jpg") renderImage("./public/grid-image-4.jpg");
  if (path == "/images/grid-image-5.jpg") renderImage("./public/grid-image-5.jpg");
  if (path == "/images/grid-image-6.jpg") renderImage("./public/grid-image-6.jpg");
  if (path == "/images/grid-image-7.jpg") renderImage("./public/grid-image-7.jpg");
  if (path == "/images/grid-image-8.jpg") renderImage("./public/grid-image-8.jpg");
  if (path == "/images/grid-image-9.jpg") renderImage("./public/grid-image-9.jpg");
  if (path == "/images/grid-image-10.jpg") renderImage("./public/grid-image-10.jpg");
  if (path == "/images/grid-image-11.jpg") renderImage("./public/grid-image-11.jpg");
  if (path == "/images/grid-image-12.jpg") renderImage("./public/grid-image-12.jpg");
  if (path == "/images/grid-image-13.jpg") renderImage("./public/grid-image-13.jpg");
  if (path == "/images/grid-image-14.jpg") renderImage("./public/grid-image-14.jpg");
  if (path == "/images/grid-image-15.jpg") renderImage("./public/grid-image-15.jpg");
  if (path == "/images/grid-image-16.jpg") renderImage("./public/grid-image-16.jpg");
  if (path == "/images/grid-image-17.jpg") renderImage("./public/grid-image-17.jpg");
  if (path == "/images/grid-image-18.jpg") renderImage("./public/grid-image-18.jpg");
  if (path == "/images/grid-image-19.jpg") renderImage("./public/grid-image-19.jpg");
  if (path == "/images/grid-image-20.jpg") renderImage("./public/grid-image-20.jpg");
  if (path == "/images/grid-image-21.jpg") renderImage("./public/grid-image-21.jpg");
  if (path == "/images/grid-image-22.jpg") renderImage("./public/grid-image-22.jpg");
}

module.exports = {
  styleSheets,
  publicImages,
};
