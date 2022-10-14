const express = require("express")
const router = express.Router()
const users = require("./users")
const offices = require("./offices")
const clients = require("./clients")
const relaciones = require("./relaciones")
const list = require("./list")
const survey = require("./survey")
const surveyCompleted = require("./surveyCompleted")

router.use("/offices", offices)
router.use("/user", users)
router.use("/relaciones", relaciones)
router.use("/lists", list)
router.use("/clients", clients)
router.use("/survey", survey)
router.use("/surveyCompleted", surveyCompleted)

module.exports = router
