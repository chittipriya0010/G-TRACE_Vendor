// models/Branch.js
import { DataTypes } from "sequelize";
import sequelize from "../db.js"; // adjust the path to your sequelize instance

const Branch = sequelize.define(
  "Branch",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    branch_name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    area: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    branch_admin_email: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    tableName: "gtrac_branch",
    timestamps: false, // table does not have created_at or updated_at
  }
);

export default Branch;