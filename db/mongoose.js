const mongoose = require("mongoose");
const db = require("../config/key");
// this function connects to mongo Database through URl provided by mongoURI

mongoose
  .connect(db.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true, // can create custom index
    useFindAndModify: false,
  })
  .then(() => {
    // console.log("Connected to database at port 27017");
  });
