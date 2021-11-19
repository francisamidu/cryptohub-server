const bcrypt = require("bcryptjs");
const hashValue = async (password) => {
  try {
    const hashedValue = await bcrypt.hash(password, 12);
    return hashedValue;
  } catch (error) {
    throw error;
  }
};

module.exports = hashValue;
