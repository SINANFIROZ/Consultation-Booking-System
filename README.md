Online Consultation Booking System

A full-stack application that allows users to book consultation slots and receive a real Google Meet link via email.
The system supports admin and user roles, slot management, transaction-safe booking, and real external integrations.

Tech Stack:

Backend
Node.js
Express.js
PostgreSQL(Neon)

Frontend
React (Vite)

Integrations
Google Calendar API (OAuth2) – for real Google Meet links
Nodemailer (Gmail SMTP) – for real email notifications


Features:

Admin
Create consultation slots (date, start time, end time, capacity)
View all created slots
Enable or disable slots
View booking count per slot

User
View available slots
Book a slot
Prevent double booking and overbooking
Receive booking confirmation with:
Date & time
Google Meet link
Receive confirmation email

Google Meet Integration
Uses Google Calendar API with OAuth2
Generates real and unique Google Meet links
Links are stored with the booking record
No mock or placeholder links are used
OAuth2 was chosen instead of service accounts due to Google Meet limitations on personal calendars.

Email Notifications
On successful booking:
An email is sent to the user
An email is sent to the admin
Emails include: Booking Date, Time, Google Meet Link
Implemented using Nodemailer with Gmail SMTP and App Passwords.

Frontend Overview
A minimal React frontend is included to demonstrate:
Admin vs User flows
Slot creation and management
Slot booking
Booking confirmation with Meet link
A simple role switch is used in the UI to toggle between Admin and User views.


Setup Instructions:

Prerequisites
Node.js (v18+ recommended)
PostgreSQL database (Neon or equivalent)
Google Cloud project with Calendar API enabled
Gmail account with App Password enabled

Backend Setup
cd backend
npm install
node src/server.js

Create a .env file based on .env.example.

Frontend Setup
cd frontend
npm install
npm run dev


Environment Variables
DATABASE_URL=

EMAIL_USER=
EMAIL_PASS=
ADMIN_EMAIL=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=

Sensitive files and tokens are excluded via .gitignore


Known Limitations
Frontend authentication minimal
UI styling is minimal

Potential Improvements
JWT or OAuth-based authentication
Better frontend UX and validation
Admin analytics and reporting