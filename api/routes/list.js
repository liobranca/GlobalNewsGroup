const express = require("express");
const ListsService = require("../services/lists");
const router = express.Router();

router.post("/create", ListsService.createList);
router.get("/", ListsService.findAll);
router.delete("/delete", ListsService.deleteList);
router.put("/modify", ListsService.modifyList);
router.get("/singleList/:id", ListsService.getSingle);
router.get("/search/:search", ListsService.searchList);

module.exports = router;
