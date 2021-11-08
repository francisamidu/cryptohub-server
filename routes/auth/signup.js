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

//Signup/Register endpoint
router.post(
  "/",
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
