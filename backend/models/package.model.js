import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import Client from "./client.model.js";
import Billing from "./billing.model.js";
import Team from "./team.model.js";

const Package = sequelize.define(
  "Package",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Client, key: "id" },
      onDelete: "CASCADE",
    },
    billId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Billing, key: "id" },
      onDelete: "CASCADE",
    },

    subscription_next_bill_date: { type: DataTypes.DATEONLY, allowNull: true },
    hardware_next_bill_date: { type: DataTypes.DATEONLY, allowNull: true },
    installation_next_bill_date: { type: DataTypes.DATEONLY, allowNull: true },

    solutionType: { type: DataTypes.STRING(50), allowNull: true },
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Team, key: "id" },
      onDelete: "CASCADE",
    },
    paymentMethod: { type: DataTypes.ENUM("Non Cheque", "Cheque / RTGS"), allowNull: false },

    hardware: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    hardwareGstIncluded: { type: DataTypes.BOOLEAN, defaultValue: false },
    hardwarePlan: { 
      type: DataTypes.ENUM("One-Time","Monthly","Quarterly","Half Yearly","2 years","3 years","4 years","5 years", "Perpectual/Ongoing"), 
      defaultValue: "One-Time" 
    },
    hardwareMonth: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }, // One-Time = 0

    installation: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    installationGstIncluded: { type: DataTypes.BOOLEAN, defaultValue: false },
    installationPlan: { 
      type: DataTypes.ENUM("One-Time","Monthly","Quarterly","Half Yearly","2 years","3 years","4 years","5 years", "Perpectual/Ongoing"), 
      defaultValue: "Half Yearly" 
    },
    installationMonth: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 6 }, // Half Yearly = 6

    subscription: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    subscriptionPlan: { 
      type: DataTypes.ENUM("One-Time","Monthly","Quarterly","Half Yearly","2 years","3 years","4 years","5 years", "Perpectual/Ongoing"), 
      defaultValue: "Half Yearly" 
    },
    subscriptionGstIncluded: { type: DataTypes.BOOLEAN, defaultValue: true },
    subscriptionMonth: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 6 }, // Half Yearly = 6

    status: { type: DataTypes.ENUM("Pending", "Billed", "Rejected"), allowNull: false, defaultValue: "Pending" },
    totalAmount: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
  },
  {
    tableName: "packages",
    timestamps: true,
  }
);

// Associations
Package.belongsTo(Client, { foreignKey: "clientId" });
Package.belongsTo(Billing, { foreignKey: "billId" });
Package.belongsTo(Team, { foreignKey: "teamId" });

export default Package;