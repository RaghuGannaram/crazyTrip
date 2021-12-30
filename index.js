const http = require("http");
const routeHandler = require("./routes/routes.js");

const port = process.env.PORT || 3000;
const httpServer = http.createServer(routeHandler);

httpServer.listen(port ,()=>{
    console.log("travelblog started at 127.0.0.1:3000");
})
