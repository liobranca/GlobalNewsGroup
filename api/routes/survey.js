const express = require("express");
const router = express.Router();
const SurveyService = require("../services/survey");

router.get("/", SurveyService.getAll)
router.get("/single", SurveyService.getSingle)
router.post("/createSurvey", SurveyService.createSurvey)
router.post("/sendSurvey", SurveyService.sendSurvey);
router.put("/modifySurvey", SurveyService.editSurvey)
router.delete("/removeSurvey", SurveyService.deleteSurvey)

module.exports = router;
