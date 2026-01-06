const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");
const Slot = require("./Slot");

const Booking = sequelize.define("Booking", {
  meetLink: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(Booking);
Slot.hasMany(Booking);
Booking.belongsTo(User);
Booking.belongsTo(Slot);

module.exports = Booking;
