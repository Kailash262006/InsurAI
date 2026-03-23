import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleRegister = async () => {

    if (!form.name || !form.email || !form.password) {
      alert("Fill all fields");
      return;
    }

    try {

      await axios.post(
        "http://localhost:8080/api/auth/register",
        form
      );

      alert("Registered successfully ✅");

      navigate("/login");

    } catch (err) {
      console.log(err);
      alert("Registration failed");
    }
  };

  return (

    <div className="login-page">

      <div className="card shadow-lg p-4" style={{ width: "400px" }}>

        <h3 className="text-center text-primary mb-4">
          InsurAI Register
        </h3>

        <p className="text-center text-muted mb-4">
          Create your account
        </p>

        <input
          className="form-control mb-3"
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          className="form-control mb-3"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          className="form-control mb-4"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          className="btn btn-primary w-100"
          onClick={handleRegister}
        >
          Register
        </button>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <span
            style={{ color: "#4f46e5", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>

      </div>

    </div>

  );
}

export default Register;