const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var cors = require("cors");
const product = require("./Routes/product");

app.use(cors()); // initiating cors
require("./db/mongoose"); // mongoDB is initiated and connected here.
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
); // using bodyParse to parse incoming request's body
app.use(bodyParser.json());
app.use("/", product);
const port = 5000;
app.listen(port, () => {
  console.log("server is up on port 5000");
});
module.exports = app;
