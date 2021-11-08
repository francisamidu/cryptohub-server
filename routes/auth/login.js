//Base Requirements
const router = require("express").Router();
const { check, validationResult } = require("express-validator");

//Database models
const User = require("../../db/models/User");
const Token = require("../../db/models/Token");

//Auth Utilities
const comparePassword = require("../../utils/comparePassword");
const hashPassword = require("../../utils/hashPassword");
const signJwt = require("../../utils/signJwt");

//Login/Signin endpoint
router.post(
  "/",
  [check("username").isEmpty(), check("password").isEmpty()],
  async (req, res) => {
    try {
      const { username, password } = req.body;

      //Check for empty credentials and send back response message
      const validationResults = validationResult(req);
      if (validationResults.length) {
        return res.status(403).json({
          message: "Please provide valid login credential",
          success: false,
        });
      }

      //Query the database for user and send back response message
      const user = await User.findOne({ username });
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

module.exports = router;
