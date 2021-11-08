const router = require("express").Router();

router.use("/coins", require("./coins"));
router.use("/exchanges", require("./exchanges"));
router.use("/news", require("./news"));
router.use("/stats", require("./stats"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
