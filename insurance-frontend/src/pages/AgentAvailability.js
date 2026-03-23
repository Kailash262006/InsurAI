import { useState } from "react";
import axios from "axios";

function AgentAvailability() {

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [msg, setMsg] = useState("");

  const saveAvailability = async () => {

    if (!user?.id) {
      alert("Session expired. Please login again.");
      return;
    }

    if (!date || !startTime || !endTime) {
      alert("Fill all fields");
      return;
    }

    /* ✅ Prevent invalid time range */
    if (startTime >= endTime) {
      alert("End time must be after start time");
      return;
    }

    /* ✅ Prevent past date */
    const today = new Date().toISOString().split("T")[0];
    if (date < today) {
      alert("Cannot set availability for past dates");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/api/availability/add",
        {
          agentId: user.id,
          date,
          startTime,
          endTime
        }
      );

      setMsg(res.data);

      // reset fields after success
      setStartTime("");
      setEndTime("");

    } catch (err) {
      console.log(err);
      alert("Failed to save");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">

      <div className="app-card p-4" style={{ width: "500px" }}>

        <h3 className="text-center mb-4">
           Set Availability
        </h3>

        {msg && (
          <div className="alert alert-success">
            ✅ {msg}
          </div>
        )}

        <label>Date</label>
        <input
          type="date"
          className="form-control mb-3"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label>Start Time</label>
        <input
          type="time"
          className="form-control mb-3"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />

        <label>End Time</label>
        <input
          type="time"
          className="form-control mb-4"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />

        <button
          className="btn btn-primary w-100"
          onClick={saveAvailability}
        >
          Save Availability 
        </button>

      </div>
    </div>
  );
}

export default AgentAvailability;