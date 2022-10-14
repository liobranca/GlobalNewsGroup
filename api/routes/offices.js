const express = require("express");
const router = express.Router();
const OfficesService = require("../services/offices");

router.get("/", OfficesService.getAll);
router.get("/search", OfficesService.searchOfficeByCountry);
router.get("/single", OfficesService.searchOfficeById);
router.post("/", OfficesService.createOne);
router.put("/:id", OfficesService.editOne);
router.delete("/:id", OfficesService.deleteOne);

module.exports = router;
