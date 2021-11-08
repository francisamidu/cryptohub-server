const bcrypt = require("bcryptjs");
const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

module.exports = hashPassword;
