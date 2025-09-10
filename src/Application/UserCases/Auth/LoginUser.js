const {
  User,
} = require("../../../Infrastructure/Persistence/Sequelize/models");
const bcrypt = require("bcrypt");
const JWTProvider = require("../../../Infrastructure/Providers/JWTProvider");

class LoginUser {
  async execute(loginInput) {
    const user = await User.findOne({ where: { email: loginInput.email } });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(
      loginInput.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token = JWTProvider.generateToken({ id: user.id, email: user.email });
    return { token };
  }
}

module.exports = LoginUser;
