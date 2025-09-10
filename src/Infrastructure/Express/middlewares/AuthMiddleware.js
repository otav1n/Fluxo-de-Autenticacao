const JWTProvider = require("../../Providers/JWTProvider");
const RedisTokenBlacklistRepository = require("../../Persistence/Redis/RedisTokenBlacklistRepository");

async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "Token ausente" });
    }

    const tokenParts = authHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(401).json({ message: "Formato de token inválido" });
    }

    const token = tokenParts[1];

    const isBlacklisted = await RedisTokenBlacklistRepository.has(token);
    if (isBlacklisted) {
      return res.status(401).json({ message: "Token inválido ou expirado" });
    }

    const decoded = JWTProvider.verifyToken(token);
    req.user = decoded;

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Token inválido" });
  }
}

module.exports = authMiddleware;
