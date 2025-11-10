import React, { use } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../AuthContext/AuthContext";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";

const Login = () => {
  const { singInWithGoogle, loginWithEmail, setUser } = use(AuthContext);
  const navigate = useNavigate();

  const handleGoogleSingIn = (e) => {
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
      .catch((error) => error);
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
      .then((error) => console.log(error));
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Access your StudyMate account to find learning partners, <br />{" "}
            manage your connections, and continue your study journey.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  name="email"
                  type="email"
                  className="input w-full"
                  placeholder="Email"
                />
                <label className="label">Password</label>
                <input
                  name="password"
                  type="password"
                  className="input w-full"
                  placeholder="Password"
                />
                <p>Forget Password</p>
                <button
                  onClick={handleGoogleSingIn}
                  className="btn bg-white text-black border-[#e5e5e5] my-2"
                >
                  <FcGoogle></FcGoogle> Login with Google
                </button>
                <button
                  onSubmit={handleEmailSignIn}
                  className="btn bg-[#5BBC2E] text-white hover:bg-white hover:border-2 hover:border-[#5BBC2E] hover:text-[#5BBC2E]"
                >
                  Login
                </button>
                <p className="text-sm font-semibold">
                  don't have an account{" "}
                  <Link className="text-[#5BBC2E]" to={"/register"}>
                    Register
                  </Link>
                </p>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
