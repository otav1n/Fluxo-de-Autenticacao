const express = require("express");
const AuthController = require("../controllers/AuthController");
const authMiddleware = require("../Middleware/AuthMiddleware");

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

router.post("/logout", authMiddleware, AuthController.logout);
router.get("/rota-protegida", authMiddleware, (req, res) => {
  res.json({ message: `Olá ${req.user.email}, você acessou uma rota protegida!` });
});

module.exports = router;
