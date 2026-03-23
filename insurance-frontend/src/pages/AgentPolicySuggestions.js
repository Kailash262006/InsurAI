import { useState } from "react";

function AgentPolicySuggestions() {

  const [policies] = useState([
    {
      id: 1,
      name: "Health Secure Plus",
      coverage: "₹15,00,000",
      premium: "₹12,500/year",
      reason: "Recommended for families and higher medical coverage"
    },
    {
      id: 2,
      name: "Premium Life Shield",
      coverage: "₹25,00,000",
      premium: "₹18,000/year",
      reason: "Best suited for high income customers"
    },
    {
      id: 3,
      name: "Family Health Shield",
      coverage: "₹12,00,000",
      premium: "₹11,000/year",
      reason: "AI suggests this for families with dependents"
    }
  ]);

  return (
    <div className="main-content">

      <div className="dashboard-hero mb-4">
        <h2 className="fw-bold"> AI Policy Suggestions</h2>
        <p>AI recommended insurance plans for customers</p>
      </div>

      <div className="row g-4">

        {policies.map(policy => (

          <div key={policy.id} className="col-md-4">

            <div className="policy-card">

              <span className="ai-badge">
                 AI Recommended
              </span>

              <h5 className="fw-bold">
                {policy.name}
              </h5>

              <p className="text-muted mb-2">
                Suggested Insurance Plan
              </p>

              <div className="policy-info">
                <p><strong>Coverage:</strong> {policy.coverage}</p>
                <p><strong>Premium:</strong> {policy.premium}</p>
              </div>

              <p className="mt-2 text-muted">
                {policy.reason}
              </p>

              <button className="btn btn-primary w-100 mt-3">
                Recommend to Customer
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AgentPolicySuggestions;