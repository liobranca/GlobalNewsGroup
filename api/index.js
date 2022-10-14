// Configuración del server
const dotenv = require("dotenv").config()
const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")

const models = require("./models")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Credentials", true)
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  )
  next()
})
const db = require("./config/db")

// const envs = require(".envs")

// Express Route File Requires
const routes = require("./routes")

app.use(express.json())
app.use(cookieParser())

// Express Routing
app.use("/api", routes)

db.sync({ force: false }).then(() => {
  console.log("db connected")
  app.listen(process.env.PORT || 8080, () => {
    console.log(`Server listening at port 8080`)
  })
})
