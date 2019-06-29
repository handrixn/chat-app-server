'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define('Chat', {
    chat: DataTypes.TEXT,
    user_id: DataTypes.INTEGER
  }, {});
  Chat.associate = function(models) {
    // associations can be defined here
    Chat.belongsTo(models.User, function() {
    	foreignKey: 'user_id'
    })
  };
  return Chat;
};