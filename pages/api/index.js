const express = require("express");
const mongoose = require("mongoose");
const ImageModel = require("./art");
const cors = require("cors");
const app = express();

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(cors());

mongoose.connect(
  "mongodb+srv://christian2:christian2@beatstore.todsx.mongodb.net/VirtualGallery?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const getImage = app.get("/getImage", (req, res) => {
  const image = ImageModel.find({}, (err, found) => {
    if (err) {
      console.log(err);
    } else {
      res.json(found);
    }
  });
  return image;
});

export default function handler(req, res) {
  res.status(200).json(getImage);
}
