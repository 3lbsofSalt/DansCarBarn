module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define('Vehicle', {
    make: DataTypes.STRING,
    model: DataTypes.STRING,
    year: DataTypes.INTEGER,
    class: {
      type: DataTypes.ENUM,
      value: ['SHMUCK', 'GRUNT', 'TIGIR_DEMON_DRAGON']
    }
  });

  return Vehicle;
};
