class IUserRepository {
  async findById(id) {
    throw new Error("Method not implemented");
  }

  async findByEmail(email) {
    throw new Error("Method not implemented");
  }

  async create(userData) {
    throw new Error("Method not implemented");
  }
}

module.exports = IUserRepository;
