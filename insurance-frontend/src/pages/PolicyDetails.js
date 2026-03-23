import { useParams } from "react-router-dom";

function PolicyDetails() {

  const { id } = useParams();

  // TEMP DATA (you can replace with API later)
  const policies = [
    {
      id: 1,
      name: "Health Secure Plus",
      type: "Health Insurance",
      coverage: "₹10,00,000",
      premium: "₹9,500/year",
      benefits: [
        "Cashless hospitalization",
        "Free annual checkup",
        "Family coverage"
      ]
    },
    {
      id: 2,
      name: "Vehicle Protect",
      type: "Motor Insurance",
      coverage: "₹5,00,000",
      premium: "₹6,200/year",
      benefits: [
        "Accident coverage",
        "Theft protection",
        "Roadside assistance"
      ]
    },
    {
      id: 3,
      name: "Life Shield",
      type: "Life Insurance",
      coverage: "₹20,00,000",
      premium: "₹12,000/year",
      benefits: [
        "Life protection",
        "Tax benefits",
        "Family security"
      ]
    }
  ];

  const policy = policies.find(p => p.id === Number(id));

  if (!policy) {
    return <h3>Policy not found</h3>;
  }

  return (
    <div className="main-content">

      <div className="app-card">

        <h2 className="fw-bold mb-3">{policy.name}</h2>

        <p><strong>Type:</strong> {policy.type}</p>
        <p><strong>Coverage:</strong> {policy.coverage}</p>
        <p><strong>Premium:</strong> {policy.premium}</p>

        <h5 className="mt-4">Benefits</h5>

        <ul>
          {policy.benefits.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>

      </div>

    </div>
  );
}

export default PolicyDetails;