import { DataTypes } from "sequelize";
import sequelize from "../db.js"; // your Sequelize instance
import User from "./user.model.js";

const Client = sequelize.define("Client", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  salesId: { type: DataTypes.INTEGER, allowNull: false },
  branchId: { type: DataTypes.INTEGER, allowNull: false },
  firstName: { type: DataTypes.STRING(100), allowNull: false },
  lastName: { type: DataTypes.STRING(100), allowNull: false },
  emailAddress: { type: DataTypes.STRING(255), allowNull: false, unique: true, validate: { isEmail: true } },
  mobileNumber: { type: DataTypes.STRING(15), allowNull: false },
  companyName: { type: DataTypes.STRING(255), allowNull: false },
  state: { type: DataTypes.STRING(100), allowNull: false },
  address: { type: DataTypes.TEXT, allowNull: false },
}, {
  tableName: "clients",
  timestamps: true,
});

Client.belongsTo(User, { foreignKey: "salesId", as: "sales" });

export default Client;