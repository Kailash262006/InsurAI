import { useState } from "react";

function PolicyComparison() {

  const policies = [
    {
      name: "Health Secure Plus",
      coverage: "₹15,00,000",
      premium: "₹12,500/year",
      type: "Health"
    },
    {
      name: "Family Health Shield",
      coverage: "₹12,00,000",
      premium: "₹11,000/year",
      type: "Family Health"
    },
    {
      name: "Premium Life Shield",
      coverage: "₹25,00,000",
      premium: "₹18,000/year",
      type: "Life Insurance"
    }
  ];

  const [policy1, setPolicy1] = useState(null);
  const [policy2, setPolicy2] = useState(null);

  return (
    <div className="app-card mt-4">

      <h5 className="fw-bold mb-3"> Compare Insurance Policies</h5>

      <div className="row mb-3">

        <div className="col-md-6">
          <select
            className="form-control"
            onChange={(e)=>setPolicy1(policies[e.target.value])}
          >
            <option>Select Policy 1</option>

            {policies.map((p,index)=>(
              <option key={index} value={index}>
                {p.name}
              </option>
            ))}

          </select>
        </div>

        <div className="col-md-6">
          <select
            className="form-control"
            onChange={(e)=>setPolicy2(policies[e.target.value])}
          >
            <option>Select Policy 2</option>

            {policies.map((p,index)=>(
              <option key={index} value={index}>
                {p.name}
              </option>
            ))}

          </select>
        </div>

      </div>

      {policy1 && policy2 && (

        <table className="table table-bordered">

          <thead>
            <tr>
              <th>Feature</th>
              <th>{policy1.name}</th>
              <th>{policy2.name}</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Coverage</td>
              <td>{policy1.coverage}</td>
              <td>{policy2.coverage}</td>
            </tr>

            <tr>
              <td>Premium</td>
              <td>{policy1.premium}</td>
              <td>{policy2.premium}</td>
            </tr>

            <tr>
              <td>Type</td>
              <td>{policy1.type}</td>
              <td>{policy2.type}</td>
            </tr>
          </tbody>

        </table>

      )}

    </div>
  );
}

export default PolicyComparison;