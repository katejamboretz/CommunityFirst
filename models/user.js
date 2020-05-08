module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    email: {
      type: DataTypes.TEXT,
      isEmail: true,
      isUnique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      len: [2, 10]
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
