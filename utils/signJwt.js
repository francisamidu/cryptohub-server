const JWT = require("jsonwebtoken");

const signJwt = async (payload) => {
  try {
    console.log(process.env.AUTH_SECRET);
    const token = await JWT.sign(payload, process.env.AUTH_SECRET, {
      expiresIn: "1 day",
    });
    return token;
  } catch (error) {
    return error;
  }
};

module.exports = signJwt;
