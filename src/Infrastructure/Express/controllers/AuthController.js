// src/controllers/AuthController.js

const RegisterUser = require("../../../Application/UserCases/Auth/RegisterUser");
const LoginUser = require("../../../Application/UserCases/Auth/LoginUser");
const RedisTokenBlacklistRepository = require("../../Persistence/Redis/RedisTokenBlacklistRepository");
const JWTProvider = require("../../Providers/JWTProvider");

class AuthController {
  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          status: "error",
          message: "Campos obrigatórios faltando: name, email, password",
        });
      }

      const registerUser = new RegisterUser();
      const result = await registerUser.execute({ name, email, password });

      res.status(201).json({
        status: "success",
        message: "Usuário registrado com sucesso",
        user: result,
      });
    } catch (err) {
      next(err);
    }
  }

  // Login do usuário
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          status: "error",
          message: "Campos obrigatórios faltando: email, password",
        });
      }

      const loginUser = new LoginUser();
      const result = await loginUser.execute({ email, password });

      res.status(200).json({
        status: "success",
        message: "Login realizado com sucesso",
        token: result.token, // supondo que o execute retorne { token }
      });
    } catch (err) {
      next(err);
    }
  }

  // Logout do usuário
  static async logout(req, res, next) {
    try {
      const authHeader = req.headers["authorization"];
      if (!authHeader) {
        return res
          .status(401)
          .json({ status: "error", message: "Token ausente" });
      }

      const token = authHeader.split(" ")[1];

      const decoded = JWTProvider.decodeToken(token);
      const expiresIn = decoded.exp * 1000 - Date.now();

      await RedisTokenBlacklistRepository.add(token, expiresIn);

      res.status(200).json({
        status: "success",
        message: "Logout realizado com sucesso",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AuthController;
