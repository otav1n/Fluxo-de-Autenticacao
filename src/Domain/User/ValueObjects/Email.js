class Email {
  constructor(value) {
    if (!value) {
      throw new Error("Email é obrigatório");
    }
    if (!this.validate(value)) {
      throw new Error("Email inválido");
    }
    this.value = value;
  }

  validate(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  toString() {
    return this.value;
  }
}

module.exports = Email;
