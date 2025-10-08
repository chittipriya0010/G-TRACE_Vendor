import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Installation = sequelize.define(
  "Installation",
  {
    job_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    client_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    client_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact_person: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contact_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    no_of_installations: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    installed_solution_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admin_no_of_installations: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    no_of_installed: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    available_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Pending", "Approved", "Closed", "Rejected"), // ASSIGNED removed
      defaultValue: "Pending",
    },
  },
  {
    tableName: "installations",
    timestamps: true, // adds createdAt and updatedAt
    underscored: true,
  }
);

export default Installation;