const JWT = require("jsonwebtoken");

const verifyJwt = async (token) => {
  try {
    const isValidToken = await JWT.verify(token, process.env.AUTH_SECRET);
    return isValidToken;
  } catch (error) {
    return error;
  }
};

module.exports = verifyJwt;
