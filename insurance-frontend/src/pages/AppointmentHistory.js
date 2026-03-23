import { useEffect, useState } from "react";
import axios from "axios";

function AppointmentHistory() {

  const user = JSON.parse(localStorage.getItem("user"));
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {

    const loadAppointments = async () => {

      try {

        const res = await axios.get(
          `http://localhost:8080/api/appointments/user/${user.id}`
        );

        const sorted = res.data.sort(
          (a,b) => new Date(b.appointmentDate) - new Date(a.appointmentDate)
        );

        setAppointments(sorted);

      } catch (err) {
        console.log(err);
      }

    };

    loadAppointments();

  }, [user.id]);

  return (

    <div className="main-content">

      <div className="app-card">

        <h2 className="fw-bold mb-4">
          Appointment Timeline
        </h2>

        <div className="timeline">

          {appointments.length === 0 ? (

            <p className="text-center text-muted">
              No activity yet
            </p>

          ) : (

            appointments.map(a => (

              <div key={a.id} className="timeline-item">

                <div className="timeline-dot"></div>

                <div className="timeline-card">

                  <strong>{a.agent?.name || "Agent"}</strong>

                  <div className="timeline-detail">

                    <div>{a.appointmentDate}</div>

                    <div>
                      {a.startTime} — {a.endTime}
                    </div>

                    <span
                      className={
                        a.status === "COMPLETED"
                          ? "status completed"
                          : a.status === "CANCELLED"
                          ? "status cancelled"
                          : "status booked"
                      }
                    >
                      {a.status}
                    </span>

                  </div>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </div>

  );
}

export default AppointmentHistory;