module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define("Event", {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    date: DataTypes.TEXT,
    time: DataTypes.TEXT,
    contactInfo: DataTypes.TEXT
  });
  Event.associate = function(models) {
    Event.hasMany(models.Comment, {
      onDelete: "cascade"
    });
  };
  Event.associate = function(models) {
    Event.belongsTo(models.User, {
      foreignKey: { allowNull: false }
    });
  };
  return Event;
};
