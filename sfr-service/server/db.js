const mongoose = require("mongoose");

let connection;

function connect() {
  if (connection) return;

  const uri = process.env.MONGO_URI;

  connection = mongoose.connection;

  connection.once("open", () => {
    console.log(`Connection with mongo in ${uri}`);
  });
  connection.on("disconnected", () => {
    console.log("Succesfully disconected!");
  });
  connection.on("error", (err) => {
    console.log("Something went wrong!", err);
  });

  mongoose.connect(uri);
}

module.exports = { connect };
