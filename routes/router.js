const router = require("express").Router();
const { check, validationResult } = require("express-validator");

const Token = require("../models/Token");
const User = require("../models/User");

const comparePassword = require("../utils/comparePassword");
const hashPassword = require("../utils/hashPassword");
const signJwt = require("../utils/signJwt");

//GET coins
router.get("/api/coins", async (req, res) => {
  res.status(200).json({ coins: [] });
});

//GET exchanges
router.get("/api/exchanges", async () => {});

//GET news
router.get("/api/news", async () => {});

//Login/Signin endpoint
router.post(
  "/auth/login",
  [check("username").isEmpty(), check("password").isEmpty()],
  async (req, res) => {
    try {
      const { email, password } = req.body;

      //Check for empty credentials and send back response message
      const validationResults = validationResult(req);
      if (validationResults.length) {
        return res.status(403).json({
          message: "Please provide valid login credential",
          success: false,
        });
      }

      //Query the database for user and send back response message
      const user = await User.find({ email });
      if (!user) {
        return res
          .status(404)
          .json({ message: "No user found", success: false });
      }

      //Compare password and send back response message
      const isPasswordMatching = comparePassword(password, user.password);
      if (!isPasswordMatching) {
        return res
          .status(403)
          .json({ message: "Password does not match", success: false });
      }

      //Sign JWT
      const token = await signJwt({
        _id: user._id,
        email: user.email,
      });

      //Save token to the database
      const savedToken = new Token({
        token,
      });
      await savedToken.save();
      return res.json({ message: "Login successful", success: true, token });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Something went wrong while loggin in",
        success: false,
      });
    }
  }
);

//Signup/Register endpoint
router.post(
  "/auth/signup",
  [
    check("email", "Please provide a valid email address").isEmail(),
    check(
      "password",
      "Password should have at least, 8 characters,1 number,1 lowercase character,1 uppercase character and 1 special character"
    ).isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    }),
    check(
      "username",
      "A valid username should be at least be 3 characters long"
    )
      .isString()
      .isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      const { email, password, username } = req.body;

      //Validate credentials and send back response message
      const validationResults = validationResult(req).errors.map((result) => ({
        message: result.msg,
        success: false,
      }));
      if (validationResults.length) {
        return res.status(403).json(validationResults);
      }

      //has user password
      const hashedPassword = await hashPassword(password);

      //create User and save to the database
      const user = new User({
        email,
        password: hashedPassword,
        username,
      });
      await user.save();

      return res.status(201).json({ success: true, user: user._doc });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Couldnt sign you up", success: false });
    }
  }
);

module.exports = router;
