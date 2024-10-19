import { Logger } from "../libs";
import env from "../config/env";
import { createClient } from "redis";

const redisClient =
  env.NODE_ENV === "TEST"
      ? createClient({
          socket: {
              host: env.REDIS_HOST,
              port: parseInt(env.REDIS_PORT)
          }
      })
      : createClient({
          url: env.REDIS_HOST
      });

redisClient
    .connect()
    .then(() => Logger.info("redis connected"))
    .catch((error) => Logger.error(error.message));

export default redisClient;
