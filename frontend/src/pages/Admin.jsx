import { useEffect, useState } from "react";
import { apiRequest } from "../api/api";

export default function Admin({ email }) {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [capacity, setCapacity] = useState(1);
  const [message, setMessage] = useState("");
  const [slots, setSlots] = useState([]);

  const fetchSlots = async () => {
    const res = await apiRequest(
      "/api/admin/slots",
      "GET",
      null,
      email
    );
    setSlots(res || []);
  };

  useEffect(() => {
    fetchSlots();
  }, [email]);

  const createSlot = async () => {
    const res = await apiRequest(
      "/api/admin/slots",
      "POST",
      { date, startTime, endTime, capacity },
      email
    );

    if (res.error) {
      setMessage(res.error);
    } else {
      setMessage(
        `${res.capacity} slot${res.capacity > 1 ? "s" : ""} created successfully between ${res.startTime} and ${res.endTime} on ${res.date}`
      );
      fetchSlots();
    }
  };

  const toggleSlot = async (slotId, isActive) => {
    await apiRequest(
      `/api/admin/slots/${slotId}`,
      "PATCH",
      { isActive: !isActive },
      email
    );
    fetchSlots();
  };

  return (
    <div>
      <h2>Admin Panel</h2>

      <label>
        Select Date:&nbsp;
        <input type="date" onChange={(e) => setDate(e.target.value)} />
      </label>
      <br />

      <label>
        Start Time:&nbsp;
        <input type="time" onChange={(e) => setStartTime(e.target.value)} />
      </label>
      <br />

      <label>
        End Time:&nbsp;
        <input type="time" onChange={(e) => setEndTime(e.target.value)} />
      </label>
      <br />

      <label>
        Capacity:&nbsp;
        <input
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(Number(e.target.value))}
        />
      </label>
      <br />

      <button onClick={createSlot}>Create Slot</button>

      {message && <p style={{ color: "green" }}>{message}</p>}

      <hr />
      <h3>Created Slots</h3>

      {slots.map((slot) => (
        <div key={slot.id} style={{ marginBottom: "10px" }}>
          <strong>{slot.date}</strong>{" "}
          {slot.startTime} - {slot.endTime}
          <br />
          Remaining Capacity: {slot.capacity} <br />
          Status: {slot.isActive ? "Active" : "Inactive"} <br />
          Bookings: {slot.Bookings?.length || 0}
          <br />
          <button onClick={() => toggleSlot(slot.id, slot.isActive === true || slot.isActive === "true")}>
            {slot.isActive === true || slot.isActive === "true" ? "Disable" : "Enable"}
          </button>

        </div>
      ))}
    </div>
  );
}
