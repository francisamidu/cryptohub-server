const JWT = require("jsonwebtoken");

const signJwt = async (payload) => {
  try {
    const token = await JWT.sign(payload, process.env.AUTH_SECRET, {
      expiresIn: Math.floor(Date.now() / 1000) + 60 * 60,
    });
    return token;
  } catch (error) {
    throw error;
  }
};

module.exports = signJwt;
