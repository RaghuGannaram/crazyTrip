const fs = require("fs");
const url = require("url");
const dotenv = require("dotenv");
const db_model = require("../controller/db_module");
const readCookie = require("../utilities/cookieParser");
const {styleSheets, publicImages} = require("./commonHandler");
const {connectToDataBase} = require("../utilities/Database.js");

dotenv.config();
connectToDataBase();

const routeHandlers = (req, res) => {
  const baseURL =  req.protocol + '://' + req.headers.host + '/';
  const reqURL = new URL(req.url,baseURL);

  const path = reqURL.pathname;

  styleSheets(req, res, path);
  publicImages(req, res, path);

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
    case "/usersignout": {
      res.writeHead(302, {
        Location: "/home",
        "Set-Cookie": [
          `isSignedIn= ${null}`,
          `userId=${null}`,
          `username=${null}`,
        ],
      });
      res.end();
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

    //DB Interaction Involved

    case "/fetchblogs": {
      db_model.blogposts(req, res);
      break;
    }

    case "/usersignup": {
      let signupdata = "";
      req.on("data", (chunk) => {
        signupdata += chunk;
      });
      req.on("end", () => {
        let searchParams = new URLSearchParams(signupdata);
        let userobj = {
          username: searchParams.get("username"),
          usermail: searchParams.get("usermail"),
          userpassword: searchParams.get("userpassword"),
        };
        db_model.signupuser(req, res, userobj);
      });
      break;
    }

    case "/usersignin": {
      let signindata = "";
      req.on("data", (chunk) => {
        signindata += chunk;
      });
      req.on("end", () => {
        let searchParams = new URLSearchParams(signindata);
        let userobj = {
          usermail: searchParams.get("usermail"),
          userpassword: searchParams.get("userpassword"),
        };
        db_model.signinuser(req, res, userobj);
      });
      break;
    }

    case "/postblog": {
      let userpostdata = "";
      req.on("data", (chunk) => {
        userpostdata += chunk;
      });
      req.on("end", () => {
        let searchParams = new URLSearchParams(userpostdata);
        let blogobj = {
          title: searchParams.get("blogtitle"),
          author: searchParams.get("blogauthor"),
          body: searchParams.get("blogcontent"),
        };
        db_model.postblog(req, res, blogobj);
      });
      break;
    }

    case "/postcomment": {
      if (readCookie(req.headers.cookie, "isSignedIn") == "true") {
        let commentdata = "";
        req.on("data", (chunk) => {
          commentdata += chunk;
        });
        req.on("end", () => {
          db_model.postcomment(req, res, commentdata);
        });
        break;
      } else {
        res.writeData(302, { Location: "/signin" });
        res.end();
        break;
      }
    }

    case "/postlike": {
      if (readCookie(req.headers.cookie, "isSignedIn") == "true") {
        let likedata = "";
        req.on("data", (chunk) => {
          likedata += chunk;
        });
        req.on("end", () => {
          db_model.postlike(req, res, likedata);
        });
        break;
      } else {
        res.writeData(302, { Location: "/signin" });
        res.end();
        break;
      }
    }

    case "/javascript/main.js": {
      fs.readFile("./utilities/main.js", null, (err, jscode) => {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "application/javascript" });
        res.write(jscode);
        res.end();
      });
      break;
    }

    default: {
      // if(path.includes("public") || path == "/css/style.css"){
      //   break;
      // }
      // else{
      //   renderHTML("../frontend/pageNotFound.html");
      //   break;
      // }
    }
  }
};

module.exports = routeHandlers;
