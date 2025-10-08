// models/Team.js
import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Team = sequelize.define(
  "Team",
  {
    id: {
      type: DataTypes.BIGINT(20),
      autoIncrement: true,
      primaryKey: true,
    },
    team_name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    tableName: "teams",
    timestamps: false,
  }
);

export default Team;