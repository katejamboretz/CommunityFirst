module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.TEXT
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  User.associate = function(models) {
    User.hasMany(models.Event, {
      onDelete: "cascade"
    });
  };
  User.associate = function(models) {
    User.hasMany(models.Comment, {
      onDelete: "cascade"
    });
  };
  return User;
};
