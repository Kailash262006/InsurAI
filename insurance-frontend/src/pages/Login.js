import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {

      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { email, password }
      );

      localStorage.setItem("user", JSON.stringify(response.data));

      const isAgent =
        response.data.roles?.some(r => r.name === "AGENT");

      if (isAgent) {
        navigate("/dashboard");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    //<div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="login-page">
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        
        <h3 className="text-center text-primary mb-4">
          InsurAI Login
        </h3>
        <p className="text-center text-muted mb-4">
          AI-Powered Insurance Advisor
        </p>
        <input
          className="form-control mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-4"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn btn-primary w-100"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="text-center mt-3">
          New user? <a href="/register">Register</a>
        </p>

      </div>
    </div>
  );
}

export default Login;