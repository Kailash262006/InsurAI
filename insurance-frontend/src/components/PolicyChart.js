import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import { useEffect, useState } from "react";

function PolicyChart({ chartRef }) {

  const [data, setData] = useState([]);

  useEffect(() => {

    // ✅ STATIC DATA (for now)
    setData([
      { type: "Health", count: 2 },
      { type: "Motor", count: 1 },
      { type: "Life", count: 1 }
    ]);

  }, []);

  return (
    <div className="app-card">

      <h5 className="fw-bold mb-3">
        Policy Distribution
      </h5>

      <div ref={chartRef}>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#06b6d4" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default PolicyChart;