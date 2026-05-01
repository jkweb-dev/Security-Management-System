import { useState } from "react";
import axios from "axios"
import validate from "../Components/LoginFormValidation";

export const LoginPage = () => {
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


  } catch (error) {
    console.log(error)

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
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-purple-900 to-indigo-900 text-white overflow-hidden">

      {/* Glow */}
      <div className="absolute w-[300px] sm:w-[350px] md:w-[450px] lg:w-[500px] h-[300px] sm:h-[350px] md:h-[450px] lg:h-[500px] bg-purple-500/20 blur-3xl rounded-full top-[-120px] left-[-120px]"></div>

      <div className="absolute w-[300px] sm:w-[350px] md:w-[450px] lg:w-[500px] h-[300px] sm:h-[350px] md:h-[450px] lg:h-[500px] bg-blue-500/20 blur-3xl rounded-full bottom-[-120px] right-[-120px]"></div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="
        relative z-10 w-full 
        px-4 sm:px-6 md:px-0

        max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl
      ">

        {/* Card */}
        <div className="
          backdrop-blur-xl bg-white/5 border border-white/20 shadow-2xl

          rounded-2xl sm:rounded-3xl

          p-6 sm:p-8 md:p-10 lg:p-12
        ">

          {/* Title */}
          <h1 className="
            text-center font-bold

            text-2xl sm:text-3xl md:text-4xl lg:text-5xl
          ">
            Welcome Back
          </h1>

          <p className="
            text-center text-gray-400 mt-2

            text-sm sm:text-base md:text-lg lg:text-xl
          ">
            Login to continue to your dashboard
          </p>

          {/* Email */}
          <div className="mt-6 sm:mt-8">
            <label className="block text-gray-300 mb-2 text-sm sm:text-base md:text-lg" htmlFor="email">
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

                bg-white/5 border border-white/20
                focus:border-purple-400 outline-none

                text-sm sm:text-base md:text-lg text-white
                placeholder-gray-400

                transition
              "
            />
            
          {error.email && (
            <p className="text-red-400 font-bold text-center">{error.email}</p>
          )}
          </div>

         

          {/* Password */}
          <div className="mt-5 sm:mt-6">
            <label className="block text-gray-300 mb-2 text-sm sm:text-base md:text-lg" htmlFor="password">
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

                bg-white/5 border border-white/20
                focus:border-purple-400 outline-none

                text-sm sm:text-base md:text-lg text-white
                placeholder-gray-400

                transition
              "
            />
             {error.password && (
            <p className="text-red-400 font-bold text-center">{error.password}</p>
          )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="
              w-full mt-7 sm:mt-8

              py-3 sm:py-4 md:py-5

              text-base sm:text-lg md:text-xl lg:text-2xl
              font-semibold

              rounded-xl sm:rounded-2xl

              bg-gradient-to-r from-purple-600 to-indigo-600
              hover:from-purple-500 hover:to-indigo-500

              shadow-lg hover:shadow-purple-500/30

              transition duration-300
              mb-5
            "
          >
            Login
          </button>

  {error.general && (
          <p className="text-red-400 font-bold text-center">{error.general}</p>
        )}

        </div>
      </form>
    </div>
  );
};



