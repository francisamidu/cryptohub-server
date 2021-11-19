const bcrypt = require("bcryptjs");

const verifyOTP = async (providedOtp, originalOtp) => {
  try {
    const validOTP = await bcrypt.compare(providedOtp, originalOtp);
    return validOTP;
  } catch (error) {
    throw error;
  }
};

module.exports = verifyOTP;
