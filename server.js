const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"],
  })
);
app.options("*", cors());

app.use(express.json());

const token = "";
const API_URL = "https://bankaccountdata.gocardless.com/api/v2";

app.get("/gocardless/country", async (req, res) => {
  console.log(req.body, "   ", req.query);
  try {
    const { country } = req.query;

    const response = await axios({
      method: req.method,
      url: `https://bankaccountdata.gocardless.com/api/v2/institutions/?country=${country}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: req.body,
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/gocardless/token", async (req, res) => {
  console.log(req.body, "   ", req.query);
  try {
    const response = await axios({
      method: req.method,
      url: "https://bankaccountdata.gocardless.com/api/v2/token/new",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        secret_id: "66433513-7aed-4d19-bc80-7c9ac2ca0ba2",
        secret_key:
          "e270957e080f165c9f792106c134ad0706d7c696ded78087acc199ee06fdc364680778124d14efa9cf6521fcf215687d22126755fc160101bc3fe01862826ee9",
      },
    });
    const data = await response.json();
    console.log(data);
    token = data.access;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log("Proxy running on port 5000"));
