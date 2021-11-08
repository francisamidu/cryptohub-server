const router = require("express").Router();

//GET coins
router.get("/", async (req, res) => {
  res.status(200).json({ coins: [] });
});

module.exports = router;
