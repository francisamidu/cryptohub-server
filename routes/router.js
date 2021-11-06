const router = require("express").Router();

//GET coins
router.get("/api/coins", async () => {});

//GET exchanges
router.get("/api/exchanges", async () => {});

//GET news
router.get("/api/news", async () => {});

//Login/Signin endpoint
router.post("/login");

//Signup/Register endpoint
router.post("/signup");

module.exports = router;
