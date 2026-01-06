import { useEffect, useState } from "react";
import { apiRequest } from "../api/api";

export default function User({ email }) {
  const [slots, setSlots] = useState([]);
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    apiRequest("/api/user/slots", "GET", null, email).then(setSlots);
  }, [email]);

  const bookSlot = async (slot) => {
    const res = await apiRequest(
      "/api/user/book",
      "POST",
      { slotId: slot.id },
      email
    );

    if (res.error) {
      alert(res.error);
    } else {
      setConfirmation({
        date: slot.date,
        startTime: slot.startTime,
        endTime: slot.endTime,
        meetLink: res.meetLink,
      });
    }
  };

  return (
    <div>
      <h2>User Panel</h2>

      {slots.map((slot) => (
        <div key={slot.id}>
          {slot.date} {slot.startTime} - {slot.endTime}
          <button onClick={() => bookSlot(slot)}>Book</button>
        </div>
      ))}

      {confirmation && (
        <div style={{ marginTop: "15px" }}>
          <p>
            <strong>Booking confirmed!</strong>
            <br />
            Date: {confirmation.date}
            <br />
            Time: {confirmation.startTime} – {confirmation.endTime}
          </p>
          <a
            href={confirmation.meetLink}
            target="_blank"
            rel="noreferrer"
          >
            Join Google Meet
          </a>
        </div>
      )}
    </div>
  );
}
