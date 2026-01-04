import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../AuthContext/AuthContext";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";

const Register = () => {
  const { singWithEmail, singInWithGoogle, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleSignUp = (e) => {
    e.preventDefault();
    singInWithGoogle()
      .then((res) => {
        setUser(res.user);
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Registration successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const handleEmailSignUp = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    let errors = [];
    if (!/[A-Z]/.test(password)) errors.push("• Must contain at least one uppercase letter.");
    if (!/[a-z]/.test(password)) errors.push("• Must contain at least one lowercase letter.");
    if (password.length < 6) errors.push("• Must be at least 6 characters long.");

    if (errors.length > 0) {
      setPasswordError(errors);
      return;
    } else {
      setPasswordError([]);
    }

    singWithEmail(email, password)
      .then((res) => {
        const user = res.user;
        setUser({ ...user, displayName: name });
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Registration successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-secondary w-full text-neutral-content">
      <div className="min-h-screen flex items-center justify-center p-4">
        <title>StudyMate - Register</title>
        <div className="flex flex-col lg:flex-row-reverse items-center gap-10 w-full max-w-7xl">
          <div className="text-center lg:text-left max-w-lg">
            <h1 className="text-5xl font-bold mb-4 text-gray-800">Register Now!</h1>
            <p className="text-gray-600 text-lg">
              Access your StudyMate account to find learning partners, <br />
              manage your connections, and continue your study journey.
            </p>
          </div>

          <div className="card bg-base-100 w-full max-w-lg lg:p-8 rounded-2xl shadow-2xl border border-gray-100 transition-all duration-300">
            <div className="card-body flex flex-col gap-4">
              <form onSubmit={handleEmailSignUp}>
                <label className="label font-semibold pb-1">Name</label>
                <input
                  name="name"
                  type="text"
                  className="input border border-gray-200 w-full rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500/20"
                  placeholder="Name"
                  required
                />

                <label className="label font-semibold py-1 mt-3">Email</label>
                <input
                  name="email"
                  type="email"
                  className="input border border-gray-200 w-full rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500/20"
                  placeholder="Email"
                  required
                />

                <label className="label font-semibold py-1 mt-3">Password</label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="input border border-gray-200 w-full rounded-lg px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-green-500/20"
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 z-10 p-1"
                  >
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>

                {passwordError && (
                  <div className="mt-2">
                    {passwordError.map((err, idx) => (
                      <p key={idx} className="text-red-500 text-xs font-medium">{err}</p>
                    ))}
                  </div>
                )}

                <div className="flex flex-col gap-3 mt-6">
                  {/* --- Updated Register Button --- */}
                  <button
                    type="submit"
                    className="w-full bg-green-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-green-200 hover:bg-green-600 active:scale-95 transition-all duration-300"
                  >
                    Register
                  </button>

                  <div className="divider text-xs text-gray-400 font-bold uppercase tracking-widest">
                    Or continue with
                  </div>

                  {/* --- Updated Google Button --- */}
                  <button
                    type="button"
                    onClick={handleGoogleSignUp}
                    className="flex items-center justify-center gap-2 w-full bg-white border border-gray-200 font-bold py-3 rounded-xl hover:bg-gray-50 active:scale-95 transition-all duration-300 text-gray-700 text-sm"
                  >
                    <FcGoogle size={20} /> Google
                  </button>
                </div>

                <p className="text-sm text-center text-gray-500 mt-8">
                  Already have an account?{" "}
                  <Link className="text-green-600 font-bold hover:underline" to={"/login"}>
                    Login
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

export default Register;