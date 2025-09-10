const RegisterUser = require("../../../Application/UserCases/Auth/RegisterUser");
const LoginUser = require("../../../Application/UserCases/Auth/LoginUser");
const RedisTokenBlacklistRepository = require("../../Persistence/Redis/RedisTokenBlacklistRepository");
const JWTProvider = require("../../Providers/JWTProvider");

class AuthController {
  static async register(req, res, next) {
    try {
      const registerUser = new RegisterUser();
      const result = await registerUser.execute(req.validatedBody);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const loginUser = new LoginUser();
      const result = await loginUser.execute(req.validatedBody);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async logout(req, res, next) {
    try {
      const authHeader = req.headers["authorization"];
      if (!authHeader) return res.status(401).json({ message: "Token ausente" });

      const token = authHeader.split(" ")[1];

      const decoded = JWTProvider.decodeToken(token);
      const expiresIn = decoded.exp * 1000 - Date.now();

      await RedisTokenBlacklistRepository.add(token, expiresIn);

      res.status(200).json({ message: "Logout realizado com sucesso" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AuthController;
