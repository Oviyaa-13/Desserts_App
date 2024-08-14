const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res.status(401).json({ error: "Authorization header required" });
    }

    const token = authHeader.split(" ")[1]; // Extract the token after "Bearer"

    if (!token) {
        return res.status(401).json({ error: "Token required" });
    }

    try {
        const decoded = jwt.verify(token, "secret_key");
        req.user = { id: decoded.userId, role: decoded.role }; // Assuming 'userId' is the field in your JWT payload
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid or expired token" });
    }
};

module.exports = auth;
