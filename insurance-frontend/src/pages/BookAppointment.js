import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function BookAppointment() {

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [agents, setAgents] = useState([]);
  const [agentId, setAgentId] = useState("");
  const [date, setDate] = useState("");

  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");

  const [loadingSlots, setLoadingSlots] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);

  const fetchingRef = useRef(false);

  /* ================= LOAD AGENTS ================= */
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/auth/agents")
      .then(res => setAgents(res.data))
      .catch(console.log);
  }, []);

  /* ================= PAST SLOT CHECK ================= */
  const isPastSlot = useCallback((slot) => {

    if (!date) return false;

    const today = new Date().toISOString().split("T")[0];

    const start = slot.split(" - ")[0];
    const [h, m] = start.split(":");

    const slotTime = new Date();
    slotTime.setHours(h, m, 0, 0);

    const now = new Date();

    // past time
    if (date === today && slotTime < now) return true;

    // 15-minute protection
    const buffer = new Date(now.getTime() + 15 * 60000);

    if (date === today && slotTime < buffer) return true;

    return false;

  }, [date]);

  /* ================= LOAD SLOTS ================= */
  const loadSlots = useCallback(async (agent, selectedDate) => {

    if (!agent || !selectedDate || fetchingRef.current) return;

    fetchingRef.current = true;
    setLoadingSlots(true);

    try {

      const res = await axios.get(
        `http://localhost:8080/api/appointments/slots/${agent}/${selectedDate}`
      );

      const newSlots = res.data;

      setSlots(newSlots);

      const firstAvailable = newSlots.find(slot => !isPastSlot(slot));

      const previousSelected = selectedSlot;

      if (!selectedSlot || !newSlots.includes(selectedSlot)) {

        setSelectedSlot(firstAvailable || "");

        if (previousSelected && firstAvailable) {
          toast.info("Recommended slot updated due to new booking");
        }
      }

    } catch (err) {
      console.log(err);
    } finally {
      setLoadingSlots(false);
      fetchingRef.current = false;
    }

  }, [selectedSlot, isPastSlot]);

  /* ================= AUTO REFRESH ================= */
  useEffect(() => {

    if (!agentId || !date) return;

    const interval = setInterval(() => {
      loadSlots(agentId, date);
    }, 15000);

    return () => clearInterval(interval);

  }, [agentId, date, loadSlots]);

  /* ================= BOOK ================= */
  const bookAppointment = async () => {

    if (!agentId || !date || !selectedSlot || bookingLoading) {
      toast.warning("Please complete booking details");
      return;
    }

    const [startTime, endTime] = selectedSlot.split(" - ");

    setBookingLoading(true);

    try {

      await axios.post(
        "http://localhost:8080/api/appointments/book",
        {
          userId: user.id,
          agentId: Number(agentId),
          date,
          startTime,
          endTime
        }
      );

      toast.success(" Appointment booked successfully!");

      setShowConfirm(false);

      loadSlots(agentId, date);

    } catch (error) {

      toast.error(error.response?.data || "Booking failed");

    } finally {

      setBookingLoading(false);

    }
  };

  /* ================= UI ================= */
  return (

      <div className="main-content">

        {!user?.id ? (
          <h4>Please login again.</h4>
        ) : (
          <div className="app-card">

            <h3>Schedule a Meeting</h3>

            {/* AGENT */}
            <label>Choose Agent</label>
            <select
              className="form-control mb-3"
              onChange={(e) => {
                const id = e.target.value;
                setAgentId(id);
                setSlots([]);
                loadSlots(id, date);
              }}
            >
              <option value="">Select Agent</option>

              {agents.map(a => (
                <option key={a.id} value={a.id}>
                   {a.name}
                </option>
              ))}

            </select>

            {/* DATE */}
            <label>Select Date</label>

            <input
              type="date"
              className="form-control mb-4"
              onChange={(e) => {
                const d = e.target.value;
                setDate(d);
                setSlots([]);
                loadSlots(agentId, d);
              }}
            />

            {/* SLOTS */}
            <h5>Available Time Slots</h5>

            {loadingSlots && (

              <div className="slots-grid">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="skeleton-slot"></div>
                ))}
              </div>

            )}

            {!loadingSlots && slots.length === 0 && (

              <div className="empty-slot">
                Select agent & date to see available slots
              </div>

            )}

            <div className="slots-grid">

              {slots.map((slot, index) => (

                <div
                  key={index}
                  className={
                    "slot-card " +
                    (isPastSlot(slot) ? "disabled " : "") +
                    (selectedSlot === slot ? "selected recommended " : "")
                  }
                  onClick={() => {

                    if (isPastSlot(slot)) return;

                    setSelectedSlot(slot);
                    setShowConfirm(true);

                  }}
                >
                   {slot}
                </div>

              ))}

            </div>

          </div>

      )}

      {/* CONFIRM MODAL */}

      {showConfirm && (

        <div className="confirm-overlay">

          <div className="confirm-modal">

            <h4>Confirm Appointment</h4>

            <strong>{selectedSlot}</strong>

            <div className="d-flex gap-3 mt-3">

              <button
                className="btn btn-secondary w-50"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>

              <button
                className="btn btn-primary w-50"
                onClick={bookAppointment}
                disabled={bookingLoading}
              >
                {bookingLoading ? "Booking..." : "Confirm "}
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );
}

export default BookAppointment;