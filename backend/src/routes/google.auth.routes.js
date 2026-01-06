const router = require("express").Router();
const oauth2Client = require("../config/google.oauth");
const { google } = require("googleapis");

router.get("/google", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/calendar"],
    prompt: "consent",
  });

  res.redirect(url);
});

router.get("/google/callback", async (req, res) => {
  const { code } = req.query;

  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  // Store tokens locally (simple + acceptable for assignment)
  require("fs").writeFileSync("google-tokens.json", JSON.stringify(tokens));

  res.send("Google Calendar connected. You can close this tab.");
});

module.exports = router;
