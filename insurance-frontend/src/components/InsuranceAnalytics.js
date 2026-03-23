import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";

function InsuranceAnalytics() {

  const data = [
    { name: "Health Insurance", value: 45 },
    { name: "Motor Insurance", value: 25 },
    { name: "Life Insurance", value: 30 }
  ];

  const COLORS = ["#4CAF50", "#2196F3", "#FF9800"];

  return (
    <div className="app-card mt-4">

      <h5 className="fw-bold mb-3">
         Insurance Portfolio Distribution
      </h5>

      <PieChart width={400} height={300}>

        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          dataKey="value"
          label
        >

          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}

        </Pie>

        <Tooltip />
        <Legend />

      </PieChart>

    </div>
  );
}

export default InsuranceAnalytics;