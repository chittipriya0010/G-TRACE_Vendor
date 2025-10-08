// models/Role.js
import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Role = sequelize.define(
  "Role",
  {
    role_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    permissions: {
      type: DataTypes.JSON, // using JSON for permissions
      defaultValue: [],
    },
  },
  {
    tableName: "role",
    timestamps: true,
  }
);

export default Role;