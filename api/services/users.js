const axios = require("axios");
const { User } = require("../models");
const { generateToken } = require("../config/token");

class UserService {

  static getAllUser = async (req, res) => {
    try {
      const users= await User.findAll()
      res.send(users)
    } catch (error) {
      console.error(error)
    }

  };
  
  static createUser = async (req, res) => {
    const body = req.body;
    try {
      const user = await User.create(body);
      res.status(201).send({
        firstName: user.firstName,
        lastName: user.lastName,
        admin: user.admin,
        email: user.email,
      });
    } catch ({ errors }) {
      res.status(500).send({ message: errors[0].message });
    }
  };

  static deleteUSer = async (req, res) => {
    const id = req.params.id;
    try {
      const user = await User.findByPk(id);
      //* Si el user no existe que arroje un error.
      if (!user)
        return res.status(500).send({ message: "error - user not exist" });
      //* Si existe que proceda con la eliminación
      await User.destroy({ where: { id: id } });
      res.status(202).send({ message: "Deleted" });
    } catch (error) {
      res.status(500).send({ message: error });
      console.error(error);
    }
  };

  static modifyUser = async (req, res) => {
    //* Recibe el id del user a modificar por params.
    const id = req.params.id;
    const password = req.body.password;
    try {
      const user = await User.findByPk(id);
      //* Si el user no existe que arroje un error.
      if (!user)
        return res.status(500).send({ message: "error - user not exist" });

      if (password) {
        const salt = user.salt;
        req.body.password = await user.hash(password, salt);
      }

      await User.update(req.body, {
        where: { id: id },
      });
      res.status(204).send();
    } catch (error) {
      console.error(error);
    }
  };

  static userLogin = async (req, res) => {
    //* Recibo email y password desde el front.
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user)
      return res.status(401).send({ message: "error - user not exist" });
    const isValid = await user.validatePassword(password);
    if (!isValid)
      return res.status(401).send({ message: "error - incorrect password" });
    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      admin: user.admin,
    };
    const token = generateToken(payload);
    
    res.cookie("token", token);
    res.status(200).send(payload);
  };

  static userMe = async (req, res) => {
    res.send(req.user);
  };

  static userLogout = async (req, res) => {
    res.clearCookie("token");
    res.sendStatus(204);
  };
}

module.exports = UserService;
