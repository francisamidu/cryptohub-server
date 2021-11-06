const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.isAuthenticated = false;
    return next();
  }

  const token = authHeader.split(" ")[1];

  let decodedToken;
  try {
    decodedToken = jwt.verify(
      token,
      "talkingaboutafacenumbingoffabagofblowandsomeweirdspeech"
    );
  } catch (err) {
    req.isAuthenticated = false;
    return next();
  }

  if (!decodedToken) {
    req.isAuthenticated = false;
    return next();
  }
  req.userId = decodedToken.userId;
  req.isAuthenticated = true;
  return next();
};
