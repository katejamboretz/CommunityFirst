module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define("Comment", {
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
  Comment.associate = function(models) {
    Comment.belongsTo(models.User, {
      foreignKey: { allowNull: false }
    });
  };
  Comment.associate = function(models) {
    Comment.belongsTo(models.Event, {
      foreignKey: { allowNull: false }
    });
  };
  return Comment;
};
