const express = require("express");
const axios = require("axios");

const cryptoRouter = express.Router();

// Route to get crypto prices
cryptoRouter.get("/", async (req, res, next) => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,cardano&vs_currencies=usd"
    );
    const prices = response.data;

    res.send({
      message: "Crypto prices fetched successfully!",
      prices: [
        { name: "Bitcoin", symbol: "BTC", price: prices.bitcoin.usd },
        { name: "Ethereum", symbol: "ETH", price: prices.ethereum.usd },
        { name: "Binance Coin", symbol: "BNB", price: prices.binancecoin.usd },
        { name: "Cardano", symbol: "ADA", price: prices.cardano.usd },
      ],
    });
  } catch (error) {
    next(error);
  }
});

module.exports = cryptoRouter;
