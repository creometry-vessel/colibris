const express = require("express")

const zoneController = require("../controllers/zoneController")

const router = express.Router()

router.route("/").get(zoneController.getAllZones)
router.route("/findbycity/").get(zoneController.findByCity)
router.route("/:weekday").patch(zoneController.updateZone)
router.route("/:weekday").delete(zoneController.deleteZone)


module.exports = router;