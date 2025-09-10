class Name {
  constructor(value) {
    if (!value) {
      throw new Error("Nome é obrigatório");
    }
    if (!this.validate(value)) {
      throw new Error("Nome inválido");
    }
    this.value = value;
  }

  validate(name) {
    return typeof name === "string" && name.trim().length >= 2;
  }

  toString() {
    return this.value;
  }
}

module.exports = Name;
