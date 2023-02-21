module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define('Vehicle', {
    make: DataTypes.STRING,
    model: DataTypes.STRING,
    year: DataTypes.INTEGER,
    price_class: {
      type: DataTypes.ENUM,
      value: ['BRONZE', 'SILVER', 'GOLD']
    },
    imageId: DataTypes.INTEGER
  });

  return Vehicle;
};
