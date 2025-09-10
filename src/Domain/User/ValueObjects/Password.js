class Password {
  constructor(value) {
    if (!value) {
      throw new Error("Senha é obrigatória");
    }
    if (!this.validate(value)) {
      throw new Error("Senha inválida. Deve ter pelo menos 6 caracteres.");
    }
    this.value = value;
  }

  validate(password) {
    return typeof password === "string" && password.length >= 6;
  }

  toString() {
    return this.value;
  }
}

module.exports = Password;
