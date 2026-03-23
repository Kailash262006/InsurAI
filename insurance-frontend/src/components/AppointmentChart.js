import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";

function AppointmentChart({ chartRef }) {

  const user = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState([]);

  useEffect(() => {

    const loadAppointments = async () => {

      try {

        const res = await axios.get(
          `http://localhost:8080/api/appointments/user/${user.id}`
        );

        const appointments = res.data;

        // ✅ Group by month
        const monthMap = {};

        appointments.forEach(a => {

          const date = new Date(a.appointmentDate);
          const month = date.toLocaleString("default", { month: "short" });

          monthMap[month] = (monthMap[month] || 0) + 1;

        });

        const formatted = Object.keys(monthMap).map(month => ({
          month,
          appointments: monthMap[month]
        }));

        setData(formatted);

      } catch (err) {
        console.log(err);
      }

    };

    loadAppointments();

  }, [user.id]);

  return (

    <div className="app-card">

      <h5 className="fw-bold mb-3">
        Consultation Analytics
      </h5>

      <div ref={chartRef}>

        <ResponsiveContainer width="100%" height={250}>

          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="appointments"
              stroke="#4f46e5"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default AppointmentChart;