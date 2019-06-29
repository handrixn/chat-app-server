'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
  	defaultScope: {
  		attributes: {
  			exclude: ['password']
  		}
  	},
  	scopes: {
  		withPassword: {
  			attributes: {
  				include: ['password']
  			}
  		}
  	}
  });
  user.associate = function(models) {
    // associations can be defined here
    user.hasMany(models.chat, {
      foreignKey: 'user_id'
    })
  };
  return user;
};