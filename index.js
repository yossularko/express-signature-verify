const express = require("express");

const app = express();

app.get("/", (req, res) => {
  const data = 10 + 12;
  return res.status(200).json({ message: "Success", data });
});

app.listen(4000, () => console.log("App listen on port 4000"));
