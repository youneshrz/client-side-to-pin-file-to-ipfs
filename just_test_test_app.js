const Moralis = require("moralis").default;

const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const { EvmChain } = require("@moralisweb3/common-evm-utils");
const fs = require('fs');
const app = express();
const port = 4000;

// allow access to React app domain

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const MORALIS_API_KEY = "DO5GgCvkIKAUffXygXQCEfxL9f3vaQxsan3RhVAddv9aqasGITuGBLKQY2x710NM";

app.post("/upload", async (req, res) => {
  try {
  console.log(req.body)
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500);
    res.json({ error: error.message });
  }
});
const buffer = fs.readFileSync('bpn.pdf');

// Convert the buffer to a base64 encoded string
const base64 = buffer.toString('base64');

// console.log(base64);

const startServer = async () => {
  await Moralis.start({
    apiKey: MORALIS_API_KEY,
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

startServer();