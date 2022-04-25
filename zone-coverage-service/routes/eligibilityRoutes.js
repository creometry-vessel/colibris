const express = require("express")

const eligibilityController = require("../controllers/eligibilityController")

const router = express.Router()

router
    .route("/")
    .get(eligibilityController.checkEligibility)


module.exports = router;