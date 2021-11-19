const { model, Schema } = require("mongoose");

const OTPSchema = Schema(
  {
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      index: {
        expires: 300,
      },
    },
  },
  { timestamps: true }
);

module.exports = model("otp", OTPSchema);
