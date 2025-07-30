const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token; // 🔑 Get token from cookie

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // 👤 Store user data in request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = authMiddleware;
