const { User } = require("../../../Infrastructure/Persistence/Sequelize/models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../../../config/config");

class LoginUser {
  async execute({ email, password }) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("Usuário ou senha inválidos");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Usuário ou senha inválidos");

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    return {
      user: { id: user.id, name: user.name, email: user.email },
      token,
    };
  }
}

module.exports = LoginUser;
