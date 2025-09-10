class User {
  constructor({ id, name, email, password }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  updateName(newName) {
    this.name = newName;
  }

  updateEmail(newEmail) {
    this.email = newEmail;
  }

  updatePassword(newPassword) {
    this.password = newPassword;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
    };
  }
}

module.exports = User;
