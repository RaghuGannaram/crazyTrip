function readCookie(key){
  var keyeq = key+"="
  var cookie = document.cookie;
  if(cookie != null){
    cookiearray = cookie.split(";")
    for(var i=0; i < cookiearray.length; i++){
      var cookieprop =cookiearray[i];
      while (cookieprop.charAt(0) == " ")
        cookieprop = cookieprop.substring(1, cookieprop.length);
      if (cookieprop.indexOf(keyeq) == 0)
        return cookieprop.substring(keyeq.length, cookieprop.length)
    }
  }
  return null;
}

function isUserSignedIn() {
  if(readCookie("isSignedIn") == "true"){
    return true;
  }
  else{
    return false;
  }
}

if(isUserSignedIn()){
  document.getElementById("silink").remove();
}
else{
  document.getElementById("solink").remove();
}


function fetchblogs(){
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "./fetchblogs", true);
  xhr.onload = function(){
    if(this.status == 200){
      var blogs = JSON.parse(this.responseText);
      var blogmarkup = "";
      var commentmarkup = "";
      blogs.map(blog=>{
        blogmarkup =
          `<div class="blogpost container">
            <div class="bloginfo">
              <h2 class="blogtitle">${blog.title}</h2>
              <p class="blogauthor">${blog.author}</p>
            </div>
            <div class="blogcontent">
              ${blog.body}
            </div>
            <div class="bloglikes" id ="likecontent">
              <h4 id="likenumber">Likes : ${blog.likes.length}</h4>
              <button onclick = postLike(event) class="likebtn" id="${blog._id+"l"}">Like</button>
            </div>
            <div class="blogcomments">
              <div id="${blog._id+'c'}" >
          
              </div>
              <div class="blogcomment usercomment">
                <form id ="${blog._id}" onsubmit=postComment(event)>
                  <input type=text name="${blog._id}"></input>
                  <button type=submit>comment</button>
                  <span id= "instruction"> </span>
                </form
              </div>
            </div>
          </div>
          `;

          document.getElementById("blogmarkup").innerHTML += blogmarkup;
          blog.comments.map(comment =>{
            commentmarkup+=
              `<div class="blogcomment">
              <span class="commentator"> ${comment.commentator}</span> :
                ${comment.commentbody}
              </div>
              `
          })
          document.getElementById(blog._id+"c").innerHTML = commentmarkup;
          commentmarkup="";
      })
    }
  }
  xhr.send();
}


function postLike(event){
  var blogid = event.target.id.slice(0, -1);
  var likeid =event.target.id;
  var userid = readCookie("userId");

  if(isUserSignedIn()){
    let likeobj ={
      blogid : blogid,
      userid : userid
    }
    let xhr =new XMLHttpRequest();
    xhr.open("POST","./postlike", true)
    xhr.onload= function(){
      document.getElementById("blogmarkup").innerHTML = "";
      fetchblogs();
    }
    xhr.setRequestHeader("Content-type", "application/text");
    xhr.send(JSON.stringify(likeobj));
  } else {
    var signinlink = document.createElement("span");
    signinlink.innerHTML = "Please <a href = './signin'> Sign In</a> to like";
    document.getElementById(likeid).parentNode.appendChild(signinlink);
  }
}

function postComment(event){
  event.preventDefault();
  var blogid = event.target.id;
  var userid = readCookie("userId")
  var usercomment = document.getElementById(blogid).firstElementChild.value;
  document.getElementById(blogid).firstElementChild.value = "";
  var commentator = readCookie("username");
  commentdata = {
    blogid : blogid,
    userid : userid,
    usercomment : usercomment,
    commentator : commentator
  }

  if(isUserSignedIn()){
    if(commentdata.usercomment != ""){
      let xhr = new XMLHttpRequest();
      xhr.open("POST","./postcomment", true)
      xhr.onload = function (){
        document.getElementById("blogmarkup").innerHTML = "";
        fetchblogs();
      }
      xhr.setRequestHeader("Content-type","application/text");
      xhr.send(JSON.stringify(commentdata));
    }else{
      document.getElementById(blogid).lastElementChild.innerHTML="Please write a comment to post"
    }
  } else {
    document.getElementById(blogid).lastElementChild.innerHTML="Please <a href = './signin'>Sign In</a> to comment"
  }
}

function handleinput(event){
  event.preventDefault()
  let blogtitle = document.blogform.blogtitle.value;
  let blogauthor = document.blogform.blogauthor.value;
  let blogcontent = document.blogform.blogcontent.value;
  if(!(blogtitle && blogauthor && blogcontent)){
    document.getElementById("postablog").innerHTML="Can't post because of empty fields, <a href = './postablog'> Click here </a>to go back"
  }
}

function toggleMenu() {
  console.log("hello")
  let icon = document.getElementById("nav")
  if (icon.className === "nav") {
      icon.className += " responsive";
  } else {
      icon.className = "nav";
  }
}



