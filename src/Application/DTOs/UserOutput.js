class UserOutput {
  constructor({ id, name, email, token }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.token = token;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      token: this.token,
    };
  }
}

module.exports = UserOutput;
