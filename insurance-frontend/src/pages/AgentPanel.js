import { useEffect, useState, useCallback } from "react";
import axios from "axios";

function AgentPanel() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [appointments, setAppointments] = useState([]);
  const [claims, setClaims] = useState([]);
  const [aiDecisions, setAiDecisions] = useState({});

  /* ================= LOAD APPOINTMENTS ================= */

  const loadAppointments = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/appointments/agent/${user.id}`
      );
      setAppointments(res.data);
    } catch (err) {
      console.log(err);
    }
  }, [user.id]);

  /* ================= LOAD CLAIMS ================= */

  const loadClaims = useCallback(async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/claims"
      );
      setClaims(res.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    loadAppointments();
    loadClaims();
  }, [loadAppointments, loadClaims]);

  /* ================= REAL PREVIOUS CLAIM COUNT ================= */

  const getPreviousClaimsCount = (userId, currentClaimId) => {
    return claims.filter(
      c => c.user?.id === userId && c.id !== currentClaimId
    ).length;
  };

  /* ================= POLICY AGE (TEMP REALISTIC) ================= */

  const getPolicyAge = () => {
    return Math.floor(Math.random() * 24) + 1; // 1–24 months
  };

  /* ================= AI DECISION ================= */

  const getAIDecision = async (claim) => {

    try {

      const previousClaims = getPreviousClaimsCount(
        claim.user?.id,
        claim.id
      );

      const policyAgeMonths = getPolicyAge();

      const res = await axios.post(
        "http://localhost:8080/api/ai/claim-decision",
        {
          claimAmount: Number(claim.amount),
          policyAgeMonths,
          previousClaims
        }
      );

      setAiDecisions(prev => ({
        ...prev,
        [claim.id]: res.data
      }));

    } catch (err) {
      console.log(err);
    }
  };

  /* ================= AUTO AI LOAD ================= */

  useEffect(() => {

    claims.forEach(c => {
      if (!aiDecisions[c.id]) {
        getAIDecision(c);
      }
    });

  }, [claims]);

  /* ================= APPOINTMENT ACTIONS ================= */

  const completeAppointment = async (id) => {
    await axios.put(
      `http://localhost:8080/api/appointments/complete/${id}`
    );
    loadAppointments();
  };

  const cancelAppointment = async (id) => {
    await axios.put(
      `http://localhost:8080/api/appointments/cancel/${id}`
    );
    loadAppointments();
  };

  /* ================= CLAIM ACTIONS ================= */

  const approveClaim = async (id) => {
    try {
      await axios.put(
        `http://localhost:8080/api/claims/approve/${id}`
      );
      loadClaims();
    } catch (err) {
      console.log(err);
    }
  };

  const rejectClaim = async (id) => {
    try {
      await axios.put(
        `http://localhost:8080/api/claims/reject/${id}`
      );
      loadClaims();
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= STATUS STYLES ================= */

  const statusClass = (status) => {
    if (status === "BOOKED") return "badge bg-primary";
    if (status === "COMPLETED") return "badge bg-success";
    if (status === "CANCELLED") return "badge bg-danger";
    return "badge bg-secondary";
  };

  const claimStatusClass = (status) => {
    if (status === "Approved") return "badge bg-success";
    if (status === "Rejected") return "badge bg-danger";
    return "badge bg-warning text-dark";
  };

  return (
    <div className="main-content">

      <h2 className="fw-bold mb-4">
        Agent Control Panel
      </h2>

      {/* ================= APPOINTMENTS ================= */}
      <div className="app-card mb-4">

        <h5 className="fw-bold mb-3">Appointments</h5>

        {appointments.length === 0 ? (
          <p className="text-muted text-center">
            No appointments assigned
          </p>
        ) : (

          <table className="table align-middle">

            <thead>
              <tr>
                <th>Customer</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>

            <tbody>

              {appointments.map(a => (

                <tr key={a.id}>

                  <td>{a.user?.name}</td>
                  <td>{a.appointmentDate}</td>
                  <td>{a.startTime} — {a.endTime}</td>

                  <td>
                    <span className={statusClass(a.status)}>
                      {a.status}
                    </span>
                  </td>

                  <td className="text-end">

                    {a.status === "BOOKED" && (
                      <>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => completeAppointment(a.id)}
                        >
                          ✓ Complete
                        </button>

                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => cancelAppointment(a.id)}
                        >
                          Cancel
                        </button>
                      </>
                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

      {/* ================= CLAIM MANAGEMENT ================= */}
      <div className="app-card">

        <h5 className="fw-bold mb-3">
          Claims Management
        </h5>

        {claims.length === 0 ? (
          <p className="text-muted text-center">
            No claims available
          </p>
        ) : (

          <table className="table align-middle">

            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Policy</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Payout</th>
                <th>AI Suggestion</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>

            <tbody>

              {claims.map(c => (

                <tr key={c.id}>

                  <td>{c.id}</td>
                  <td>{c.user?.name || "User"}</td>
                  <td>{c.policy}</td>
                  <td>₹{c.amount}</td>

                  <td>
                    <span className={claimStatusClass(c.status)}>
                      {c.status}
                    </span>
                  </td>

                  <td>
                    {c.status === "Approved" ? `₹${c.amount}` : "-"}
                  </td>

                  {/* ================= AI ================= */}
                  <td>

                    {aiDecisions[c.id] ? (

                      <div>

                        <span className={
                          aiDecisions[c.id].decision === "APPROVED"
                            ? "badge bg-success"
                            : "badge bg-danger"
                        }>
                          {aiDecisions[c.id].decision}
                        </span>

                        <div style={{ fontSize: "12px" }}>
                          {aiDecisions[c.id].confidence}%
                        </div>

                      </div>

                    ) : (
                      <span className="text-muted">
                        Analyzing...
                      </span>
                    )}

                  </td>

                  {/* ================= ACTIONS ================= */}
                  <td className="text-end">

                    {c.status === "Pending" && (
                      <>
                        <button
                          className={
                            aiDecisions[c.id]?.decision === "APPROVED"
                              ? "btn btn-success btn-sm me-2"
                              : "btn btn-outline-success btn-sm me-2"
                          }
                          onClick={() => approveClaim(c.id)}
                        >
                          Approve
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => rejectClaim(c.id)}
                        >
                          Reject
                        </button>
                      </>
                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
}

export default AgentPanel;