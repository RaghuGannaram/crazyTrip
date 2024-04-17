const mongoose = require("mongoose");
const chalk = require("chalk");
const { getCurrentDBUrl, getCurrentEnv } = require("../utils/env-info");
const logger = require("../configs/logger.config");

const mongoURL = getCurrentDBUrl();
const currentEnv = getCurrentEnv();

const dbConfig = {
    development: {
        dbName: "developmentDB",
        bufferCommands: true,
        family: 4,
        maxPoolSize: 100,
        socketTimeoutMS: 30000,
        connectTimeoutMS: 30000,
        serverSelectionTimeoutMS: 5000,
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    },
    production: {
        dbName: "productionDB",
        autoIndex: false,
        autoCreate: false,
        bufferCommands: false,
        family: 4,
        maxPoolSize: 100,
        socketTimeoutMS: 30000,
        connectTimeoutMS: 30000,
        serverSelectionTimeoutMS: 30000,
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    },
};

const mongoOptions = dbConfig[currentEnv];

mongoose.set("debug", currentEnv === "development");
mongoose.connect(mongoURL, mongoOptions);

const db = mongoose.connection;

db.on("connecting", () => {
    logger.info("database server: connecting...");
});

db.on("connected", () => {
    const { name, host, port, models } = db;

    logger.info("database server: successful...🍃");
    logger.info(`database server: host: ${chalk.magenta(host)}:${chalk.magenta(port)}`);
    logger.info(`database server: name: ${chalk.magenta(name)}, models: %o`, models);
});

db.on("open", () => {
    logger.info("database server: open...");
});

db.on("disconnecting", () => {
    logger.info("database server: disconnecting...");
});

db.on("disconnected", () => {
    logger.error("database server: disconnected...");
});

db.on("close", () => {
    logger.error("database server: closed...");
});

db.on("reconnected", () => {
    logger.info("database server: reconnected...");
});

db.on("error", () => {
    logger.error("database server: Unable to connect to Database...🙁");
    throw new Error("Unable to connect to Database");
});

process.on("SIGINT", () => {
    logger.error("database server: connection terminated...🟥");
    db.close();
});

module.exports = db;
