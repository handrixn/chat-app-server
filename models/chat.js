'use strict';
module.exports = (sequelize, DataTypes) => {
  const chat = sequelize.define('chat', {
    chat: DataTypes.TEXT,
    user_id: DataTypes.INTEGER
  }, {
    scopes: {
      withUser: {
        include: ['user']
      }
    }
  });
  chat.associate = function(models) {
    // associations can be defined here
    chat.belongsTo(models.user, {
    	foreignKey: 'user_id'
    })
  };
  return chat;
};