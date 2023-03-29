module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define('Vehicle', {
    make: DataTypes.STRING,
    model: DataTypes.STRING,
    year: DataTypes.INTEGER,
    price_class: {
      type: DataTypes.STRING, //DataTypes.ENUM('BRONZE', 'SILVER', 'GOLD'),
    },
    imageId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Vehicle.hasMany(models.Reservation);
      }
    }
  });

  return Vehicle;
};
