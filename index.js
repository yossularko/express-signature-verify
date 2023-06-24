const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

async function verifySignature(publicKey, signature, payload) {
  const cryptoKey = await crypto.subtle.importKey(
    "spki",
    Buffer.from(publicKey, "base64"),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    true,
    ["verify"]
  );

  const verify = crypto.createVerify("SHA256");
  verify.write(payload);
  verify.end();

  return verify.verify(crypto.KeyObject.from(cryptoKey), signature, "base64");
}

app.get("/", (req, res) => {
  const data = 10 + 12;
  return res.status(200).json({ message: "Success", data });
});

app.post("/verify", async (req, res) => {
  const { publicKey, signature, message } = req.body;
  try {
    if (!publicKey || !signature || !message) {
      return res.status(400).json({ message: "Bad Request" });
    }
    const isVerified = await verifySignature(publicKey, signature, message);
    return res.status(200).json({ message: "Success", isVerify: isVerified });
  } catch (error) {
    return res.status(500).json({ message: "Error Verify", data: error });
  }
});

app.listen(4000, () => console.log("App listen on port 4000"));
