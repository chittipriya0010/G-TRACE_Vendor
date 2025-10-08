import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import Role from "./role.model.js";
import Team from "./team.model.js";
import Branch from "./branch.model.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    full_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: {
        msg: "Email already exists",
      },
      validate: {
        isEmail: {
          msg: "Invalid email format",
        },
      },
    },
    phone: {
      type: DataTypes.STRING(20),
      unique: {
        msg: "Phone number already exists",
      },
    },
    mobile_token: {
      type: DataTypes.STRING(40),
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "blocked"),
      defaultValue: "active",
    },
    branch_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "gtrac_branch", // refers to your branch table
        key: "id",
      },
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

User.belongsTo(Role, { foreignKey: "role_id", onDelete: "CASCADE" });
User.belongsTo(Team, { foreignKey: "team_id", onDelete: "CASCADE" });
User.belongsTo(Branch, { foreignKey: "branch_id", onDelete: "CASCADE" });

export default User;