module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    type: DataTypes.STRING,
    total: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Transaction.belongsTo(models.User);
      }
    }
  });

  return Transaction;
};
