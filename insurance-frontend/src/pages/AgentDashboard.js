import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AgentAnalyticsChart from "../components/AgentAnalyticsChart";

function AgentDashboard() {

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);

  /* ===== LOAD APPOINTMENTS ===== */

  const loadAppointments = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/appointments/agent/${user.id}`
      );
      setAppointments(res.data);
    } catch (err) {
      console.log(err);
    }
  }, [user.id]);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  /* ===== KPI COUNTS ===== */

  const total = appointments.length;

  const booked =
    appointments.filter(a => a.status === "BOOKED").length;

  const completed =
    appointments.filter(a => a.status === "COMPLETED").length;

   
  /* ===== TODAY'S CONSULTATIONS ===== */

  const today = new Date().toISOString().split("T")[0];

  const todaysAppointments =
    appointments.filter(a => a.appointmentDate === today);

  /* ===== UPCOMING ===== */

  const upcoming =
    appointments
      .filter(a => a.status === "BOOKED")
      .slice(0, 3);

  return (

    <div className="main-content">

      {/* HEADER */}

      <div className="dashboard-hero mb-4">

        <h2 className="fw-bold">
           Agent Performance Overview
        </h2>

        <p>
          Monitor your consultations and manage appointments efficiently.
        </p>

      </div>

      {/* KPI CARDS */}

      <div className="row g-4">

        <div className="col-md-4">
          <div className="app-card">
            <p className="stat-title">Total Appointments</p>
            <h2 className="stat-number">{total}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="app-card">
            <p className="stat-title">Active Bookings</p>
            <h2 className="stat-number text-primary">{booked}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="app-card">
            <p className="stat-title">Completed Consultations</p>
            <h2 className="stat-number text-success">{completed}</h2>
          </div>
        </div>

      </div>
  <div className="row mt-4">

    <div className="col-md-12">
      <AgentAnalyticsChart />
    </div>

  </div> 
      {/* TODAY'S CONSULTATIONS */}

      <div className="app-card mt-4">

        <h5 className="fw-bold">
           Today's Consultations
        </h5>

        {todaysAppointments.length === 0 ? (
          <p className="text-muted">
            No consultations scheduled for today.
          </p>
        ) : (

          todaysAppointments.map(a => (

            <div key={a.id} className="d-flex justify-content-between">

              <span>{a.user?.name}</span>

              <span>
                {a.startTime} - {a.endTime}
              </span>

            </div>

          ))

        )}

      </div>

      {/* UPCOMING MEETINGS */}

      <div className="app-card mt-4">

        <h5 className="fw-bold">
           Upcoming Meetings
        </h5>

        {upcoming.length === 0 ? (
          <p className="text-muted">
            No upcoming appointments.
          </p>
        ) : (

          upcoming.map(a => (

            <div key={a.id} className="d-flex justify-content-between">

              <span>{a.user?.name}</span>

              <span>
                {a.appointmentDate}
              </span>

            </div>

          ))

        )}

      </div>

      {/* QUICK ACTIONS */}

      <div className="app-card mt-4">

        <h5 className="fw-bold">
          ⚡ Quick Actions
        </h5>

        <div className="d-flex gap-3">

          <button
            className="btn btn-primary"
            onClick={() => navigate("/agent")}
          >
            Open Agent Panel
          </button>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/availability")}
          >
            Set Availability
          </button>

        </div>

      </div>

      {/* RECENT CUSTOMER ACTIVITY */}

      <div className="app-card mt-4">

        <h5 className="fw-bold">
           Recent Customer Activity
        </h5>

        {appointments.length === 0 ? (

          <p className="text-muted">
            No recent activity.
          </p>

        ) : (

          appointments.slice(0, 5).map(a => (

            <div
              key={a.id}
              className="d-flex justify-content-between border-bottom py-2"
            >

              <span>
                {a.user?.name}
              </span>

              <span className="text-muted">

                {a.status === "BOOKED" && "Booked Consultation"}
                {a.status === "COMPLETED" && "Completed Consultation"}
                {a.status === "CANCELLED" && "Cancelled Appointment"}

              </span>

            </div>

          ))

        )}

      </div>      

    </div>

  );

}

export default AgentDashboard;