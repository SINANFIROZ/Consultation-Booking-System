require("dotenv").config();
const app = require("./app");
const sequelize = require("./config/db");

require("./models/User");
require("./models/Slot");
require("./models/Booking");

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });    //alter:true is not for production purposes
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("DB connection failed:", error.message);
  }
}

startServer();
