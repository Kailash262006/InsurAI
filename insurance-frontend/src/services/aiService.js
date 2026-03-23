export function generateAIInsights(userData) {

  const insights = [];

  // Risk logic
  if (userData.riskScore > 70) {
    insights.push("⚠ High insurance risk detected.");
  }

  // Policy logic
  if (userData.policies < 2) {
    insights.push("🛡 Consider adding more insurance coverage.");
  }

  // Claims logic
  if (userData.claims > 2) {
    insights.push("📄 Frequent claims detected. Review coverage terms.");
  }

  // Consultation suggestion
  if (!userData.hasUpcomingConsultation) {
    insights.push("📅 AI suggests booking an advisor consultation.");
  }

  if (insights.length === 0) {
    insights.push(" Your insurance profile looks well balanced.");
  }

  return insights;
}