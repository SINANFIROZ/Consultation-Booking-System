const Slot = require("../models/Slot");
const Booking = require("../models/Booking");
const sequelize = require("../config/db");
const { createMeetEvent } = require("../services/calendar.service");

/*View available slots (active + capacity > 0)*/
exports.getAvailableSlots = async (req, res) => {
  try {
    const slots = await Slot.findAll({
      where: {
        isActive: true,
        capacity: { [sequelize.Sequelize.Op.gt]: 0 },
      },
      order: [["date", "ASC"], ["startTime", "ASC"]],
    });

    res.json(slots);
  } catch (error) {
    console.error("Get available slots error:", error);
    res.status(500).json({ error: "Failed to fetch slots" });
  }
};

/*Book a slot*/
exports.bookSlot = async (req, res) => {
  const { slotId } = req.body;
  const userId = req.user.id;

  if (!slotId) {
    return res.status(400).json({ error: "slotId is required" });
  }

  const transaction = await sequelize.transaction();

  try {
    // Lock slot row
    const slot = await Slot.findOne({
      where: { id: slotId, isActive: true },
      lock: transaction.LOCK.UPDATE,
      transaction,
    });

    if (!slot || slot.capacity <= 0) {
      await transaction.rollback();
      return res.status(400).json({ error: "Slot unavailable" });
    }

    // Prevent double booking
    const existingBooking = await Booking.findOne({
      where: { UserId: userId, SlotId: slotId },
      transaction,
    });

    if (existingBooking) {
      await transaction.rollback();
      return res.status(400).json({ error: "Already booked this slot" });
    }

    // Generate real Google Meet link
    const meetLink = await createMeetEvent({
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
    });

    // Create booking
    const booking = await Booking.create(
      {
        UserId: userId,
        SlotId: slotId,
        meetLink,
      },
      { transaction }
    );

    const { sendEmail } = require("../services/email.service");

    const slotTime = `${slot.startTime} - ${slot.endTime}`;

    const emailHtml = `
    <h3>Consultation Confirmed</h3>
    <p><strong>Date:</strong> ${slot.date}</p>
    <p><strong>Time:</strong> ${slotTime}</p>
    <p><strong>Google Meet:</strong>
        <a href="${meetLink}">${meetLink}</a>
    </p>
    `;

    await sendEmail({
    to: req.user.email,
    subject: "Your Consultation Booking",
    html: emailHtml,
    });

    await sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: "New Consultation Booked",
    html: emailHtml,
    });


    // Reduce capacity
    slot.capacity -= 1;
    await slot.save({ transaction });

    await transaction.commit();
    res.status(201).json(booking);
  } catch (error) {
    await transaction.rollback();
    console.error("Booking error:", error);
    res.status(500).json({ error: "Booking failed" });
  }
};
