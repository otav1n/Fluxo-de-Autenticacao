class LoginUserInput {
  constructor({ email, password }) {
    if (!email) {
      throw new Error("O campo email é obrigatório");
    }
    if (!password) {
      throw new Error("O campo senha é obrigatório");
    }

    this.email = email;
    this.password = password;
  }
}

module.exports = LoginUserInput;
