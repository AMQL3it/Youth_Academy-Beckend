const { DataTypes } = require('sequelize');
const sequelize = require('../databases/config');

const Member = sequelize.define('Member', {
    member_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    member_name: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true
    },
    member_email: {
      type: DataTypes.STRING,
      unique: true
    },
    member_phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    member_password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'members'
  });


module.exports = Member ;