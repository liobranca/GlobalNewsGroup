const { Client, List, Office, User } = require("../models")

class relacionesService {
  //* Relaciona un cliente con la lista.
  static relacionListaCliente = async (req, res) => {
    //* Requiere id del cliente y el id de la lista( todo por query params )
    const { idClient, idList } = req.query
    try {
      const list = await List.findByPk(idList)
      const client = await Client.findByPk(idClient)

      //* MagicMethod de sequelize.
      client.addList(list)
      res.sendStatus(201)
    } catch (error) {
      console.error(error)
    }
  }

  //* Remueve un cliente de la lista.
  static removeListaCliente = async (req, res) => {
    //* Requiere id del cliente y el id de la lista( todo por query params )
    const { idClient, idList } = req.query
    try {
      const list = await List.findByPk(idList)
      const client = await Client.findByPk(idClient)

      //* MagicMethod de sequelize.
      client.removeList(list)
      res.sendStatus(201)
    } catch (error) {
      console.error(error)
    }
  }

  static relacionClienteOficina = async (req, res) => {
    const { idClient, idOffice } = req.query
    try {
      const office = await Office.findByPk(idOffice)
      const client = await Client.findByPk(idClient)

      client.addOffice(office)
      res.sendStatus(201)
    } catch (error) {
      console.error(error)
    }
  }

  //* Relaciona un cliente con la lista.
  static relacionOfficeUser = async (req, res) => {
    //* Requiere id del cliente y el id de la lista( todo por query params )
    const { idOffice, idUser } = req.query
    try {
      const user = await User.findByPk(idUser)
      const office = await Office.findByPk(idOffice)
      //* MagicMethod de sequelize.
      office.addUser(user)
      res.sendStatus(201)
    } catch (error) {
      console.error(error)
    }
  }
  static relacionOfficeUserDelete = async (req, res) => {
    const { idOffice, idUser } = req.query
    try {
      const user = await User.findByPk(idUser)
      const office = await Office.findByPk(idOffice)
      //* MagicMethod de sequelize.
      office.removeUser(user)
      res.sendStatus(201)
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = relacionesService
