//Base Requirements
const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const OTPGenerator = require("otp-generator");

//Database models
const User = require("../../db/models/User");
const OTP = require("../../db/models/OTP");

//Auth Utilities
const hashValue = require("../../utils/hashValue");

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
        return res.status(401).json(validationResults);
      }

      //Query the database for user and send back response message
      const user = await User.findOne({ username });
      if (user) {
        return res
          .status(400)
          .json({ message: "User already exists", success: false });
      }

      //Generate OTP
      const tempOTP = OTPGenerator.generate(6, {
        digits: true,
        upperCase: false,
        specialChars: false,
        alphabets: false,
        specialChar: false,
      });
      const generatedOTP = await hashValue(tempOTP);
      const otp = new OTP({
        otp: generatedOTP,
      });
      await otp.save();

      //has user password
      const hashedPassword = await hashValue(password);

      //create User and save to the database
      const newUser = new User({
        email,
        password: hashedPassword,
        username,
      });
      await newUser.save();

      return res.status(201).json({
        success: true,
        otp: tempOTP,
        user: {
          username: newUser._doc.username,
          email: newUser._doc.email,
          createdAt: newUser._doc.created_at,
        },
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Couldnt sign you up", success: false });
    }
  }
);
module.exports = router;
