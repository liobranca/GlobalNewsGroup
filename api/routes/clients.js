const express = require("express");
const router = express.Router();
const ClientsService = require("../services/clients");

router.get("/", ClientsService.getAll);
router.post("/", ClientsService.createOne);
router.put("/:id", ClientsService.editOne);
router.delete("/:id", ClientsService.deleteOne);

module.exports = router;
