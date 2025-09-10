class RegisterUserInput {
  constructor({ name, email, password }) {
    if (!name) {
      throw new Error("O campo nome é obrigatório");
    }
    if (!email) {
      throw new Error("O campo email é obrigatório");
    }
    if (!password) {
      throw new Error("O campo senha é obrigatório");
    }

    this.name = name;
    this.email = email;
    this.password = password;
  }
}

module.exports = RegisterUserInput;
