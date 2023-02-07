import fs from 'fs';

import path from 'path';
const basename = path.basename(__filename);

import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres://madram@localhost:5432/dansCarBarn');


const db = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if(db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

sequelize.sync();

module.exports = db;
