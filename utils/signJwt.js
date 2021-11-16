const JWT = require("jsonwebtoken");

const signJwt = async (
  payload,
  expiration = Math.floor(Date.now() / 1000) + 60 * 60
) => {
  try {
    const token = await JWT.sign(payload, process.env.AUTH_SECRET, {
      expiresIn: expiration,
    });
    return token;
  } catch (error) {
    throw error;
  }
};

module.exports = signJwt;
