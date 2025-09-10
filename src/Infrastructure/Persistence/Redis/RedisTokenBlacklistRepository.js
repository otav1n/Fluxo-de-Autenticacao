const redis = require("redis");
const config = require("../../../config/config");

const client = redis.createClient({
  socket: {
    host: config.redis.host,
    port: config.redis.port,
  },
});

client.on("error", (err) => console.log("Redis Client Error", err));

client.connect();

class RedisTokenBlacklistRepository {
  static async add(token, expiresIn) {
    await client.setEx(token, Math.floor(expiresIn / 1000), "blacklisted");
  }

  static async has(token) {
    const result = await client.get(token);
    return result === "blacklisted";
  }
}

module.exports = RedisTokenBlacklistRepository;
