const jwt = require("jsonwebtoken");
// This function authenticates the user via jwt.verify
function authenticateJWT(req, res, next) {
  const token = req.header("Authorization");

    // const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Unauthorized: Invalid token" });
    }
    console.log("Decoded User:", user);

    req.user = { message: "Authentication successful", ...user };
    next();
  });
}

module.exports = {
    authenticateJWT
};