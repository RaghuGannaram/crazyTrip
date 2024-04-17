const morgan = require("morgan");
const logger = require("../configs/logger.config");

const stream = {
    write: (message) => logger.http(message.toString().trim()),
};

const skip = () => {
    return false;
};

const morganMiddleware = morgan(" :remote-addr :method :url :status :res[content-length] - :response-time ms", {
    stream,
    skip,
});


module.exports = morganMiddleware;
