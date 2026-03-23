import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Policies() {

  // temporary demo data (later from backend)
  const [policies] = useState([
    {
      id: 1,
      name: "Health Secure Plus",
      type: "Health Insurance",
      coverage: "₹10,00,000",
      premium: "₹9,500/year",
      status: "Active",
      aiRecommended: true
    },
    {
      id: 2,
      name: "Vehicle Protect",
      type: "Motor Insurance",
      coverage: "₹5,00,000",
      premium: "₹6,200/year",
      status: "Renew Soon"
    },
    {
      id: 3,
      name: "Life Shield",
      type: "Life Insurance",
      coverage: "₹20,00,000",
      premium: "₹12,000/year",
      status: "Active"
    }
  ]);
  const navigate = useNavigate();
  return (
    <div className="main-content">

      {/* HEADER */}
      <div className="dashboard-hero mb-4">
        <h2 className="fw-bold"> My Insurance Policies</h2>
        <p className="mb-0">
          Manage your coverage and view AI-recommended plans.
        </p>
      </div>

      {/* AI RECOMMENDATION */}
      <div className="app-card mb-4">
        <h5 className="fw-bold"> AI Recommendation</h5>
        <p className="mb-0">
          Based on your profile, increasing health coverage is advised.
          Suggested upgrade: <strong>Health Secure Plus</strong>.
        </p>
      </div>

      {/* POLICY GRID */}
        <div className="policy-grid">

        {policies.map(policy => (

            <div key={policy.id} className="policy-card">

            {policy.aiRecommended && (
                <span className="ai-badge"> AI Recommended</span>
            )}

            <h5 className="fw-bold">{policy.name}</h5>

            <p className="text-muted mb-2">{policy.type}</p>

            <div className="policy-info">
                <p><strong>Coverage:</strong> {policy.coverage}</p>
                <p><strong>Premium:</strong> {policy.premium}</p>
            </div>

            <span className={
                policy.status === "Active"
                ? "badge bg-success"
                : "badge bg-warning"
            }>
                {policy.status}
            </span>

            <button
              className="btn btn-primary ms-4"
              onClick={() => navigate(`/policy/${policy.id}`)}
            >
              View Details
            </button>

            </div>

        ))}

        </div>

      {/* COVERAGE SUMMARY */}
      <div className="app-card mt-4">
        <h5 className="fw-bold"> Coverage Summary</h5>

        <p className="mb-1">
          Total Coverage Value:
          <strong className="ms-2 text-success">
            ₹35,00,000
          </strong>
        </p>

        <small className="text-muted">
          AI suggests increasing health insurance coverage
          for better protection.
        </small>
      </div>

    </div>
  );
}

export default Policies;