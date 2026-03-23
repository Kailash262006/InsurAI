import { useEffect, useState } from "react";
import axios from "axios";

function AgentCustomers() {

  const user = JSON.parse(localStorage.getItem("user"));
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {

    const loadCustomers = async () => {

      try {

        const res = await axios.get(
          `http://localhost:8080/api/appointments/agent/${user.id}`
        );

        setAppointments(res.data);

      } catch (err) {
        console.log(err);
      }

    };

    loadCustomers();

  }, [user.id]);

  /* ===== GROUP CUSTOMERS ===== */

  const customerMap = {};

  appointments.forEach(a => {

    const name = a.user?.name || "Customer";

    if (!customerMap[name]) {
      customerMap[name] = {
        name,
        total: 0,
        lastDate: a.appointmentDate
      };
    }

    customerMap[name].total += 1;

    if (a.appointmentDate > customerMap[name].lastDate) {
      customerMap[name].lastDate = a.appointmentDate;
    }

  });

  const customers = Object.values(customerMap);

  return (
    <div className="main-content">

      <div className="dashboard-hero mb-4">
        <h2 className="fw-bold"> My Customers</h2>
        <p>Customers who booked consultation with you</p>
      </div>

      <div className="app-card">

        {customers.length === 0 ? (
          <p className="text-muted text-center">
            No customers yet.
          </p>
        ) : (

          <table className="table align-middle">

            <thead>
              <tr>
                <th>Customer</th>
                <th>Total Consultations</th>
                <th>Last Consultation</th>
              </tr>
            </thead>

            <tbody>

              {customers.map(c => (

                <tr key={c.name}>

                  <td className="fw-semibold">
                    {c.name}
                  </td>

                  <td>
                    {c.total}
                  </td>

                  <td>
                    {c.lastDate}
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

export default AgentCustomers;