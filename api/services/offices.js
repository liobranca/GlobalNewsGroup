const { Office, User, Client } = require("../models");
const { Op } = require("sequelize");

// VER TODAS LAS OFICINAS: GET localhost:8080/api/offices
class OfficesService {
  static async getAll(req, res) {
    try {
      const office = await Office.findAll({ include:[{model: Client}] },);
      res.status(200).send(office);
    } catch ({ error }) {
      res.status(500);
    }
  }

  // COMO BUSCAR DESDE FRONT: GET localhost:8080/api/offices/search?input={STRING DE PAIS DE BUSQUEDA}
  static async searchOfficeByCountry(req, res) {
    
    const { input } = req.query;
    try {
      const result = await Office.findAll({
        where: {
          country: {
            [Op.iLike]: input,
          },
        },
      });
      res.status(200).send(result);
    } catch ({ error }) {
      res.status(500);
    }
  }
  // COMO BUSCAR DESDE FRONT: GET localhost:8080/api/offices/single?id={ID DE PAIS DE BUSQUEDA}
  static async searchOfficeById(req, res) {
    
    const { id } = req.query;
    try {
      const result = await Office.findByPk(id,{ include: { model: User } });
      res.status(200).send(result);
    } catch ({ error }) {
      res.status(500);
    }
  }

  // COMO CREAR DESDE FRONT: POST localhost:8080/api/offices
  // {
  //   country: "Argentina"
  //   name: "Oficina de ejemplo"
  // }
  static async createOne(req, res) {
    const { country, name } = req.body;
    try {
      const office = await Office.create({ country, name });
      res.status(201).send(office);
    } catch (error) {
      res.status(500);
    }
  }

  // COMO EDITAR DESDE FRONT: PUT localhost:8080/api/offices/{id}
  // {
  //   country: "Valor editado" OPCIONAL
  //   name: "Valor editado" OPCIONAL 
  // }
  static async editOne(req, res) {
    const { id } = req.params;
    try {
      const [officeOutdated, officeUpdated] = await Office.update(req.body, {
        where: { id },
        returning: true
      });
      res.status(204).send(officeUpdated);
    } catch (error) {
      res.status(500);
    }
  }

  // DELETE localhost:8080/api/offices/{id}
  static async deleteOne(req, res) {
    const { id } = req.params;
    try {
      const office = await Office.findByPk(id);

      !office && res.status(500).send({ message: `Office ${id} not exist` });

      await Office.destroy({ where: { id } });

      res.status(202).send({
        message: `Office ${office.id} destroyed.`,
      });
    } catch (error) {
      res.status(500);
    }
  }
}

module.exports = OfficesService;
