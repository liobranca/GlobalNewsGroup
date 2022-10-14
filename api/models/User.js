const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const bcrypt = require("bcrypt")

class User extends Model {
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }

  validatePassword(password) {
    return this.hash(password, this.salt).then(
      (newHash) => newHash === this.password
    );
  }
}

User.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      // validate: { isEmail: true },
      allowNull: false,
      unique: true,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "user",
  }
);
User.beforeCreate((user) => {
  const salt = bcrypt.genSaltSync(); //generamos el salt
  user.salt = salt; //le asignamos el salt a la instancia de User

  return user.hash(user.password, salt).then((hash) => {
    //esperamos a que se genere el password hasheado para despues crear el usuario
    user.password = hash;
  });
});

module.exports = User;
