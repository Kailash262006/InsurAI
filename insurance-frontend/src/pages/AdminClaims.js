import { useEffect, useState } from "react";
import axios from "axios";

function AdminClaims() {

  const [claims, setClaims] = useState([]);

  useEffect(() => {

    const loadClaims = async () => {
      const res = await axios.get("http://localhost:8080/api/claims");
      setClaims(res.data);
    };

    loadClaims();

  }, []);

  const updateStatus = (id, status) => {

    const updated = claims.map(c =>
      c.id === id ? { ...c, status } : c
    );

    setClaims(updated);
  };

  return (

    <div className="main-content">

      <h2 className="fw-bold mb-4">Admin - Claims Management</h2>

      <div className="app-card">

        <table className="table">

          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Policy</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {claims.map(c => (

              <tr key={c.id}>

                <td>{c.id}</td>
                <td>{c.userId}</td>
                <td>{c.policy}</td>
                <td>₹{c.amount}</td>
                <td>{c.status}</td>

                <td>

                  {c.status === "PENDING" && (
                    <>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => updateStatus(c.id, "APPROVED")}
                      >
                        Approve
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => updateStatus(c.id, "REJECTED")}
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

      </div>

    </div>
  );
}

export default AdminClaims;