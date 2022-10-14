const express = require("express");
const router = express.Router();
const relacionesService = require ("../services/relacionesService")

router.post("/relacionListaCliente", relacionesService.relacionListaCliente)
router.post("/removeListaCliente", relacionesService.removeListaCliente)
router.post("/relacionClienteOficina", relacionesService.relacionClienteOficina)
router.post("/relacionOfficeUser", relacionesService.relacionOfficeUser)
router.delete("/relacionOfficeUserDelete", relacionesService.relacionOfficeUserDelete)

module.exports = router;