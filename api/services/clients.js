const { Client, List, Office } = require("../models")
const { Op } = require("sequelize")

class ClientsService {
  static async getAll(req, res) {
    try {
      const clients = await Client.findAll({
        include: [{ model: List }, { model: Office }],
      })
      res.status(200).send(clients)
    } catch ({ error }) {
      res.status(500)
    }
  }

  static async getOne(req, res) {
    const { id } = req.params
    try {
      const client = await Client.findByPk(id, {
        include: [{ model: List }, { model: Office }],
      })
      res.status(200).send(client)
    } catch (error) {
      res.status(500)
    }
  }

  static async createOne(req, res) {
    const { fullName, company, area, email } = req.body
    try {
      const client = await Client.create({ fullName, company, area, email })
      res.status(201).send(client)
    } catch (error) {
      res.status(500)
    }
  }

  static async editOne(req, res) {
    const { id } = req.params
    try {
      const client = await Client.findByPk(id)

      !client && res.status(500).send({ message: `Client ${id} not exist` })

      await Client.update(req.body, { where: { id } })
      res.status(201).send({
        message: `Client ${id} edited successfully.`,
      })
    } catch (error) {
      res.status(500)
    }
  }

  static async deleteOne(req, res) {
    const { id } = req.params
    try {
      const client = await Client.findByPk(id)

      !client && res.status(500).send({ message: `Client ${id} not exist` })

      await Client.destroy({ where: { id } })

      res.status(202).send({
        message: `Client ${client.id} destroyed.`,
      })
    } catch (error) {
      res.status(500)
    }
  }
}

module.exports = ClientsService
