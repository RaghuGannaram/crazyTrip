const mongoose = require("mongoose");

function connectToDataBase() {
  mongoose
    .connect(process.env.MongoDB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log("connected to MongoDB Database"))
    .catch((err) => console.log(err));
}

module.exports = {
  connectToDataBase,
};
