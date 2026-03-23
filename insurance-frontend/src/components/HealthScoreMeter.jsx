import { useEffect, useState } from "react";

function HealthScoreMeter({ score = 70 }) {

  const [progress, setProgress] = useState(0);

  /* ===== Animate Score ===== */
  useEffect(() => {
    let start = 0;

    const interval = setInterval(() => {
      start += 1;
      setProgress(start);

      if (start >= score) clearInterval(interval);
    }, 15);

    return () => clearInterval(interval);
  }, [score]);

  /* ===== Circle math ===== */
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset =
    circumference - (progress / 100) * circumference;

  /* ===== Color based on risk ===== */
  const getColor = () => {
    if (score >= 75) return "#22c55e"; // green
    if (score >= 50) return "#f59e0b"; // orange
    return "#ef4444"; // red
  };

  return (
    <div className="health-meter">

      <svg width="180" height="180">

        {/* Background */}
        <circle
          cx="90"
          cy="90"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="12"
          fill="none"
        />

        {/* Progress */}
        <circle
          cx="90"
          cy="90"
          r={radius}
          stroke={getColor()}
          strokeWidth="12"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 90 90)"
          style={{ transition: "stroke-dashoffset 0.4s" }}
        />
      </svg>

      <div className="health-score-text">
        <h2>{progress}</h2>
        <span>/ 100</span>
        <p>Insurance Health</p>
      </div>

    </div>
  );
}

export default HealthScoreMeter;