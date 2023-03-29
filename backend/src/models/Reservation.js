import User from './User.js';
module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    contactId: DataTypes.INTEGER,
    transactionId: DataTypes.INTEGER,
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    status: DataTypes.ENUM('SCHEDULED', 'IN_TRANSIT', 'RETURNED', 'CANCELED')
  }, {
    classMethods: {
      associate: function(models) {
        Reservation.belongsTo(models.User);
        Reservation.hasOne(models.Vehicle);
      }
    }
  });



  return Reservation;
}
