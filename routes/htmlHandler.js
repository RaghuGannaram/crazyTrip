const fs = require("fs");
const readCookie = require("../utilities/cookieParser");

function htmlDocs(req, res, path) {
  const renderHTML = (fileLocation) => {
    fs.readFile(fileLocation, null, (err, html) => {
      if (err) throw err;
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(html);
      res.end();
    });
  };
  
  switch (path) {
    case "/": {
      renderHTML("./view/home.html");
      break;
    }
    case "/home": {
      renderHTML("./view/home.html");
      break;
    }
    case "/blogs": {
      renderHTML("./view/blogs.html");
      break;
    }
    case "/signin": {
      renderHTML("./view/signin.html");
      break;
    }
    case "/signup": {
      renderHTML("./view/signup.html");
      break;
    }
    case "/about": {
      renderHTML("./view/about.html");
      break;
    }
    case "/postablog": {
      if (readCookie(req.headers.cookie, "isSignedIn") == "true") {
        renderHTML("./view/postablog.html");
        break;
      } else {
        res.writeHead(302, { Location: "/signin" });
        res.end();
        break;
      }
    }
    case "/usersignout": {
      res.writeHead(302, {
        Location: "/home",
        "Set-Cookie": [ `isSignedIn= ${null}`, `userId=${null}`, `username=${null}` ],
      });
      res.end();
      break;
    }
  }

}

module.exports = {
  htmlDocs
};
