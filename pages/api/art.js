const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const imageSchema = new mongoose.Schema({
  imageName: { type: String, required: false },
  imageData: { type: String, required: false },
  username: { type: String, required: false },
  author: { type: String, required: false },
  price: { type: Number, required: false },
  token: { type: String, required: false },
  verified: { type: Boolean, required: false },
});

module.exports = mongoose.model("gallerydata", imageSchema);
