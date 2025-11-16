import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../AuthContext/AuthContext";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";

const Login = () => {
  const { singInWithGoogle, loginWithEmail, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

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
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  const handleEmailSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    loginWithEmail(email, password)
      .then((res) => {
        setUser(res.user);
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Login successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="bg-secondary w-full text-neutral-content">
    <div className="min-h-screen flex items-center justify-center p-4 ">
      <title>StudyMate - Login</title>

      <div className="flex flex-col lg:flex-row-reverse items-center gap-10 w-full max-w-7xl">


        <div className="text-center lg:text-left max-w-lg">
          <h1 className="text-5xl font-bold  mb-4">Login now!</h1>
          <p className="text-gray-600 text-lg">
            Access your StudyMate account to find learning partners, <br />
            manage your connections, and continue your study journey.
          </p>
        </div>


        <div className="card bg-base-100 w-full max-w-lg lg:p-8 rounded-lg shadow-2xl hover:shadow-3xl transition-all duration-300">
          <div className="card-body flex flex-col gap-4">

            <form onSubmit={handleEmailSignIn}>

              <label className="label font-semibold pb-2">Email</label>
              <input
                name="email"
                type="email"
                className="input  border border-gray-300 w-full rounded-lg px-4 py-2 
                       outline-none focus:outline-none focus:ring-0"
                placeholder="Email"
                required
              />

              <label className="label font-semibold py-2 mt-3">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="input  border border-gray-300 w-full rounded-lg px-4 py-2 pr-12
                         outline-none focus:outline-none focus:ring-0"
                  placeholder="Password"
                  required
                />


                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer 
                             text-gray-600 hover:text-gray-800 z-10"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ?  <FaEye size={20} /> : <FaEyeSlash size={20} />}
                </span>
              </div>

              <p className="text-sm text-right text-gray-500 mb-4 cursor-pointer hover:text-green-500">
                Forgot Password?
              </p>


              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center gap-2 w-full bg-base-100 border 
                       border-gray-300  font-semibold py-3 rounded-lg shadow 
                       hover:bg-gray-100 transition-all duration-300 mb-3"
              >
                <FcGoogle size={24} /> Login with Google
              </button>

              <button
                type="submit"
                className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg 
                       shadow hover:bg-base-100 hover:text-green-500 hover:border 
                       hover:border-green-500 transition-all duration-300 mb-2"
              >
                Login
              </button>

              <p className="text-sm text-center text-gray-600 mt-2">
                Don't have an account?{" "}
                <Link
                  className="text-green-500 font-semibold hover:underline"
                  to={"/register"}
                >
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
