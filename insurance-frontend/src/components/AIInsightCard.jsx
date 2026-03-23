import { useState } from "react";

function AIInsightCard({
  title,
  insights = [],
  riskLevel = "medium",
  actionText,
  onAction
}) {

  const [expanded] = useState(false);

  /* ===== Risk Color ===== */
  const riskColor = {
    low: "#22c55e",
    medium: "#f59e0b",
    high: "#ef4444"
  };

  return (
    <div className="ai-card">

      {/* HEADER */}
      <div className="ai-card-header">
        <div>
          <h5 className="ai-title"> {title}</h5>
          <span
            className="ai-risk"
            style={{ background: riskColor[riskLevel] }}
          >
            {riskLevel.toUpperCase()} RISK
          </span>
        </div>


      </div>

      {/* INSIGHTS */}
      <ul className={`ai-list ${expanded ? "open" : ""}`}>
        {insights.map((item, index) => (
          <li key={index}>⚡ {item}</li>
        ))}
      </ul>

      {/* ACTION */}
      {actionText && (
        <button
          className="btn btn-primary mt-3"
          onClick={onAction}
        >
          {actionText}
        </button>
      )}

    </div>
  );
}

export default AIInsightCard;