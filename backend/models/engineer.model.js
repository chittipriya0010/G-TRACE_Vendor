// engineer.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import Role from './role.model.js';

const Engineer = sequelize.define(
  'engineer',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id',
    },
    engineer_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'engineer_name',
    },
    stream: {
      type: DataTypes.JSON,
      allowNull: true,
      field: 'stream',
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Role,
        key: 'role_id',
      },
      field: 'role_id',
    },
  },
  {
    tableName: 'engineers',
    timestamps: false,
    freezeTableName: true,
  }
);

// Associations
Engineer.belongsTo(Role, {
  foreignKey: 'role_id',
  as: 'role',
});

Role.hasMany(Engineer, {
  foreignKey: 'role_id',
  as: 'serviceEngineers',
});

export default Engineer;