import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

function AgentAnalyticsChart() {

  const data = [
    { day: "Mon", meetings: 2 },
    { day: "Tue", meetings: 3 },
    { day: "Wed", meetings: 1 },
    { day: "Thu", meetings: 4 },
    { day: "Fri", meetings: 2 },
    { day: "Sat", meetings: 3 }
  ];

  return (

    <div className="app-card mt-4">

      <h5 className="fw-bold mb-3">
         Weekly Consultation Trend
      </h5>

      <ResponsiveContainer width="100%" height={250}>

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="meetings"
            stroke="#4f46e5"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );
}

export default AgentAnalyticsChart;