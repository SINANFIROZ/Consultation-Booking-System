const { google } = require("googleapis");
const oauth2Client = require("../config/google.oauth");
const fs = require("fs");

const tokens = JSON.parse(fs.readFileSync("google-tokens.json"));
oauth2Client.setCredentials(tokens);

const calendar = google.calendar({
  version: "v3",
  auth: oauth2Client,
});

async function createMeetEvent({ date, startTime, endTime }) {
  const event = {
    summary: "Online Consultation",
    start: {
      dateTime: `${date}T${startTime}`,
      timeZone: "Asia/Kolkata",
    },
    end: {
      dateTime: `${date}T${endTime}`,
      timeZone: "Asia/Kolkata",
    },
    conferenceData: {
      createRequest: {
        requestId: Date.now().toString(),
      },
    },
  };

  const response = await calendar.events.insert({
    calendarId: "primary",
    conferenceDataVersion: 1,
    requestBody: event,
  });

  return response.data.hangoutLink;
}

module.exports = { createMeetEvent };
