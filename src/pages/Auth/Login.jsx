import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaUserSecret } from "react-icons/fa"; // Added Guest Icon
import { AuthContext } from "../../AuthContext/AuthContext";
import { Link, useNavigate, useLocation } from "react-router";
import Swal from "sweetalert2";

const Login = () => {
  const { singInWithGoogle, loginWithEmail, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const from = location.state?.from?.pathname || "/";

  // Guest Credentials
  const guestEmail = "guest@gmail.com";
  const guestPassword = "@Guest";

  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    singInWithGoogle()
      .then((res) => {
        setUser(res.user);
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Login successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setError("Google login failed. Please try again.");
      });
  };

  const handleEmailSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    performLogin(email, password);
  };

  // New Guest Login Function
  const handleGuestLogin = () => {
    performLogin(guestEmail, guestPassword);
  };

  // Reusable login logic
  const performLogin = (email, password) => {
    loginWithEmail(email, password)
      .then((res) => {
        setUser(res.user);
        setError("");
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Login successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setError("Invalid email or password");
      });
  };

  return (
    <div className="bg-secondary w-full text-neutral-content">
      <div className="min-h-screen flex items-center justify-center p-4">
        <title>StudyMate - Login</title>

        <div className="flex flex-col lg:flex-row-reverse items-center gap-10 w-full max-w-7xl">
          <div className="text-center lg:text-left max-w-lg">
            <h1 className="text-5xl font-bold mb-4 text-gray-800">Login now!</h1>
            <p className="text-gray-600 text-lg">
              Access your StudyMate account to find learning partners, <br />
              manage your connections, and continue your study journey.
            </p>
          </div>

          <div className="card bg-base-100 w-full max-w-lg lg:p-8 rounded-2xl shadow-2xl border border-gray-100">
            <div className="card-body flex flex-col gap-4">
              <form onSubmit={handleEmailSignIn}>
                <label className="label font-semibold pb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  className={`input border w-full rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500/20 ${
                    error ? "border-red-500" : "border-gray-200"
                  }`}
                  placeholder="Type Your Email"
                  required
                />

                <label className="label font-semibold py-1 mt-3">Password</label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className={`input border w-full rounded-lg px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-green-500/20 ${
                      error ? "border-red-500" : "border-gray-200"
                    }`}
                    placeholder="Enter password"
                    required
                  />

                  <span
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                  </span>
                </div>

                {error && <p className="text-red-500 text-xs mt-2 font-medium">{error}</p>}

                <div className="flex flex-col gap-3 mt-6">
                  <button
                    type="submit"
                    className="w-full bg-green-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-green-200 hover:bg-green-600 active:scale-95 transition-all duration-300"
                  >
                    Sign In
                  </button>

                  <div className="divider text-xs text-gray-400 font-bold uppercase tracking-widest">Or continue with</div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={handleGoogleSignIn}
                      className="flex items-center justify-center gap-2 bg-white border border-gray-200 font-bold py-3 rounded-xl hover:bg-gray-50 active:scale-95 transition-all duration-300 text-gray-700 text-sm"
                    >
                      <FcGoogle size={20} /> Google
                    </button>

                    {/* --- GUEST LOGIN BUTTON --- */}
                    <button
                      type="button"
                      onClick={handleGuestLogin}
                      className="flex items-center justify-center gap-2 bg-neutral text-white font-bold py-3 rounded-xl hover:bg-neutral/90 active:scale-95 transition-all duration-300 text-sm"
                    >
                      <FaUserSecret size={18} className="text-green-400" /> Guest Mode
                    </button>
                  </div>
                </div>

                <p className="text-sm text-center text-gray-500 mt-8">
                  Don't have an account?{" "}
                  <Link className="text-green-600 font-bold hover:underline" to={"/register"}>
                    Register
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;