import React, { use, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../AuthContext/AuthContext';

const Register = () => {
const {singWithEmail ,user, setUser , setLoading ,singInWithGoogle } = use(AuthContext)
    const navigate = useNavigate()

     useEffect(() => {
      if (user) {
        navigate("/");
      }
    }, [user, navigate]);

    const googleSingUp = () => {
        singInWithGoogle()
        .then(result => {
            setUser(result.user)
        })
        .catch(error => console.log(error))
      
    }
    


    const handleEmailSingUp = (e) => {
        e.preventDefault()
        const name = e.target.name.value;
        const email = e.target.email.value;
        const photoURL = e.target.photoURL.value;
        const password = e.target.password.value;

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
         if (!passwordPattern.test(password)) {
            alert('need strong password')
            return;
    }
        singWithEmail(email , password)
        .then((result) => {
        const user = result.user;
        setUser({ displayName: name, photoURL: photoURL })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photoURL });
            setLoading(false)
            navigate("/");
          })
          .catch((error) => {
            error;
            setUser(user);
          });
      })
      .catch((error) => {
        error
      });
    }
    

    return (
        <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register Now!</h1>
          <p className="py-6">
            Access your StudyMate account to find learning partners, <br />{" "}
            manage your connections, and continue your study journey.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
           <form onSubmit={handleEmailSingUp }>
             <fieldset className="fieldset">
              <label className="label">Name</label>
              <input type="name" name='name' className="input w-full" placeholder="name" />
              <label  className="label">Email</label>
              <input name='email' type="email" className="input w-full" placeholder="Email" />
              <label className="label">PhotURL</label>
              <input type="url" name='photoURL' className="input w-full" placeholder="photoURL" />
              <label className="label">Password</label>
              <input name='password' type="password" className="input w-full" placeholder="Password" />
              <button type='Submit' className="btn bg-[#5BBC2E] text-white hover:bg-white hover:border-2 hover:border-[#5BBC2E] hover:text-[#5BBC2E]">Register</button>
              <button onClick={googleSingUp } className="btn bg-white text-black border-[#e5e5e5] my-2">
                <FcGoogle></FcGoogle> Login with Google
              </button>
              <p className="text-sm font-semibold">Already have an account <Link className="text-[#5BBC2E]" to={'/login'}>Login</Link></p>
            </fieldset>
           </form>
          </div>
        </div>
      </div>
    </div>
    );
};

export default Register;