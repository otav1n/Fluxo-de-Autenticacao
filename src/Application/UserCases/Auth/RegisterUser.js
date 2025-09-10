const {
  User,
} = require("../../../Infrastructure/Persistence/Sequelize/models");

class RegisterUser {
  async execute(userInput) {
    const existingUser = await User.findOne({
      where: { email: userInput.email },
    });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const newUser = await User.create({
      name: userInput.name,
      email: userInput.email,
      password: userInput.password,
    });

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };
  }
}

module.exports = RegisterUser;
