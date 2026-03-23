import { useState } from "react";
import axios from "axios";
import AIChatbot from "../components/AIChatbot";
import PolicyComparison from "../components/PolicyComparison";

function AIAdvisor() {

  const [age, setAge] = useState("");
  const [income, setIncome] = useState("");
  const [familyMembers, setFamilyMembers] = useState("");
  const [existingInsurance, setExistingInsurance] = useState(false);
  const [risk, setRisk] = useState(null);
  const [result, setResult] = useState(null);
  const [gapResult, setGapResult] = useState(null);
  const [healthScore, setHealthScore] = useState(null);
  const getRecommendation = async () => {

    if (!age || !income || !familyMembers) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/api/ai/recommend-policy",
        {
          age: Number(age),
          income: Number(income),
          familyMembers: Number(familyMembers),
          existingInsurance
        }
      );

      setResult(res.data);

    } catch (err) {
      console.error(err);
      alert("AI recommendation failed");
    }
  };

  const calculateRisk = async () => {

    if (!age || !income || !familyMembers) {
      alert("Please fill all fields");
      return;
    }

    const res = await axios.post(
      "http://localhost:8080/api/ai/risk-score",
      {
        age: Number(age),
        income: Number(income),
        familyMembers: Number(familyMembers),
        existingInsurance
      }
    );

    setRisk(res.data);
  };

  const checkCoverageGap = async () => {

    const res = await axios.post(
      "http://localhost:8080/api/ai/coverage-gap",
      {
        age: Number(age),
        income: Number(income),
        familyMembers: Number(familyMembers),
        existingInsurance
      }
    );

    setGapResult(res.data);
  };

  const calculateHealthScore = async () => {

    const res = await axios.post(
      "http://localhost:8080/api/ai/health-score",
      {
        age: Number(age),
        income: Number(income),
        familyMembers: Number(familyMembers),
        existingInsurance
      }
    );

    setHealthScore(res.data);
  };  
  return (
    <div className="main-content">

      {/* PAGE HEADER */}
      <div className="dashboard-hero mb-4">
        <h2 className="fw-bold"> AI Insurance Advisor</h2>
        <p>
          Get smart insurance recommendations powered by AI analysis.
        </p>
      </div>

      {/* INPUT FORM */}
      <div className="app-card mb-4">

        <h5 className="fw-bold mb-3">Enter Your Details</h5>

        <div className="row g-3">

          <div className="col-md-3">
            <label className="form-label">Age</label>
            <input
              type="number"
              className="form-control"
              onChange={(e)=>setAge(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Annual Income</label>
            <input
              type="number"
              className="form-control"
              onChange={(e)=>setIncome(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Family Members</label>
            <input
              type="number"
              className="form-control"
              onChange={(e)=>setFamilyMembers(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Existing Insurance</label>

            <select
              className="form-control"
              onChange={(e)=>setExistingInsurance(e.target.value === "yes")}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

        </div>

        <div className="mt-4">

          <button
            className="btn btn-primary"
            onClick={getRecommendation}
          >
             Generate AI Recommendation
          </button>

          <button
            className="btn btn-primary ms-4"
            onClick={calculateRisk}
          >
             Calculate Risk Score
          </button>

          <button
          className="btn btn-warning ms-3"
          onClick={checkCoverageGap}
          >
           Detect Coverage Gap
          </button>

          <button
          className="btn btn-info ms-3"
          onClick={calculateHealthScore}
          >
           Insurance Health Score
          </button>          
        </div>

      </div>

      {/* AI RESULT */}
      {result && (

        <div className="app-card">

          <h4 className="fw-bold mb-3">
             AI Recommended Policy
          </h4>

          <div className="row">

            <div className="col-md-3">
              <p className="text-muted">Policy</p>
              <h5>{result.policy}</h5>
            </div>

            <div className="col-md-3">
              <p className="text-muted">Coverage</p>
              <h5 className="text-success">{result.coverage}</h5>
            </div>

            <div className="col-md-3">
              <p className="text-muted">Premium</p>
              <h5 className="text-primary">{result.premium}</h5>
            </div>

            <div className="col-md-3">
              <p className="text-muted">Reason</p>
              <p>{result.reason}</p>
            </div>

          </div>

        </div>

      )}
      {risk && (

        <div className="app-card mt-4">

          <h4 className="fw-bold">
             Insurance Risk Score
          </h4>

          <h2 className="text-danger">
            {risk.score} / 100
          </h2>

          <p>{risk.message}</p>

        </div>

      )}

      {gapResult && (

      <div className="app-card mt-4">

      <h5> AI Coverage Gap Analysis</h5>

      <p>{gapResult.message}</p>

      <h6 className="text-primary">
      {gapResult.recommendation}
      </h6>

      </div>

      )}

      {healthScore && (

      <div className="app-card mt-4">

      <h5> Insurance Health Score</h5>

      <h2 className="text-primary">
      {healthScore.score} / 100
      </h2>

      <p><strong>Status:</strong> {healthScore.status}</p>

      <p>{healthScore.recommendation}</p>

      </div>

      )}

      {/* AI CHATBOT */}
      <AIChatbot />

      <PolicyComparison />
    </div>
  );
}

export default AIAdvisor;