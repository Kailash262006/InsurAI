import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const isAgent =
    user?.roles?.some(r => r.name === "AGENT");

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  if (!user) return null;

  return (
    <nav className="navbar navbar-dark bg-primary px-4">
      <span className="navbar-brand text-white">
        InsurAI 
      </span>

      <div>

        <Link className="btn btn-light me-2" to="/dashboard">
          Dashboard
        </Link>

        {/* ✅ SHOW ONLY FOR NORMAL USERS */}
        {!isAgent && (
          <Link className="btn btn-light me-2" to="/book">
            Book Appointment
          </Link>
        )}

        {/* ✅ SHOW ONLY FOR AGENTS */}
        {isAgent && (
          <Link className="btn btn-outline-light me-2" to="/agent">
            Agent Panel
          </Link>
        )}

        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>

      </div>
    </nav>
  );
}

export default Navbar;