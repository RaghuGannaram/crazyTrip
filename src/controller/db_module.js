const Blog = require("../model/blog");
const User = require("../model/user");

let db_module = {};

db_module.blogposts = (req, res)=>{
  Blog.find(
    {},
    (err, blogs)=>{
      if(blogs == null){
        res.end(
          `<div> <h1 style="text-align: center;color:blue;>"No posted blogs to show</h1><a href="./signin">click here to go back</a></div>`
        );
      }else{
        var blogstring = JSON.stringify(blogs);
        res.writeHead(200,{"Content-Type": "text/html"});
        res.write(blogstring);
        res.end();
      }
    }
  )
}

db_module.signupuser = (req, res, userobj) => {
  const user = new User({
    username: userobj.username,
    usermail: userobj.usermail,
    userpassword: userobj.userpassword
  });
  user
    .save()
    .then((data) => {
      res.writeHead(302, { Location: "/signin" });
      res.end();
    })
    .catch((err) => {
      res.end(
        '<div><h1 style="text-align: center;color: red;">' +
          err.message +
          '</h1><a href="./signup">click here to go back</a></div>'
      );
    });
};
db_module.signinuser = (req, res, userobj) => {
  User.findOne(
    { usermail: userobj.usermail, userpassword: userobj.userpassword },
    (err, person) => {
      if (person == null) {
        res.end(
          '<div><h1 style="text-align: center;color: red;">Invalid username or password</h1><a href="./signin">click here to go back</a></div>'
        );
      } else {
        res.writeHead(302, {
          Location: "/home",
          "Set-Cookie": [
            `isSignedIn=${true}`,
            ` userId= ${person["id"]}`,
            "username = " + person["username"],
          ],
        });
        res.end();
      }
    }
  );
};

db_module.postblog = (req, res, blogobj) =>{
  const blog = new Blog({
    title : blogobj.title,
    author : blogobj.author,
    body : blogobj.body
  });
  blog
    .save()
    .then((data)=>{
      res.writeHead(302,{Location:"/blogs"});
      res.end();
    })
    .catch((err)=>{
      res.end(
        err.message
      )
    })
}

db_module.postcomment = (req, res, commentdata)=>{
  commentdataobj=JSON.parse(commentdata)
  Blog.updateOne({_id :commentdataobj.blogid},
    {$push :{
      comments : [
        { blogId : commentdataobj.blogid,
          userId : commentdataobj.userid,
          commentbody : commentdataobj.usercomment,
          commentator : commentdataobj.commentator
        }
      ]
    }
    },
    ()=>{
      res.end()
    }
  )
}

db_module.postlike = async (req, res, likeobj)=>{
  const likedataobj=JSON.parse(likeobj)
  const blog = await Blog.findById(likedataobj.blogid);
  if(!blog.likes.includes(likedataobj.userid)){
    await blog.updateOne({$push: {likes: likedataobj.userid}});
    res.end();
  }
  else{
    await blog.updateOne({$pull: {likes: likedataobj.userid}});
    res.end();
  }
}


module.exports = db_module;
