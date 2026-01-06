const Slot = require("../models/Slot");
const Booking = require("../models/Booking");

/*Create a new slot*/
exports.createSlot = async (req, res) => {
  try {
    const { date, startTime, endTime, capacity } = req.body;

    if (!date || !startTime || !endTime || !capacity) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const slot = await Slot.create({
      date,
      startTime,
      endTime,
      capacity,
    });

    res.status(201).json(slot);
  } catch (error) {
    console.error("Create slot error:", error);
    res.status(500).json({ error: "Failed to create slot" });
  }
};

/*Get all slots*/
exports.getAllSlots = async (req, res) => {
  try {
    const slots = await Slot.findAll({
      order: [["date", "ASC"], ["startTime", "ASC"]],
    });

    res.json(slots);
  } catch (error) {
    console.error("Get slots error:", error);
    res.status(500).json({ error: "Failed to fetch slots" });
  }
};

/*Enable / Disable slot*/
exports.toggleSlot = async (req, res) => {
  try {
    const { id } = req.params;

    const slot = await Slot.findByPk(id);
    if (!slot) {
      return res.status(404).json({ error: "Slot not found" });
    }

    slot.isActive = !slot.isActive;
    await slot.save();

    res.json(slot);
  } catch (error) {
    console.error("Toggle slot error:", error);
    res.status(500).json({ error: "Failed to update slot" });
  }
};

/*View bookings for a slot*/
exports.getSlotBookings = async (req, res) => {
  try {
    const { id } = req.params;

    const bookings = await Booking.findAll({
      where: { SlotId: id },
    });

    res.json(bookings);
  } catch (error) {
    console.error("Get bookings error:", error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};
