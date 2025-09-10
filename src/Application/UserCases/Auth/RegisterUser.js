const bcrypt = require("bcryptjs");
const sequelize = require("../../../Infrastructure/Persistence/Sequelize/database");

class RegisterUser {
  async execute({ name, email, password }) {
    if (!name || !email || !password) {
      throw new Error("Nome, email e senha são obrigatórios.");
    }

    const User = sequelize.models.User;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("Email já cadastrado.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}

module.exports = RegisterUser;
