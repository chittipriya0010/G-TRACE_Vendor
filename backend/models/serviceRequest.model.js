import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const ServiceRequest = sequelize.define(
  "ServiceRequest",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    username: { type: DataTypes.STRING(100), allowNull: false },
    vehicleNo: { type: DataTypes.STRING(50), allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'Raised', allowNull: false},
    problem: { type: DataTypes.STRING(255), allowNull: false },
    contactPerson: { type: DataTypes.STRING(100), allowNull: false },
    contactNumber: { type: DataTypes.STRING(20), allowNull: false },
    serviceLocation: { type: DataTypes.STRING(255), allowNull: false },
    date: { type: DataTypes.STRING(20), allowNull: false }, // keep as string "dd-mm-yyyy"
    recommendedAction: { type: DataTypes.STRING(255), allowNull: true },
  },
  {
    tableName: "service_requests",
    timestamps: true, // adds createdAt, updatedAt
  }
);

export default ServiceRequest;