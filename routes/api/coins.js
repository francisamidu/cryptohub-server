const router = require("express").Router();

//GET coins
router.get("/", async (req, res) => {
  res.status(200).json({
    data: {
      base: {},
      coins: [],
      stats: {
        total: 5000,
        total24hVolume: 7000,
        totalExchanges: 273,
        totalMarketCap: 2545410005454,
        totalMarkets: 320145,
      },
    },
  });
});

module.exports = router;
