import { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Claims() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [claimForm, setClaimForm] = useState({
    policy: "",
    amount: "",
    reason: ""
  });

  const [claims, setClaims] = useState([]);

  const [claimAmount, setClaimAmount] = useState("");
  const [policyAge, setPolicyAge] = useState("");
  const [previousClaims, setPreviousClaims] = useState("");

  const [fraudResult, setFraudResult] = useState(null);
  const [decisionResult, setDecisionResult] = useState(null);

  /* ================= LOAD USER CLAIMS ================= */

  const loadClaims = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/claims/user/${user.id}`
      );
      setClaims(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadClaims();
  }, []);

  /* ================= SUBMIT CLAIM ================= */

  const submitClaim = async () => {

    if (!claimForm.policy || !claimForm.amount) {
      alert("Fill all details");
      return;
    }

    try {

      await axios.post(
        "http://localhost:8080/api/claims",
        {
          policy: claimForm.policy,
          amount: Number(claimForm.amount),
          reason: claimForm.reason,
          userId: user.id
        }
      );

      alert("Claim submitted successfully ✅");

      setClaimForm({
        policy: "",
        amount: "",
        reason: ""
      });

      loadClaims();

    } catch (err) {
      console.log(err);
      alert("Error submitting claim");
    }
  };

  /* ================= AI FRAUD CHECK ================= */

  const checkFraud = async () => {
    try {

      const res = await axios.post(
        "http://localhost:8080/api/ai/fraud-check",
        {
          claimAmount: Number(claimAmount),
          policyAgeMonths: Number(policyAge),
          previousClaims: Number(previousClaims)
        }
      );

      setFraudResult(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  /* ================= AI CLAIM DECISION ================= */

  const predictDecision = async () => {
    try {

      const res = await axios.post(
        "http://localhost:8080/api/ai/claim-decision",
        {
          claimAmount: Number(claimAmount),
          policyAgeMonths: Number(policyAge),
          previousClaims: Number(previousClaims)
        }
      );

      setDecisionResult(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  /* ================= 🔥 NEW: RISK BAR ================= */

  const getRiskBar = (score) => {
    const totalBars = 10;
    const filledBars = Math.round(score / 10);

    let bar = "";

    for (let i = 0; i < totalBars; i++) {
      bar += i < filledBars ? "█" : "░";
    }

    return bar;
  };

  const getRiskColor = (score) => {
    if (score >= 70) return "text-danger";
    if (score >= 40) return "text-warning";
    return "text-success";
  };

  return (
    <div className="main-content">

      {/* HEADER */}
      <div className="dashboard-hero mb-4">
        <h2 className="fw-bold">Insurance Claims</h2>
        <p className="mb-0">
          Submit and track your insurance claims easily.
        </p>
      </div>

      <div className="row g-4">

        {/* CLAIM FORM */}
        <div className="col-md-5">
          <div className="app-card">

            <h5 className="fw-bold mb-3">Submit New Claim</h5>

            <label>Policy</label>
            <select
              className="form-control mb-3"
              value={claimForm.policy}
              onChange={e =>
                setClaimForm({ ...claimForm, policy: e.target.value })
              }
            >
              <option value="">Select Policy</option>
              <option>Health Secure Plus</option>
              <option>Vehicle Protect</option>
              <option>Life Shield</option>
            </select>

            <label>Claim Amount (₹)</label>
            <input
              type="number"
              className="form-control mb-3"
              value={claimForm.amount}
              onChange={e =>
                setClaimForm({ ...claimForm, amount: e.target.value })
              }
            />

            <label>Reason</label>
            <textarea
              className="form-control mb-4"
              rows="3"
              value={claimForm.reason}
              onChange={e =>
                setClaimForm({ ...claimForm, reason: e.target.value })
              }
            />

            <button
              className="btn btn-primary w-100"
              onClick={submitClaim}
            >
              Submit Claim
            </button>

          </div>
        </div>

        {/* CLAIM HISTORY */}
        <div className="col-md-7">
          <div className="app-card">

            <h5 className="fw-bold mb-3">Claim History</h5>

            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Policy</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Payout</th>
                </tr>
              </thead>

              <tbody>
                {claims.map(claim => (
                  <tr key={claim.id}>
                    <td>{claim.id}</td>
                    <td>{claim.policy}</td>
                    <td>₹{claim.amount}</td>

                    <td>
                      <span className={
                        claim.status === "Approved"
                          ? "badge bg-success"
                          : claim.status === "Rejected"
                          ? "badge bg-danger"
                          : "badge bg-warning text-dark"
                      }>
                        {claim.status}
                      </span>
                    </td>

                    <td>
                      {claim.status === "Approved"
                        ? `₹${claim.amount}`
                        : "-"}
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        </div>

      </div>

      {/* AI FRAUD DETECTION */}
      <div className="app-card mt-4">

        <h5 className="fw-bold mb-3">AI Fraud Detection</h5>

        <div className="row g-3">

          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              placeholder="Claim Amount"
              onChange={(e) => setClaimAmount(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              placeholder="Policy Age"
              onChange={(e) => setPolicyAge(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              placeholder="Previous Claims"
              onChange={(e) => setPreviousClaims(e.target.value)}
            />
          </div>

        </div>

        <div className="d-flex gap-3 mt-4">

          <button
            className="btn btn-primary"
            onClick={checkFraud}
          >
            Detect Fraud
          </button>

          <button
            className="btn btn-success"
            onClick={predictDecision}
          >
            AI Claim Decision
          </button>

        </div>

      </div>

      {/* 🔥 FRAUD RESULT WITH BAR */}
      {fraudResult && (

        <div className="app-card mt-4">

          <h5 className="fw-bold mb-3">AI Fraud Analysis</h5>

          <div style={{ width: 120, height: 120 }}>
            <CircularProgressbar
              value={fraudResult.riskScore}
              text={`${fraudResult.riskScore}`}
            />
          </div>

          <div className="mt-3">

            <p className={`fw-bold ${getRiskColor(fraudResult.riskScore)}`}>
              {getRiskBar(fraudResult.riskScore)} {fraudResult.riskScore}% Risk
            </p>

            <p>
              <strong>{fraudResult.riskLevel}</strong> - {fraudResult.message}
            </p>

          </div>

        </div>

      )}

      {/* AI DECISION RESULT */}
      {decisionResult && (

        <div className="app-card mt-4">

          <h5 className="fw-bold">AI Claim Decision</h5>

          <h3 className={
            decisionResult.decision === "APPROVED"
              ? "text-success"
              : "text-danger"
          }>
            {decisionResult.decision}
          </h3>

          <p>Confidence: {decisionResult.confidence}%</p>
          <p>{decisionResult.reason}</p>

        </div>

      )}

    </div>
  );
}

export default Claims;