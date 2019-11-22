'use strict';
module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define('Card', {
    name: DataTypes.STRING,
    status: DataTypes.STRING,
    content: DataTypes.STRING,
    category: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Card.associate = function(models) {
    // associations can be defined here
    Card.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    })
  };
  return Card;
};