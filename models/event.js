module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define("Event", {
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    contactInfo: {
      type: DataTypes.TEXT
    }
  });
  Event.associate = function(models) {
    Event.hasMany(models.Comment, {
      onDelete: "cascade"
    });
  };
  Event.associate = function(models) {
    Event.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Event;
};
