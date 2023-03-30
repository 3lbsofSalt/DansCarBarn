import fs from 'fs';

import path from 'path';
const basename = path.basename(__filename);

import { Sequelize } from 'sequelize';


const sequelize = new Sequelize('postgres://' + process.env.DATABASE_URL + '/' + process.env.DATABASE_NAME);

const db = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ('classMethods' in db[modelName].options) {
    if('associate' in db[modelName].options.classMethods) {
      db[modelName].options.classMethods.associate(db);
    }
  }
});

db.sequelize = sequelize;

sequelize.sync();

export default db;
