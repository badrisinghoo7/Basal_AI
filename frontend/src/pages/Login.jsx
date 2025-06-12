import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import "./Login.css"; // 👈 Use same CSS file as Signup

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      console.log(res)

      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("role", res.role);
        setMessage("Login successful! Redirecting...");
        setIsSuccess(true);
        setTimeout(() => {
          navigate(res.role === "admin" ? "/recruiter" : "/apply");
        }, 1500);
      } else {
        setMessage(res.message || "Login failed");
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setMessage(error.message || "Login failed");
      setIsSuccess(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-box">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit">Login</button>

        <p className="redirect-text">
          Don't have an account? <span onClick={() => navigate("/signup")}>Signup here</span>
        </p>

        {message && (
          <div className={`alert ${isSuccess ? "success" : "error"}`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;
