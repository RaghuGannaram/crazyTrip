require("dotenv").config();

const http = require("http");
const chalk = require("chalk");
const app = require("./app");
const logger = require("./configs/logger.config");
const { getCurrentPort } = require("./utils/env-info");

const server = http.createServer(app);
const port = getCurrentPort();

server.listen(port);

server.on("error", (error) => {
    logger.error("application server: error... %o", error);
    if (error.syscall !== "listen") {
        throw error;
    }

    switch (error.code) {
        case "EACCES":
            logger.error("application server: Requires elevated privileges.");
            process.exit(1);
            break;

        case "EADDRINUSE":
            logger.error(`application server: ${port} is already in use.`);
            process.exit(1);
            break;

        case "EADDRNOTAVAIL":
            logger.error("application server: The specified IP address is not available on this machine.");
            process.exit(1);
            break;

        case "ECONNREFUSED":
            logger.error("application server: The server you're trying to connect to is not accepting connections.");
            process.exit(1);
            break;

        default:
            throw error;
    }
});

server.on("listening", () => {
    const { address, port } = server.address();

    logger.info("application server: up and running...🚀");
    logger.info(`application server: host: ${chalk.magenta(address)}:${chalk.magenta(port)}`);
});

server.on("upgrade", () => {
    logger.info("application server: upgraded...");
});

server.on("disconnect", () => {
    logger.error("application server: disconnecting...");
});

server.on("close", () => {
    logger.error("application server: closed...");
});

server.on("clientError", () => {
    logger.error("application server: client error...");
});

process.on("uncaughtException", (err) => {
    logger.error("application server: uncaught exception... \n %s", err.message);
    process.exit(1);
});

// process.on("unhandledRejection", (reason, promise) => {
//     logger.error("application server: unhandled rejection... " + reason + promise);
//     logger.error("application server: reason : %s", reason);
//     logger.error("application server: promise : %o", promise);
// });

process.on("SIGINT", () => {
    logger.error("application server: connection terminated...🟥");
    server.close();
});
