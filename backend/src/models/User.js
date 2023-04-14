import { hashPassword } from '../lib/auth.js';
import safeAwait from 'safe-await';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    hash: {
      type: DataTypes.STRING,
    },
    balance: DataTypes.INTEGER,
    role: DataTypes.STRING, //DataTypes.ENUM('CUSTOMER', 'EMPLOYEE', 'MANAGER'),
    active: {
      type: DataTypes.BOOLEAN,
      default: true
    }
  });

  User.prototype.subtractUserBalance = function(amount) {
    if(this.balance < amount) {
      return false;
    }

    this.balance -= amount;
    return true;
  }

  User.prototype.addUserBalance = function(amount) {
    this.balance += amount;
    return true;
  }

  User.prototype.checkPassword = async function (password) {
    const [hashError, hashToCheck] = await safeAwait(hashPassword(password));

    if (hashError) {
      console.log(hashError);
      return false;
    }

    if (this.hash === hashToCheck) {
      return true;
    }

    return false;
  };

  return User;
};
