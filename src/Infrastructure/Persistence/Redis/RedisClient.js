const redis = require("redis");
const config = require("../../../config/config");

class RedisClient {
  constructor() {
    this.client = redis.createClient({
      url: `redis://${config.redis.host}:${config.redis.port}`,
    });

    this.client.on("error", (err) => {
      console.error("Redis Client Error", err);
    });

    this.client.connect();
  }

  async set(key, value, ttlInSeconds) {
    if (ttlInSeconds) {
      await this.client.setEx(key, ttlInSeconds, value);
    } else {
      await this.client.set(key, value);
    }
  }

  async get(key) {
    return await this.client.get(key);
  }

  async del(key) {
    return await this.client.del(key);
  }

  async exists(key) {
    const result = await this.client.exists(key);
    return result === 1;
  }
}

module.exports = new RedisClient();
