const router = require("express").Router();

const Coin = require("../../db/models/Coin");

//GET coin
router.get("/:coinId", async (req, res) => {
  try {
    const { coinId } = req.params;
    const coin = await Coin.findById(coinId);
    res.status(200).json({
      data: { data: coin },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Whoops! Something went wrong" });
  }
});

module.exports = router;
