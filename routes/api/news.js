const router = require("express").Router();

const News = require("../../db/models/News");

//GET news
router.get("/", async (req, res) => {
  try {
    const news = await News.find();
    res.status(200).json({
      totalEstimatedMatches: news.length || 10,
      value: news,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Oppsie, Something went wrong" });
  }
});

module.exports = router;
