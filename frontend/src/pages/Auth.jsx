import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import googleicon from "./googleIcon.svg";
import toast from "react-hot-toast";

const handleGoogleLogin = () => {
  window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
};

function validateSignupFields(formData) {
  const errors = {};
  if (!formData.name.trim()) {
    errors.name = "Full name is required.";
  } else if (formData.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }
  if (!formData.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!formData.password) {
    errors.password = "Password is required.";
  } else if (formData.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }
  return errors;
}

export default function Auth() {
  const [isLoginView, setIsLoginView] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "User",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const API_BASE_URL =
    import.meta.env.VITE_API_URL || "https://inboxly-q38f.onrender.com";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError(null);

    if (!isLoginView) {
      const errors = validateSignupFields(formData);
      setFieldErrors(errors);
      if (Object.keys(errors).length > 0) return;
    }

    setLoading(true);

    const url = isLoginView
      ? `${API_BASE_URL}/api/auth/login`
      : `${API_BASE_URL}/api/auth/register`;

    const payload = isLoginView
      ? { email: formData.email, password: formData.password }
      : formData;

    try {
      const res = await axios.post(url, payload, { withCredentials: true });
      setMsg(res.data.message || "Success!");
      localStorage.setItem("accessToken", res.data.access);
      if (isLoginView) {
        navigate("/dashboard");
      } else {
        setIsLoginView(true);
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || "Something went wrong";
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setLoading(true);
    setMsg("");
    setError(null);

    setTimeout(() => {
      const demoUser = { name: "Demo User", email: "demo@example.com" };
      localStorage.setItem("demoUser", JSON.stringify(demoUser));
      setMsg("Logged in as Demo User!");
      setLoading(false);
      navigate("/welcome");
    }, 1000);
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 bg-slate-700 border rounded-lg ${
      fieldErrors[field] ? "border-red-500" : "border-slate-600"
    }`;

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans flex items-center justify-center p-4 ">
      <div className="w-full max-w-4xl min-h-[520px] bg-slate-800 rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Branding */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-slate-900/50">
          <h1 className="text-4xl md:text-5xl font-bold mb-10 text-purple-500">Inboxly</h1>
          <p className="text-slate-300 text-lg mb-6">
            The open-source messenger platform for seamless team and product communication.
          </p>
        </div>
        {/* Right Panel */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2">
            {isLoginView ? "Welcome Back" : "Create an Account"}
          </h2>
          <p className="text-slate-400 mb-6">
            {isLoginView ? "Log in to continue" : "Start your journey with Inboxly"}
          </p>
          <div className="form-wrapper">
            {isLoginView && (
              <div className="google-btn-wrapper mb-4">
                <button className="google-button flex items-center gap-2" onClick={handleGoogleLogin}>
                  <img
                    src={googleicon}
                    alt="Google Icon"
                    className="w-5 h-5"
                  />
                  Continue with Google
                </button>
              </div>
            )}
            {error && (
              <p className="mb-4 text-sm text-center text-red-400">{error}</p>
            )}
            {msg && (
              <p className="mb-4 text-sm text-center text-green-400">{msg}</p>
            )}
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {!isLoginView && (
                <>
                  <div>
                    <label htmlFor="name" className="block text-sm mb-1">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      onChange={handleChange}
                      className={inputClass("name")}
                      placeholder="John Doe"
                      aria-invalid={!!fieldErrors.name}
                      aria-describedby={fieldErrors.name ? "name-error" : undefined}
                    />
                    {fieldErrors.name && (
                      <p id="name-error" className="mt-1 text-sm text-red-400" role="alert">{fieldErrors.name}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-sm mb-1">Role</label>
                    <select
                      id="role"
                      name="role"
                      onChange={handleChange}
                      className="w-full px-4 py-3 pr-3 bg-slate-700 border border-slate-600 rounded-lg"
                    >
                      <option>User</option>
                      <option>Admin</option>
                    </select>
                  </div>
                </>
              )}
              <div>
                <label htmlFor="email" className="block text-sm mb-1">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  className={inputClass("email")}
                  placeholder="you@example.com"
                  aria-invalid={!!fieldErrors.email}
                  aria-describedby={fieldErrors.email ? "email-error" : undefined}
                />
                {fieldErrors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-400" role="alert">{fieldErrors.email}</p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="block text-sm mb-1">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  className={inputClass("password")}
                  placeholder="••••••••"
                  aria-invalid={!!fieldErrors.password}
                  aria-describedby={fieldErrors.password ? "password-error" : undefined}
                />
                {fieldErrors.password && (
                  <p id="password-error" className="mt-1 text-sm text-red-400" role="alert">{fieldErrors.password}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-bold"
              >
                {loading
                  ? "Processing..."
                  : isLoginView
                    ? "Log In"
                    : "Create Account"}
              </button>
            </form>
            <button
              onClick={handleDemoLogin}
              disabled={loading}
              className="mt-4 w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-bold"
            >
              {loading ? "Logging in..." : "Demo Login"}
            </button>
            <p className="text-center text-sm text-slate-400 mt-6">
              {isLoginView ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setIsLoginView(!isLoginView);
                  setFieldErrors({});
                  setError(null);
                  setMsg("");
                }}
                className="text-blue-400 hover:underline ml-2"
              >
                {isLoginView ? "Sign Up" : "Log In"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
