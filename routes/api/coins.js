const router = require("express").Router();

const Coin = require("../../db/models/Coin");

//GET coins
router.get("/", async (req, res) => {
  try {
    const coins = await Coin.find();
    res.status(200).json({
      data: {
        base: {},
        coins,
        stats: {
          base: "USD",
          total: 5000,
          total24hVolume: 7000,
          totalExchanges: 273,
          totalMarketCap: 2545410005454,
          totalMarkets: 320145,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Whoops! Something went wrong" });
  }
});

module.exports = router;
