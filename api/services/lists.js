const { Op, where } = require("sequelize");
const { List, Client } = require("../models");

class ListsService {
  static async createList(req, res) {
    //* La lista se crea a partir de un formulario desde el front.(Llega por body.)
    try {
      const list = await List.create(req.body);
      res.status(201).send({ message: "Lista creada correctamente", list });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static async getSingle(req, res) {
    try {
      const list = await List.findByPk(req.params.id, {
        include: { model: Client },
      });
      res.send(list);
    } catch (error) {
      console.error(error);
    }
  }

  static async searchList(req, res) {
    const search = req.params.search;
    try {
      const list = await List.findAll({
        where: {
          [Op.or]: [
            {
              description: {
                [Op.iLike]: `%${search}%`,
              },
            },
          ],
        },
      });
      res.send(list);
    } catch (error) {
      console.error(error);
    }
  }

  static async findAll(req, res, next) {
    try {
      const lists = await List.findAll({ include: { model: Client } });
      if (!lists) throw next();
      lists.sort((a, b) => // ordena las listas alfabeticamente antes de mandarlas al front
        a.description > b.description
          ? 1
          : b.description > a.description
          ? -1
          : 0
      );
      res.status(200).send(lists);
    } catch (error) {
      res.status(500).send({ message: "No hay listas que mostrar." });
    }
  }

  static async deleteList(req, res, next) {
    //* La lista se elimina pasando el id por query params.
    //* Ejemplo= {{url}}/api/list/delete?id=1 --> Luego del delete agregar ? seguido de id=(aca va el id)
    const { id } = req.query;
    try {
      const list = await List.destroy({ where: { id } });
      if (!list) throw next();
      res.status(204).send({ message: "Lista eliminada satisfactoriamente" });
    } catch (error) {
      res.status(500).send({ message: "No existe la lista." });
    }
  }

  static async modifyList(req, res, next) {
    //* Pasamos el id por query params.
    const { id } = req.query;
    //* Pasamos el estado del booleano para pausar/despausar por body.
    const { paused, description } = req.body;
    try {
      const list = await List.update(
        { paused, description },
        { where: { id } }
      );
      if (list[0] === 0) throw next();
      res.status(200).send({ message: "Lista modificada satisfactoriamente" });
    } catch (error) {
      res.status(500).send({ message: "No existe la lista." });
    }
  }
}

module.exports = ListsService;
