const JWTProvider = require("../../Providers/JWTProvider");
const RedisTokenBlacklistRepository = require("../../Persistence/Redis/RedisTokenBlacklistRepository");

async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "Token ausente" });
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({ message: "Token inválido" });
    }

    const token = parts[1];

    const isRevoked = await RedisTokenBlacklistRepository.exists(token);
    if (isRevoked) {
      return res.status(401).json({ message: "Token revogado" });
    }

    const payload = JWTProvider.verifyToken(token);
    req.user = payload;

    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Falha na autenticação", error: err.message });
  }
}

module.exports = authMiddleware;
