const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const {
  createRegistration,
  getRegistrations,
  getEventRegistrations,
} = require("../controllers/registrationController");

router.post("/", auth, createRegistration);
router.get("/", auth, role("admin"), getRegistrations);
router.get("/event/:eventId", auth, role("admin"), getEventRegistrations);

module.exports = router;
