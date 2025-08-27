import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  const navigate = useNavigate();

  // Handle form inputs
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle submit (real backend)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    setError(null);

    try {
      const url = isLoginView ? "/api/auth/login" : "/api/auth/register";
      const payload = isLoginView
        ? { email: formData.email, password: formData.password }
        : formData;

      const res = await axios.post(url, payload, { withCredentials: true });
      setMsg(res.data.message || "Success!");
      localStorage.setItem("accessToken", res.data.access);
      console.log("User Data:", res.data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Demo login (mock)
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

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans flex items-center justify-center p-4">
      <div className="w-full max-w-4xl min-h-[520px] bg-slate-800 rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Branding */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-slate-900/50">
          <h1 className="text-4xl md:text-5xl font-bold mb-10 text-purple-500">
            Inboxly
          </h1>
          <p className="text-slate-300 text-lg mb-6">
            The open-source messenger platform for seamless team and product
            communication.
          </p>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2">
            {isLoginView ? "Welcome Back" : "Create an Account"}
          </h2>
          <p className="text-slate-400 mb-6">
            {isLoginView
              ? "Log in to continue"
              : "Start your journey with Inboxly"}
          </p>

          {error && (
            <p className="mb-4 text-sm text-center text-red-400">{error}</p>
          )}
          {msg && (
            <p className="mb-4 text-sm text-center text-green-400">{msg}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLoginView && (
              <>
                <div>
                  <label className="block text-sm mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Role</label>
                  <select
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
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg"
                placeholder="••••••••"
                required
              />
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

          {/* Demo Login */}
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
              onClick={() => setIsLoginView(!isLoginView)}
              className="text-blue-400 hover:underline"
            >
              {isLoginView ? "Sign Up" : "Log In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
