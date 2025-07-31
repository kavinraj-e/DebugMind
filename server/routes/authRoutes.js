const express = require("express");
const router = express.Router();
const { signup, login } = require("../controller/authcontroller");
const authMiddleware = require("../middleware/authmiddleware");

// Routes
router.post("/signup", signup);
router.post("/login", login);

router.get("/authprofile", authMiddleware, (req, res) => {
  res.json({ message: "Access granted!", user: req.user });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure:true,
    sameSite: "None",
  });
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
