import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import Client from "./client.model.js";

const Billing = sequelize.define("Billing", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  clientId: { type: DataTypes.INTEGER, allowNull: false }, // Foreign key
  billingName: { type: DataTypes.STRING(255), allowNull: false },
  accountNo: { type: DataTypes.STRING(50), allowNull: true },
  gstNo: { type: DataTypes.STRING(20), allowNull: false },
  panNo: { type: DataTypes.STRING(10), allowNull: false },
  billingAddress: { type: DataTypes.TEXT, allowNull: false },
  poOfficial: { type: DataTypes.STRING(255), allowNull: true }
}, {
  tableName: "billings",
  timestamps: true,
});

// Association
Billing.belongsTo(Client, { foreignKey: "clientId" });
Client.hasOne(Billing, { foreignKey: "clientId" });

export default Billing;