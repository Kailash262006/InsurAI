import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import BookAppointment from "./pages/BookAppointment";
import AppointmentHistory from "./pages/AppointmentHistory";
import AgentDashboard from "./pages/AgentDashboard";
import AgentAvailability from "./pages/AgentAvailability";
import Policies from "./pages/Policies";
import AIAdvisor from "./pages/AIAdvisor";
import Claims from "./pages/Claims";
import AgentPanel from "./pages/AgentPanel";
import AgentCustomers from "./pages/AgentCustomers";
import AgentPolicySuggestions from "./pages/AgentPolicySuggestions";
import AdminClaims from "./pages/AdminClaims";
import PolicyDetails from "./pages/PolicyDetails";

import MainLayout from "./layouts/MainLayout";

function App() {

  const user = JSON.parse(localStorage.getItem("user"));
  const isAgent =
    user?.roles?.some(r => r.name === "AGENT");

  return (
    <BrowserRouter>

      <Routes>

        {/* ✅ PUBLIC ROUTES (NO SIDEBAR) */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ PROTECTED LAYOUT */}
        <Route element={user ? <MainLayout /> : <Navigate to="/" />}>

          <Route
            path="/dashboard"
            element={
              user?.roles?.some(r => r.name === "AGENT")
                ? <AgentDashboard />
                : <Dashboard />
            }
          />
          <Route
            path="/customers"
            element={isAgent ? <AgentCustomers /> : <Navigate to="/dashboard" />}
          />        
          <Route
            path="/policy-suggestions"
            element={isAgent ? <AgentPolicySuggestions /> : <Navigate to="/dashboard" />}
          />           
          <Route path="/book" element={<BookAppointment />} />
          <Route path="/history" element={<AppointmentHistory />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/ai-advisor" element={<AIAdvisor />} />
          <Route path="/policy/:id" element={<PolicyDetails />} />
          <Route path="/claims" element={<Claims />} />
          <Route
            path="/agent"
            element={
              isAgent
                ? <AgentPanel />
                : <Navigate to="/dashboard" />
            }
          />

          <Route
            path="/availability"
            element={isAgent ? <AgentAvailability /> : <Navigate to="/dashboard" />}
          />
          <Route path="/admin-claims" element={<AdminClaims />} />
        </Route>

      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  );
}

export default App;