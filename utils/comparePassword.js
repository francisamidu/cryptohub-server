const bcrypt = require("bcryptjs");

const comparePassword = async (providedPassword, originalPassword) => {
  try {
    const isMatch = await bcrypt.compare(providedPassword, originalPassword);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

module.exports = comparePassword;
