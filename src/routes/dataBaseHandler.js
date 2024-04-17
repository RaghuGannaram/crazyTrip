const db_model = require("../controller/db_module");
const readCookie = require("../utils/cookieParser");

function dataBase(req, res, path) {
  switch (path) {
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

  }
}

module.exports = {
  dataBase,
};
