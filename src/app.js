const helmet = require("helmet");

const routeHandler = require("./routes/routes.js");
const morganMiddleware = require("./middlewares/morgan.middleware.js");

const middleware = [helmet(), morganMiddleware];

const app = (req, res) => {
    let currentIndex = 0;

    function next() {
        if (currentIndex < middleware.length) {
            middleware[currentIndex++](req, res, next);
        } else {
            routeHandler(req, res);
        }
    }

    next();
};

module.exports = app;
