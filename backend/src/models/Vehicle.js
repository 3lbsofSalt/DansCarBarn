module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define('Vehicle', {
    make: DataTypes.STRING,
    model: DataTypes.STRING,
    year: DataTypes.INTEGER,
    price_class: {
      type: DataTypes.STRING, //DataTypes.ENUM('BRONZE', 'SILVER', 'GOLD'),
    },
    image: DataTypes.TEXT,
    deleted: DataTypes.BOOLEAN,
  }, {
    classMethods: {
      associate: function(models) {
        Vehicle.hasMany(models.Reservation);
      }
    }
  });

  return Vehicle;
};
