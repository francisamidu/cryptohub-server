const router = require("express").Router();

router.use("/signup", require("./signup"));
router.use("/login", require("./login"));
router.use("/logout", require("./signout"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
