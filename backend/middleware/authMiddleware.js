const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token, access denied" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token format invalid, access denied" });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("CRITICAL ERROR: JWT_SECRET environment variable is missing in authMiddleware!");
      return res.status(500).json({ message: "Internal server configuration error" });
    }

    const decoded = jwt.verify(token, secret);

    req.user = decoded; 

    next();
  } catch (err) {
    return res.status(401).json({ message: "Token is not valid or has expired" });
  }
};

module.exports = authMiddleware;