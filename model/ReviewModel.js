const mongoose = require("mongoose");
const reviewschema = mongoose.Schema({
  iid: {
    type:String ,
    required: true,
  },
  revtext: {
    type: String,
    required: true,
  },
});
const review = mongoose.model("reviews", reviewschema);
module.exports = review;
