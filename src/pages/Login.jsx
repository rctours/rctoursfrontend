import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LogIn, User, Lock, Loader2, Eye, EyeOff } from "lucide-react";

const STRAPI_LOGIN_URL =
  "https://appetizing-vacation-f624a8a99b.strapiapp.com/api/auth/local";

const DASHBOARD_PATH = "/admin";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear field error on change
    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: "" });
    }
  };

  const validateForm = () => {
    const errors = { identifier: "", password: "" };
    let isValid = true;

    // Check identifier (email or username)
    if (!formData.identifier.trim()) {
      errors.identifier = "Email or Username is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.identifier) && !formData.identifier.includes("@")) {
      // Basic email check if it looks like email
      if (formData.identifier.includes("@") && !/\S+@\S+\.\S+/.test(formData.identifier)) {
        errors.identifier = "Please enter a valid email.";
        isValid = false;
      }
    }

    // Check password
    if (!formData.password) {
      errors.password = "Password is required.";
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(STRAPI_LOGIN_URL, formData);

      if (response.status === 200 && response.data.jwt) {
        const { jwt, user } = response.data;

        localStorage.setItem("authToken", jwt);
        localStorage.setItem("user", JSON.stringify(user));
        if (rememberMe) {
          localStorage.setItem("rememberMe", "true");
        } else {
          localStorage.removeItem("rememberMe");
        }

        navigate(DASHBOARD_PATH);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.error?.message ||
        "Login failed. Check your credentials.";

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat pt-25 p-4"
      style={{
        backgroundImage: "url('/formBg.webp')",
      }}
    >
      <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl p-8 rounded-2xl shadow-2xl border border-white/30 space-y-6">
        {/* Title */}
        <div className="text-center">
          <div className="flex justify-center mb-3">
            <LogIn size={40} className="text-blue-600" />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 tracking-wide">
           RC Admin Login
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            Login with your admin credentials.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email/Username */}
          <div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                id="identifier"
                name="identifier"
                type="text"
                required
                value={formData.identifier}
                onChange={handleChange}
                placeholder="Email or Username"
                disabled={loading}
                className="w-full pl-12 pr-3 py-3 border border-gray-300 rounded-xl
                bg-gray-50 text-gray-800 placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            {fieldErrors.identifier && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.identifier}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                disabled={loading}
                className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl
                bg-gray-50 text-gray-800 placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                disabled={loading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {fieldErrors.password && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.password}</p>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 text-sm bg-red-100 text-red-700 border border-red-200 rounded-lg text-center">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 flex justify-center items-center gap-2
            bg-blue-600 text-white font-semibold rounded-xl
            hover:bg-blue-700 shadow-md
            disabled:opacity-50 transition-all duration-200"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5" />
                Signing In...
              </>
            ) : (
              <>
                <LogIn className="h-5 w-5" />
                Sign In
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500">
          © {new Date().getFullYear()} RC Admin Panel
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
