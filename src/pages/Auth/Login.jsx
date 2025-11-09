import React, { use } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../AuthContext/AuthContext";
import { Link } from "react-router";

const Login = () => {

  const {singInWithGoogle , setUser} = use(AuthContext)

  const handleGoogleSingIn = () => {
    singInWithGoogle()
    .then(res => {
      setUser(res.user)
    })
    .catch(error => error)
  }
  


  

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
              <input type="email" className="input w-full" placeholder="Email" />
              <label className="label">Password</label>
              <input type="password" className="input w-full" placeholder="Password" />
              <p>Forget Password</p>
            </fieldset>
           </form>
              <button onClick={handleGoogleSingIn} className="btn bg-white text-black border-[#e5e5e5] my-2">
                <FcGoogle></FcGoogle> Login with Google
              </button>
              <button className="btn bg-[#5BBC2E] text-white hover:bg-white hover:border-2 hover:border-[#5BBC2E] hover:text-[#5BBC2E]">Login</button>
              <p className="text-sm font-semibold">don't have an account <Link className="text-[#5BBC2E]" to={'/register'}>Register</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
