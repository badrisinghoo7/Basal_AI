import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../services/api";
import "./Signup.css"; // 👈 Create a CSS file for styles

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signupUser(form);

      if (res.success || res.message === "User registered successfully") {
        setMessage("Signup successful! Redirecting to login...");
        setIsSuccess(true);
        setTimeout(() => {
          navigate("/login");
        },1000);
      } else {
        setMessage(res.message || "Signup failed");
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Signup failed:", error);
      setMessage(error.message || "Signup failed");
      setIsSuccess(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-box">
        <h2>Signup</h2>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
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
        <button type="submit">Signup</button>

        <p className="redirect-text">
          Already have an account? <span onClick={() => navigate("/login")}>Login here</span>
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

export default Signup;
