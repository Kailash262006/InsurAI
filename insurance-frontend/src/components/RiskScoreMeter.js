function RiskScoreMeter({ score }) {

  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  const progress = circumference - (score / 100) * circumference;

  return (
    <div style={{ textAlign: "center" }}>

      <svg width="180" height="180">

        {/* Background Circle */}
        <circle
          cx="90"
          cy="90"
          r={radius}
          stroke="#eee"
          strokeWidth="15"
          fill="none"
        />

        {/* Progress Circle */}
        <circle
          cx="90"
          cy="90"
          r={radius}
          stroke="#ff9800"
          strokeWidth="15"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          strokeLinecap="round"
          transform="rotate(-90 90 90)"
        />

        {/* Score Text */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="28"
          fontWeight="bold"
        >
          {score}
        </text>

      </svg>

      <p>Insurance Health</p>

    </div>
  );
}

export default RiskScoreMeter;