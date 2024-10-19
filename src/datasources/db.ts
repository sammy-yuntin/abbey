import { Sequelize } from "sequelize";
import { env } from "../config";
import { Logger } from "../libs";

const dbClient = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
  host: env.DB_HOST,
  dialect: "mysql",
  port: parseInt(env.DB_PORT),
  logging: false,
  pool: {
    max: 2,
    min: 0,
    acquire: 3000,
    idle: 0
  }
});

dbClient
  .sync({ alter: true })
  .then(() => {
    Logger.info("Database connected successfully!");
  })
  .catch((err) => Logger.error(err));

export default dbClient;
