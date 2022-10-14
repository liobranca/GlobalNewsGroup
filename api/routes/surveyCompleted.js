const express = require("express");
const router = express.Router();
const SurveyCompletedService = require("../services/surveyCompleted");

router.get("/", SurveyCompletedService.getAll)
router.get("/single", SurveyCompletedService.getSingle)
router.post("/createSurveyCompleted", SurveyCompletedService.createSurveyComplete)
router.delete("/deleteSurveyCompleted", SurveyCompletedService.deleteSurveyComplete)

module.exports = router;
