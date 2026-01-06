const User = require("../models/User");

module.exports = async function authMiddleware(req, res, next) {
  try {
    const email = req.headers["x-user-email"];

    if (!email) {
      return res.status(401).json({ error: "Email required in x-user-email header" });
    }

    const [user] = await User.findOrCreate({
      where: { email },
    });

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
};
