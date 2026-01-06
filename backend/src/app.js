const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/user", require("./routes/user.routes"));
app.use("/auth", require("./routes/google.auth.routes"));


app.get("/", (req, res) => {
  res.send("API is running");
});

const auth = require("./middlewares/auth.middleware");

app.get("/test-auth", auth, (req, res) => {
  res.json({
    message: "Authenticated",
    user: req.user,
  });
});

module.exports = app;
