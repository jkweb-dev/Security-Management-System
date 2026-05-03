import { useState } from "react";
import { useEffect } from "react";
import Loader from "../Components/Loader";
import ErrorScreen from "../Components/Error";
import axios from "axios"
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
const navigate = useNavigate()

  const [loading , setLoading] = useState(true)
  const [error , setError] = useState(null)
  
   useEffect(() => {
        
        const verifyToken = async () => {
            try {
                const token = localStorage.getItem("token")

                const res = await axios.get("http://localhost:5000/dashboard" ,{
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                })
               
               
            } catch (error) {
                console.log(error.response?.status)
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem("token")
                    navigate("/login")
                }else if (error.response.status === 500){
                   setError("Something went wrong in Server , Please try again later")
                }
            }finally{
              setLoading(false)
            }
        }
        verifyToken()
    }, [])


    if (loading) {
      return <Loader/>
    }

    if (error) {
      return <ErrorScreen error={error}/>;
      
    }
    
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-indigo-900 text-white p-4 sm:p-6 md:p-10 flex flex-col justify-center items-center">

  <div>   
      <div className="text-center mb-10 md:mb-14">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
          Supervisor Dashboard
        </h1>
        <p className="text-gray-400 mt-3 text-sm sm:text-base md:text-lg">
          Manage all security operations in one place
        </p>
      </div>
</div>
      {/* GRID CARDS */}

      <div>
      <div className="
        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
        gap-5 sm:gap-6 md:gap-8 
      ">

        {/* Attendance */}
        <div className="group relative p-6 sm:p-7 md:p-8 rounded-2xl md:rounded-3xl
                        bg-white/5 border border-white/20 backdrop-blur-lg
                        transition duration-300
                        hover:scale-105 hover:border-blue-400
                        hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]">

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
            Attendance
          </h2>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Track daily guard attendance
          </p>
        </div>

        {/* Location */}
        <div className="group relative p-6 sm:p-7 md:p-8 rounded-2xl md:rounded-3xl
                        bg-white/5 border border-white/20 backdrop-blur-lg
                        transition duration-300
                        hover:scale-105 hover:border-purple-400
                        hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]">

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
            Location
          </h2>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Assign and manage locations
          </p>
        </div>

        {/* All Guards */}
        <div className="group relative p-6 sm:p-7 md:p-8 rounded-2xl md:rounded-3xl
                        bg-white/5 border border-white/20 backdrop-blur-lg
                        transition duration-300
                        hover:scale-105 hover:border-green-400
                        hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]">

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
            All Guards
          </h2>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            View all registered guards
          </p>
        </div>

        {/* Add Guards */}
        <div onClick={() => {navigate("/guards")}} className="group relative p-6 sm:p-7 md:p-8 rounded-2xl md:rounded-3xl
                        bg-white/5 border border-white/20 backdrop-blur-lg
                        transition duration-300
                        hover:scale-105 hover:border-yellow-400
                        hover:shadow-[0_0_30px_rgba(250,204,21,0.4)]">

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
            Add Guards
          </h2>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Register new security staff
          </p>
        </div>

        {/* Fine Management */}
        <div className="group relative p-6 sm:p-7 md:p-8 rounded-2xl md:rounded-3xl
                        bg-white/5 border border-white/20 backdrop-blur-lg
                        transition duration-300
                        hover:scale-105 hover:border-red-400
                        hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]">

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
            Fine Management
          </h2>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Manage penalties & fines
          </p>
        </div>

      </div>
      </div>
    </div>
  );
};

 