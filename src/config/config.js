require("dotenv").config();

const config = {
  db: {
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "postgres",
    name: process.env.DB_NAME || "fluxo_auth",
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 5432,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "chave_secreta",
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  },
  redis: {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: process.env.REDIS_PORT || 6379,
  },
};

module.exports = config;
