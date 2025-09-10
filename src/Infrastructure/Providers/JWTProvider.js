const jwt = require("jsonwebtoken");
const config = require("../../config/config");

class JWTProvider {
  constructor() {
    this.secret = config.jwt.secret;
    this.expiresIn = config.jwt.expiresIn;
  }

  generateToken(payload) {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, this.secret);
    } catch (err) {
      return null;
    }
  }
}

module.exports = new JWTProvider();
