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

    if (!/[A-Z]/.test(password)) {
      errors.push("• Must contain at least one uppercase letter.");
    }

    if (!/[a-z]/.test(password)) {
      errors.push("• Must contain at least one lowercase letter.");
    }

    if (password.length < 6) {
      errors.push("• Must be at least 6 characters long.");
    }

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

        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-secondary w-full text-neutral-content">
      <div className="min-h-screen  flex items-center justify-center p-4">
      <title>StudyMate - Register</title>
      <div className="flex flex-col lg:flex-row-reverse items-center gap-10 w-full max-w-7xl">
        <div className="text-center lg:text-left max-w-lg">
          <h1 className="text-5xl font-bold  mb-4">
            Register Now!
          </h1>
          <p className="text-gray-600 text-lg">
            Access your StudyMate account to find learning partners, <br />
            manage your connections, and continue your study journey.
          </p>
        </div>

        <div className="card bg-base-100 w-full max-w-lg lg:p-8 rounded-lg shadow-2xl hover:shadow-3xl transition-all duration-300">
          <div className="card-body flex flex-col gap-4">
            <form onSubmit={handleEmailSignUp}>
              <label className="label font-semibold pb-2 ">Name</label>
              <input
                name="name"
                type="text"
                className="outline-none input  border border-gray-300 w-full rounded-lg px-4 py-2"
                placeholder="Name"
                required
              />

              <label className="label font-semibold py-2">Email</label>
              <input
                name="email"
                type="email"
                className="outline-none input  border border-gray-300 w-full rounded-lg px-4 py-2"
                placeholder="Email"
                required
              />

              <label className="label font-semibold py-2">
                Password
              </label>
              <div className="relative overflow-visible">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="outline-none input border border-gray-300 w-full rounded-lg px-4 py-2 pr-12"
                  placeholder="Password"
                  required
                />


                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-600 z-10"
                >
                  {showPassword ? (
                    <FaEye size={20} />
                  ) : (
                    <FaEyeSlash size={20} />
                  )}
                </button>
              </div>

              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}


              <button
                type="button"
                onClick={handleGoogleSignUp}
                className="flex items-center justify-center gap-2 w-full bg-base-100 border border-gray-300  font-semibold py-3 rounded-lg shadow hover:bg-gray-100 transition-all duration-300 mb-3 mt-3"
              >
                <FcGoogle size={24} /> Register with Google
              </button>


              <button
                type="submit"
                className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg shadow hover:bg-base-100 hover:text-green-500 hover:border hover:border-green-500 transition-all duration-300 mb-2"
              >
                Register
              </button>

              <p className="text-sm text-center text-gray-600 mt-2">
                Already have an account?{" "}
                <Link
                  className="text-green-500 font-semibold hover:underline"
                  to={"/login"}
                >
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
