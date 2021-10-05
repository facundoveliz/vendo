const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // checks if a token exists
  const token = req.cookies["jwtToken"];
  if (!token) return res.status(401).json("Access denied, no token provided.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json("Invalid token");
  }
};
