const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const requireRole = require("../middlewares/role.middleware");
const adminController = require("../controllers/admin.controller");

// All admin routes require ADMIN role
router.use(auth, requireRole("ADMIN"));

router.post("/slots", adminController.createSlot);
router.get("/slots", adminController.getAllSlots);
router.patch("/slots/:id/toggle", adminController.toggleSlot);
router.get("/slots/:id/bookings", adminController.getSlotBookings);

module.exports = router;
