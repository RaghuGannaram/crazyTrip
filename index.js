const http = require("http");
const helmet = require("helmet");
const morgan = require("morgan");
const routeHandler = require("./routes/routes.js");

const port = process.env.PORT || 3000;
const runHelmet = helmet();
const logger = morgan("dev", {
    // skip: (req, res) => (res.statusCode < 400)
});


const httpServer = http.createServer((req, res)=>{
    runHelmet(req, res, (err)=>{
        if(err){
            res.statusCode = 500;
            res.end("Unexpected error while configuring Helmet")
        }
        logger(req, res, (err)=>{
            if(err){
                res.statusCode = 500;
                res.end("Unexpected error while configuring Morgan");
            }
            routeHandler(req, res);
        })
    })
});

httpServer.listen(port ,()=>{
    console.log(`travelblog started at 127.0.0.1:${port}`);
})
