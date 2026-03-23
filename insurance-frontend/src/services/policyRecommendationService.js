export function getPolicyRecommendation(data) {

  const {
    totalPolicies,
    coverage,
    claims,
    riskScore
  } = data;

  // RULE 1: Low policies
  if (totalPolicies < 2) {
    return {
      policy: "Life Shield Plan",
      reason: "You have limited insurance coverage. Life protection is recommended.",
      confidence: 85
    };
  }

  // RULE 2: Low coverage
  if (coverage < 1500000) {
    return {
      policy: "Health Secure Plus",
      reason: "Your current coverage is below recommended level.",
      confidence: 82
    };
  }

  // RULE 3: High claims
  if (claims > 2) {
    return {
      policy: "Comprehensive Health Shield",
      reason: "Frequent claims detected. Higher protection is advised.",
      confidence: 78
    };
  }

  // RULE 4: High risk score
  if (riskScore < 60) {
    return {
      policy: "Premium Protection Plan",
      reason: "AI detected high risk profile.",
      confidence: 88
    };
  }

  // DEFAULT
  return {
    policy: "Balanced Protection Plan",
    reason: "Your insurance profile is stable. Maintain balanced coverage.",
    confidence: 75
  };
}