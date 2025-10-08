// models/addClient.model.js
import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const AddClient = sequelize.define(
  "AddClient",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    Userid: { type: DataTypes.BIGINT(20), allowNull: false }, // this is userId
    sys_group_id: { type: DataTypes.BIGINT(20), allowNull: true }, // this is token
    UserName: { type: DataTypes.STRING(90), allowNull: true },
    company: { type: DataTypes.STRING(255), allowNull: true },
  },
  {
    tableName: "addclient",
    timestamps: false,
  }
);

export default AddClient;