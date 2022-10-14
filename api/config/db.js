const Sequelize = require("sequelize")

const db = new Sequelize("encuestasgng", null, null, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
})

module.exports = db
