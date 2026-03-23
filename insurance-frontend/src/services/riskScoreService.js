export function calculateRiskScore(data) {

  let score = 100;

  const {
    totalPolicies,
    claims,
    coverage,
    upcomingConsultation
  } = data;

  // Missing policies penalty
  if (totalPolicies < 2) score -= 20;
  if (totalPolicies < 3) score -= 10;

  // Claims risk
  score -= claims * 5;

  // Coverage risk
  if (coverage < 1000000) score -= 20;
  else if (coverage < 2000000) score -= 10;

  // Advisor consultation benefit
  if (upcomingConsultation) score += 5;

  // Clamp score between 0 and 100
  score = Math.max(0, Math.min(score, 100));

  return score;
}