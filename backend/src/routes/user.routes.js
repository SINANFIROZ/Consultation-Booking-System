const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");

router.use(auth);

router.get("/slots", userController.getAvailableSlots);
router.post("/book", userController.bookSlot);

module.exports = router;
