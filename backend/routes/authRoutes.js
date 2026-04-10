const router = require("express").Router();
const { register, login, getUsers } = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/users", auth, role("admin"), getUsers);

module.exports = router;
