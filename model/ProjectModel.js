const mongoose = require("mongoose");
var projectschema = mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  imglink: {
    type: String,
  },
  projectlink: {
    type: String,
  },
});
const products = mongoose.model("projects", projectschema);
module.exports = products;
