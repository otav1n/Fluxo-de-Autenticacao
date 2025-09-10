class ITokenBlackListRepository {
  async add(token, expiresIn) {
    throw new Error("Method not implemented");
  }

  async exists(token) {
    throw new Error("Method not implemented");
  }
}

module.exports = ITokenBlackListRepository;
