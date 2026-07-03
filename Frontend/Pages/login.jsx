import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios"
import validate from "../Components/LoginFormValidation";
import Footer from "../Components/footer";


export const LoginPage = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token");

 
     if (token) {
   <Navigate to="/dashboard" replace />
  }
  
  const [loginForm , setLoginForm] = useState({
  email : "",
    password : ""
   })

   const [error , setError] = useState({})

  const handleChange = (e) => {
    setLoginForm({...loginForm , [e.target.name] : e.target.value})

    setError({})
  }

 const handleSubmit = async (e) => {
  e.preventDefault();

  const errors = validate(loginForm);

  if (Object.keys(errors).length > 0) {
    setError(errors);
    setLoginForm({
      email : "",
      password : ""
    })
    return; 
  }


  try {
    

    const res = await axios.post("http://localhost:5000/login" , loginForm)

    localStorage.setItem("token" , res.data.token)
     navigate("/dashboard")


  } catch (error) {
  

    if (error.response) {
      setError({
       general : error.response.data.message
      })

    }else {
       setError({
        general :"Network Error"
      })
    }


  }
 
 
  
  setLoginForm({
    email : "",
    password : ""
  })

 
};
  return (
    <>
    <div className="relative min-h-screen flex  items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 text-slate-900 overflow-hidden font-['Inter',sans-serif]">

      {/* Glow */}
      <div className="absolute w-[300px] sm:w-[350px] md:w-[450px] lg:w-[500px] h-[300px] sm:h-[350px] md:h-[450px] lg:h-[500px] bg-indigo-200/50 blur-3xl rounded-full top-[-120px] left-[-120px]"></div>

      <div className="absolute w-[300px] sm:w-[350px] md:w-[450px] lg:w-[500px] h-[300px] sm:h-[350px] md:h-[450px] lg:h-[500px] bg-sky-200/50 blur-3xl rounded-full bottom-[-120px] right-[-120px]"></div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="
        relative z-10 w-full 
        px-4 sm:px-6 md:px-0

        max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl
      ">

        {/* Card */}
        <div className="
          backdrop-blur-xl bg-white/80 border border-slate-200 shadow-2xl shadow-indigo-100/60

          rounded-2xl sm:rounded-3xl

          p-6 sm:p-8 md:p-10 lg:p-12
        ">

          {/* Title */}
          <h1 className="
            text-center font-semibold tracking-tight font-['Plus_Jakarta_Sans',sans-serif]
            bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent

            text-2xl sm:text-3xl md:text-4xl lg:text-5xl
          ">
            Welcome Back
          </h1>

          <p className="
            text-center text-slate-500 mt-2

            text-sm sm:text-base md:text-lg lg:text-xl
          ">
            Login to continue to your dashboard
          </p>

          {/* Email */}
          <div className="mt-6 sm:mt-8">
            <label className="block text-slate-600 mb-2 text-sm sm:text-base md:text-lg font-medium" htmlFor="email">
              Email Address
            </label>
            <input
            name="email"
            id="email"
            value={loginForm.email}
              type="email"
              placeholder="Enter your email"
              onChange={handleChange}
              className="
                w-full
                px-4 sm:px-5 md:px-6
                py-3 sm:py-3.5 md:py-4

                rounded-xl

                bg-slate-50/60 border border-slate-200
                focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none

                text-sm sm:text-base md:text-lg text-slate-900
                placeholder-slate-400

                transition
              "
            />
            
          {error.email && (
            <p className="text-red-500 font-semibold text-center mt-2 text-sm">{error.email}</p>
          )}
          </div>

         

          {/* Password */}
          <div className="mt-5 sm:mt-6">
            <label className="block text-slate-600 mb-2 text-sm sm:text-base md:text-lg font-medium" htmlFor="password">
              Password
            </label>
            <input
            name="password"
            id="password"

            value={loginForm.password}
            onChange={handleChange}

              type="password"
              placeholder="Enter your password"
              className="
                w-full
                px-4 sm:px-5 md:px-6
                py-3 sm:py-3.5 md:py-4

                rounded-xl

                bg-slate-50/60 border border-slate-200
                focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none

                text-sm sm:text-base md:text-lg text-slate-900
                placeholder-slate-400

                transition
              "
            />
             {error.password && (
            <p className="text-red-500 font-semibold text-center mt-2 text-sm">{error.password}</p>
          )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="
              w-full mt-7 sm:mt-8

              py-3 sm:py-4 md:py-5

              text-base sm:text-lg md:text-xl lg:text-2xl
              font-semibold text-white
              font-['Plus_Jakarta_Sans',sans-serif]

              rounded-xl sm:rounded-2xl

              bg-gradient-to-r from-indigo-600 to-sky-500
              hover:from-indigo-500 hover:to-sky-400

              shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-200 hover:-translate-y-0.5 active:translate-y-0

              transition duration-300
              mb-5
            "
          >
            Login
          </button>

  {error.general && (
          <p className="text-red-500 font-semibold text-center text-sm">{error.general}</p>
        )}

        </div>
      </form>
    </div>

     <Footer/>
     </>
  );
};



