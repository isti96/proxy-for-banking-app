const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

const API_URL = "https://bankaccountdata.gocardless.com/api/v2";

app.use("/proxy", async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `${API_URL}${req.originalUrl.replace("/proxy", "")}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: req.body,
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log("Proxy running on port 5000"));
