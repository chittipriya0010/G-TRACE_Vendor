// vehType.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const VehType = sequelize.define(
  'veh_type',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id',
    },
    veh_type: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'veh_type',
    },
  },
  {
    tableName: 'veh_type',
    timestamps: false,
    freezeTableName: true,
  }
);

export default VehType;