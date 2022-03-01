const express = require("express")

const zoneController = require("../controllers/zoneController")

const router = express.Router()

router.route("/").get(zoneController.getAllZones).post(zoneController.createZone)
router.route("/findByCity/").get(zoneController.findByCity)


module.exports = router;