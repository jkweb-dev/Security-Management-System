import { useState } from "react";
import { useEffect } from "react";
import Loader from "../Components/Loader";
import ErrorScreen from "../Components/Error";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { Clock, MapPin, Users, UserPlus, ShieldAlert, ArrowRight } from "lucide-react";
import Footer from "../Components/footer";

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
                }else if (error.response?.status === 500){
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
   <>

 <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 text-slate-900 p-4 sm:p-6 md:p-10 flex flex-col justify-center items-center font-['Inter',sans-serif]">

  <div>   
      <div className="text-center mb-10 md:mb-14">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight font-['Plus_Jakarta_Sans',sans-serif] bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">
          Supervisor Dashboard
        </h1>
        <p className="text-slate-500 mt-3 text-sm sm:text-base md:text-lg">
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
        <div onClick={() => {navigate("/addAttendence1")}} className="group relative p-6 sm:p-7 md:p-8 rounded-2xl md:rounded-3xl
                        bg-white border border-slate-200 shadow-sm
                        transition duration-300 cursor-pointer
                        hover:-translate-y-1.5 hover:border-blue-300
                        hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.35)]">

          <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-blue-50 text-blue-600 transition duration-300 group-hover:bg-blue-600 group-hover:text-white">
            <Clock size={24} strokeWidth={2} />
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mt-5 font-['Plus_Jakarta_Sans',sans-serif]">
            Attendance
          </h2>
          <p className="text-slate-500 mt-2 text-sm sm:text-base">
            Track daily guard attendance
          </p>

          <div className="flex items-center gap-1.5 mt-4 text-sm font-medium text-blue-600 opacity-0 -translate-x-1 transition duration-300 group-hover:opacity-100 group-hover:translate-x-0">
            Open <ArrowRight size={15} strokeWidth={2} />
          </div>
        </div>

        {/* Location */}
        <div onClick={() => {navigate("/assignLocation1")}} className="group relative p-6 sm:p-7 md:p-8 rounded-2xl md:rounded-3xl
                        bg-white border border-slate-200 shadow-sm
                        transition duration-300 cursor-pointer
                        hover:-translate-y-1.5 hover:border-purple-300
                        hover:shadow-[0_20px_40px_-15px_rgba(168,85,247,0.35)]">

          <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-purple-50 text-purple-600 transition duration-300 group-hover:bg-purple-600 group-hover:text-white">
            <MapPin size={24} strokeWidth={2} />
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mt-5 font-['Plus_Jakarta_Sans',sans-serif]">
            Location
          </h2>
          <p className="text-slate-500 mt-2 text-sm sm:text-base">
            Assign and manage locations
          </p>

          <div className="flex items-center gap-1.5 mt-4 text-sm font-medium text-purple-600 opacity-0 -translate-x-1 transition duration-300 group-hover:opacity-100 group-hover:translate-x-0">
            Open <ArrowRight size={15} strokeWidth={2} />
          </div>
        </div>

        {/* All Guards */}
        <div onClick={() => {navigate("/guards")}} className="group relative p-6 sm:p-7 md:p-8 rounded-2xl md:rounded-3xl
                        bg-white border border-slate-200 shadow-sm
                        transition duration-300 cursor-pointer
                        hover:-translate-y-1.5 hover:border-emerald-300
                        hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.35)]">

          <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-emerald-50 text-emerald-600 transition duration-300 group-hover:bg-emerald-600 group-hover:text-white">
            <Users size={24} strokeWidth={2} />
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mt-5 font-['Plus_Jakarta_Sans',sans-serif]">
            All Guards
          </h2>
          <p className="text-slate-500 mt-2 text-sm sm:text-base">
            View all registered guards
          </p>

          <div className="flex items-center gap-1.5 mt-4 text-sm font-medium text-emerald-600 opacity-0 -translate-x-1 transition duration-300 group-hover:opacity-100 group-hover:translate-x-0">
            Open <ArrowRight size={15} strokeWidth={2} />
          </div>
        </div>

        {/* Add Guards */}
        <div onClick={() => {navigate("/Addguard")}} className="group relative p-6 sm:p-7 md:p-8 rounded-2xl md:rounded-3xl
                        bg-white border border-slate-200 shadow-sm
                        transition duration-300 cursor-pointer
                        hover:-translate-y-1.5 hover:border-amber-300
                        hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.35)]">

          <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-amber-50 text-amber-600 transition duration-300 group-hover:bg-amber-500 group-hover:text-white">
            <UserPlus size={24} strokeWidth={2} />
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mt-5 font-['Plus_Jakarta_Sans',sans-serif]">
            Add Guards
          </h2>
          <p className="text-slate-500 mt-2 text-sm sm:text-base">
            Register new security staff
          </p>

          <div className="flex items-center gap-1.5 mt-4 text-sm font-medium text-amber-600 opacity-0 -translate-x-1 transition duration-300 group-hover:opacity-100 group-hover:translate-x-0">
            Open <ArrowRight size={15} strokeWidth={2} />
          </div>
        </div>

        {/* Fine Management */}
        <div onClick={() => {navigate("/fine-management")}} className="group relative p-6 sm:p-7 md:p-8 rounded-2xl md:rounded-3xl
                        bg-white border border-slate-200 shadow-sm
                        transition duration-300 cursor-pointer
                        hover:-translate-y-1.5 hover:border-rose-300
                        hover:shadow-[0_20px_40px_-15px_rgba(244,63,94,0.35)]">

          <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-rose-50 text-rose-600 transition duration-300 group-hover:bg-rose-600 group-hover:text-white">
            <ShieldAlert size={24} strokeWidth={2} />
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mt-5 font-['Plus_Jakarta_Sans',sans-serif]">
            Fine Management
          </h2>
          <p className="text-slate-500 mt-2 text-sm sm:text-base">
            Manage penalties & fines
          </p>

          <div className="flex items-center gap-1.5 mt-4 text-sm font-medium text-rose-600 opacity-0 -translate-x-1 transition duration-300 group-hover:opacity-100 group-hover:translate-x-0">
            Open <ArrowRight size={15} strokeWidth={2} />
          </div>
        </div>

      </div>
      </div>
    </div>

    <Footer/>

    </>
  );
};

 