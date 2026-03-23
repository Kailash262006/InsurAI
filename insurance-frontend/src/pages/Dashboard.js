import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Counter from "../components/Counter";
import { generateAIInsights } from "../services/aiService";
import AIInsightCard from "../components/AIInsightCard";
import RiskScoreMeter from "../components/RiskScoreMeter";
import InsuranceAnalytics from "../components/InsuranceAnalytics";
import AppointmentChart from "../components/AppointmentChart";
import { calculateRiskScore } from "../services/riskScoreService";
import { getPolicyRecommendation } from "../services/policyRecommendationService";
import { downloadInsuranceReport } from "../services/pdfService";
import PolicyChart from "../components/PolicyChart";
import ClaimsChart from "../components/ClaimsChart";

function Dashboard() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [, setAiInsights] = useState([]);
  const fetchedRef = useRef(false);
  const chartRef = useRef();
  const appointmentRef = useRef();
  const policyRef = useRef();
  const claimsRef = useRef();

  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    upcoming: 0
  });

  // ✅ NEW STATES
  const [riskScore, setRiskScore] = useState(0);
  const [recommendation, setRecommendation] = useState(null);

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  /* ===== LOAD DASHBOARD DATA ===== */
  useEffect(() => {

    if (!user?.id || fetchedRef.current) return;

    fetchedRef.current = true;

    axios
      .get(`http://localhost:8080/api/appointments/stats/${user.id}`)
      .then(res => {

        setStats(res.data);

        // ✅ STEP 1: Calculate Risk Score
        const calculatedScore = calculateRiskScore({
          totalPolicies: res.data.total,
          claims: res.data.completed,
          coverage: 2500000,
          upcomingConsultation: res.data.upcoming > 0
        });

        setRiskScore(calculatedScore);

        // ✅ STEP 2: Generate AI Recommendation
        const rec = getPolicyRecommendation({
          totalPolicies: res.data.total,
          coverage: 2500000,
          claims: res.data.completed,
          riskScore: calculatedScore
        });

        setRecommendation(rec);

        // ✅ STEP 3: Generate Insights
        const insights = generateAIInsights({
          riskScore: calculatedScore,
          policies: res.data.total,
          claims: res.data.completed,
          hasUpcomingConsultation: res.data.upcoming > 0
        });

        setAiInsights(insights);

      })
      .catch(err => console.log(err));

  }, [user?.id]);

  return (

    <div className="page-content page-enter">

      {/* ================= HERO ================= */}

      <div className="dashboard-hero mb-4">

        <h2 className="fw-bold">
          {getGreeting()}, {user?.name}
        </h2>

        <p className="mb-1">
          Your Insurance Health Score:
          <strong className="ms-2 text-warning">
            {riskScore} / 100
          </strong>
        </p>

        <small>
          AI detected a potential coverage gap in Health Insurance.
        </small>

      </div>

      {/* ================= STATS ================= */}

      <div className="dashboard-grid">

        <div className="app-card">
          <p className="stat-title">Active Policies</p>

          <h2 className="stat-number">
            <Counter value={stats.total} />
          </h2>

          <span className="stat-sub">
            Policies under management
          </span>
        </div>

        <div className="app-card">
          <p className="stat-title">Total Coverage</p>

          <h2 className="stat-number text-success">
            ₹25,00,000
          </h2>

          <span className="stat-sub">
            AI estimated coverage value
          </span>
        </div>

        <div className="app-card">
          <p className="stat-title">Claims</p>

          <h2 className="stat-number text-primary">
            <Counter value={stats.completed} />
          </h2>

          <span className="stat-sub">
            Processed claims
          </span>
        </div>

        <div className="app-card">

          <p className="stat-title">
            AI Health Score
          </p>

          <RiskScoreMeter score={riskScore} />

          <span className="stat-sub">
            AI calculated risk level
          </span>

        </div>

      </div>

      {/* ================= AI NOTIFICATION ================= */}

      <div className="app-card mt-4">

        <h5 className="fw-bold mb-3">
          AI Smart Notification
        </h5>

        {stats.upcoming > 0 ? (

          <p className="text-primary">
            You have an upcoming consultation scheduled.
            Prepare your insurance questions in advance.
          </p>

        ) : (

          <p className="text-warning">
            No consultation booked. AI suggests discussing
            policy coverage with an advisor.
          </p>

        )}

        <p className="text-success mb-0">
          Tip: Increasing health coverage can reduce
          your long-term financial risk.
        </p>

      </div>

      <button
        className="btn btn-primary mt-3"
        style={{
          background: "linear-gradient(135deg,#16a34a,#22c55e)",
          border: "none"
        }}
        onClick={() =>
          downloadInsuranceReport(
            {
              name: user?.name,
              riskScore,
              policies: stats.total,
              claims: stats.completed,
              policy: recommendation?.policy,
              reason: recommendation?.reason,
              confidence: recommendation?.confidence
            },
            {
              appointmentRef,
              policyRef,
              claimsRef
            }
          )
        }
      >
        📄 Download Smart Report
      </button>
      
      {/* ================= CHARTS ================= */}

      <div className="row mt-4 g-4">

        <div className="col-md-12">
          <AppointmentChart chartRef={appointmentRef} />
        </div>

        <div className="col-md-6">
          <PolicyChart chartRef={policyRef} />
        </div>

        <div className="col-md-6">
          <ClaimsChart chartRef={claimsRef} />
        </div>

      </div>

      {/* ================= AI + CONSULTATION ================= */}

      <div className="row mt-4 g-4">

        {/* AI INSIGHTS */}
        <div className="col-md-7">
          <div className="app-card">
            <AIInsightCard
              title="InsurAI Smart Analysis"
              riskLevel="medium"
              insights={
                recommendation
                  ? [
                      recommendation.reason,
                      `Recommended Policy: ${recommendation.policy}`,
                      `AI Confidence: ${recommendation.confidence}%`
                    ]
                  : []
              }
              actionText="View Recommended Policies"
              onAction={() => navigate("/policies")}
            />
          </div>
        </div>

        {/* CONSULTATION */}
        <div className="col-md-5">

          <div className="app-card">

            <h5 className="fw-bold mb-3">
              Advisor Consultation
            </h5>

            {stats.upcoming > 0 ? (
              <>
                <p><strong>Status:</strong> Scheduled</p>
                <p><strong>Advisor:</strong> Insurance Expert</p>
                <p className="text-success">
                  Be prepared for your session
                </p>
              </>
            ) : (
              <>
                <p>No consultations scheduled.</p>

                <button
                  className="btn btn-primary mt-2"
                  onClick={() => navigate("/book")}
                >
                  Book Consultation
                </button>
              </>
            )}

          </div>

        </div>

      </div>

      {/* ================= POLICY TABLE ================= */}

      <div className="app-card mt-4">

        <h5 className="fw-bold mb-3">
          Policy Overview
        </h5>

        <table className="table">

          <thead>
            <tr>
              <th>Policy</th>
              <th>Type</th>
              <th>Coverage</th>
              <th>Premium</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>Health Secure</td>
              <td>Health</td>
              <td>₹10,00,000</td>
              <td>₹9,500/year</td>
              <td>
                <span className="badge bg-success">
                  Active
                </span>
              </td>
            </tr>

            <tr>
              <td>Vehicle Protect</td>
              <td>Motor</td>
              <td>₹5,00,000</td>
              <td>₹6,200/year</td>
              <td>
                <span className="badge bg-warning">
                  Renew Soon
                </span>
              </td>
            </tr>

          </tbody>

        </table>

      </div>

      <InsuranceAnalytics />

    </div>
  );
}

export default Dashboard;