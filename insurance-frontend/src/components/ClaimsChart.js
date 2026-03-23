import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { useEffect, useState } from "react";

function ClaimsChart({ chartRef }) {

  const [data, setData] = useState([]);

  useEffect(() => {

    // ✅ STATIC DATA (for now)
    setData([
      { name: "Approved", value: 1 },
      { name: "Pending", value: 1 },
      { name: "Rejected", value: 0 }
    ]);

  }, []);

  const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

  return (
    <div className="app-card">

      <h5 className="fw-bold mb-3">
        Claims Status
      </h5>

      <div ref={chartRef}>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={data} dataKey="value" outerRadius={80}>
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default ClaimsChart;