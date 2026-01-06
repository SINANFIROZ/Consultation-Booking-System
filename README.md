# Online Consultation Booking System

A full-stack application that allows users to book consultation slots and receive a **real Google Meet link via email**.<br>
The system supports **admin and user roles**, **slot management**, **transaction-safe booking**, and **real external integrations**.

---

## 🚀 Tech Stack

### 🔧 Backend
- **Node.js**
- **Express.js**
- **PostgreSQL (Neon)**

### 🎨 Frontend
- **React (Vite)**

### 🔗 Integrations
- **Google Calendar API (OAuth2)** – for real Google Meet links  
- **Nodemailer (Gmail SMTP)** – for real email notifications

---

## ✨ Features

### 👨‍💼 Admin
- Create consultation slots (date, start time, end time, capacity)<br>
- View all created slots<br>
- Enable or disable slots<br>
- View booking count per slot

### 👤 User
- View available slots<br>
- Book a slot<br>
- Prevent double booking and overbooking<br>
- Receive booking confirmation with:<br>
  - Date & time<br>
  - Google Meet link<br>
- Receive confirmation email

---

## 📅 Google Meet Integration
- Uses **Google Calendar API with OAuth2**<br>
- Generates **real and unique Google Meet links**<br>
- Links are stored with the booking record<br>
- No mock or placeholder links are used<br>
- OAuth2 was chosen instead of service accounts due to Google Meet limitations on personal calendars

---

## 📧 Email Notifications
On successful booking:<br>
- An email is sent to the **user**<br>
- An email is sent to the **admin**<br>
- Emails include:<br>
  - Booking Date<br>
  - Booking Time<br>
  - Google Meet Link<br>

Implemented using **Nodemailer with Gmail SMTP and App Passwords**.

---

## 🖥️ Frontend Overview
A minimal React frontend is included to demonstrate:<br>
- Admin vs User flows<br>
- Slot creation and management<br>
- Slot booking<br>
- Booking confirmation with Meet link<br>

A **simple role switch** is used in the UI to toggle between Admin and User views.

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (**v18+ recommended**)<br>
- PostgreSQL database (Neon or equivalent)<br>
- Google Cloud project with **Calendar API enabled**<br>
- Gmail account with **App Password enabled**

### Backend Setup
```bash
cd backend
npm install
node src/server.js
```

### Frontend Setup
```bash
cd backend
npm install
node src/server.js
```
---
### 🔐 Environment Variables
Create a .env file in the backend directory using the template below:
```env
DATABASE_URL=

EMAIL_USER=
EMAIL_PASS=
ADMIN_EMAIL=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=
```
Sensitive files and tokens are excluded via .gitignore

---

### Known Limitations
Frontend authentication minimal<br>
UI styling is minimal

### Potential Improvements
JWT or OAuth-based authentication<br>
Better frontend UX and validation<br>
Admin analytics and reporting

