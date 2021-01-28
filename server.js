const express = require("express");
const app = express();
// const canvas = require("canvas");
// const faceapi = require("face-api.js");
// const tf = require("@tensorflow/tfjs-node");

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});
app.listen(3000);
