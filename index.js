const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  const data = 10 + 12;
  return res.status(200).json({ message: "Success", data });
});

app.post("/verify", async (req, res) => {
  return res.status(200).json({ message: "Success", data: req.body });
});

app.listen(4000, () => console.log("App listen on port 4000"));
