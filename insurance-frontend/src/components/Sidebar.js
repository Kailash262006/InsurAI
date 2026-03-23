import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const isAgent =
    user?.roles?.some(r => r.name === "AGENT");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="sidebar">

      {/* LOGO */}
      <div>
        <h1 className="sidebar-logo">
          🛡 InsurAI
        </h1>

        <div className="sidebar-menu">

        {!isAgent && (
        <>
        <NavLink to="/dashboard" className="sidebar-link">
         Dashboard
        </NavLink>

        <NavLink to="/policies" className="sidebar-link">
        Policies
        </NavLink>

        <NavLink to="/ai-advisor" className="sidebar-link">
         AI Advisor
        </NavLink>

        <NavLink to="/claims" className="sidebar-link">
         Claims
        </NavLink>

        <NavLink to="/book" className="sidebar-link">
         Consult Advisor
        </NavLink>

        <NavLink to="/history" className="sidebar-link">
         My Activity
        </NavLink>
        </>
        )}

        {isAgent && (
        <>
        <NavLink to="/dashboard" className="sidebar-link">
         Dashboard
        </NavLink>

        <NavLink to="/agent" className="sidebar-link">
         Agent Panel
        </NavLink>

        <NavLink to="/availability" className="sidebar-link">
         Set Availability
        </NavLink>

        <NavLink to="/customers" className="sidebar-link">
           My Customers
        </NavLink>           

        <NavLink to="/policy-suggestions" className="sidebar-link">
           Policy Suggestions
        </NavLink>           
        </>
        )}

        </div>
      </div>

      {/* FOOTER */}
      <div className="sidebar-footer">

        <p className="sidebar-user">
          Logged in as <strong>{user?.name}</strong>
        </p>

        <button
          className="btn btn-light w-100"
          onClick={logout}
        >
           Logout
        </button>

      </div>

    </div>
  );
}

export default Sidebar;