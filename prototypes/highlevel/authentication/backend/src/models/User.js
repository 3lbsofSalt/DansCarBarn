import { Sequelize, DataTypes } from 'sequelize';
import { hashPassword } from '../lib/auth.js';
import safeAwait from 'safe-await';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    hash: DataTypes.STRING,
  });

  User.prototype.checkPassword = async function(password) {

    const [hashError, hashToCheck] = await safeAwait(hashPassword(password));

    if(this.hash === hashToCheck) {
      return true;
    }

    return false;
  }

  return User;
};
