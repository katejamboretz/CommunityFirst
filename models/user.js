module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.TEXT,
    email: DataTypes.TEXT
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
