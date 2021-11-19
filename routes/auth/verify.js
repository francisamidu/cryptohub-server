//Base Requirements
const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const verifyOTP = require("../../utils/verifyOTP");

//Database models
const User = require("../../db/models/User");
const OTP = require("../../db/models/OTP");

router.post(
  "/",
  [
    check("email", "Please provide a valid email address").isEmail(),
    check("otp", "Please provide OTP").isLength({ min: 6, max: 6 }),
  ],
  async (req, res) => {
    try {
      const { email, otp } = req.body;

      //Validate credentials and send back response message
      const validationResults = validationResult(req).errors.map((result) => ({
        message: result.msg,
        success: false,
      }));
      if (validationResults.length) {
        return res.status(401).json(validationResults);
      }
      //Query the database for user and send back response message
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found", success: false });
      }
      const savedOTP = await OTP.findOne({ otp });
      if (!savedOTP) {
        return res
          .status(404)
          .json({ message: "OTP has expired", success: false });
      }
      const otpIsValid = await verifyOTP(otp, savedOTP);
      if (!otpIsValid) {
        return res
          .status(400)
          .json({ message: "OTP is invalid", success: false });
      }
      await OTP.findOneAndDelete({ otp });
      user.isVerified = true;
      await user.save();
      return res
        .status(200)
        .json({ message: "User has been verified", success: true });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "OTP verification failed", success: false });
    }
  }
);
