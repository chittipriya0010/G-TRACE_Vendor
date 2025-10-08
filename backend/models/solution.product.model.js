import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const SolutionMaster = sequelize.define("solution_master", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  sales_product: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false, // since your table doesn't have createdAt/updatedAt
  tableName: "solution_master", // explicitly maps to your table
});

export default SolutionMaster;