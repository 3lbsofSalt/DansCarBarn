import { hashPassword } from '../lib/auth.js';
import safeAwait from 'safe-await';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    hash: {
      type: DataTypes.STRING,
    },
    balance: {
      type: DataTypes.INTEGER,
      default: 0
    },
    role: DataTypes.STRING, //DataTypes.ENUM('CUSTOMER', 'EMPLOYEE', 'MANAGER'),
    active: {
      type: DataTypes.BOOLEAN,
      default: true,
    },
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Transaction);
      }
    }
  });

  User.prototype.subtractUserBalance = function(amount) {
    if(this.balance < amount) {
      return false;
    }

    this.balance = (this.balance ?? 0) - Number(amount);

    return true;
  }

  User.prototype.addUserBalance = function(amount) {
    this.balance = (this.balance ?? 0) + Number(amount);
    console.log(this.balance);
    this.save();
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
