import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "your_database",
  process.env.DB_USER || "root",
  process.env.DB_PASS || "",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: false, // optional: hide SQL logs
    timezone: "+05:30", // ✅ Force Sequelize to use Indian Standard Time
  }
);

export default sequelize;