const verifyJwt = require("../utils/verifyJwt");

const authenticate = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized access" });
  }
  try {
    const user = verifyJwt(token);
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong during authentication",
    });
  }
};

module.exports = authenticate;
