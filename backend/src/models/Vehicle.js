module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define('Vehicle', {
    make: DataTypes.STRING,
    model: DataTypes.STRING,
    year: DataTypes.INTEGER,
    price_class: {
      type: DataTypes.ENUM('BRONZE', 'SILVER', 'GOLD'),
    },
    image: DataTypes.TEXT,
    deleted: DataTypes.BOOLEAN,
  });

  return Vehicle;
};
