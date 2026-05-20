import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import Loader from "../Components/Loader"
import ErrorScreen from "../Components/Error"

export const AssignLocation1 = () => {
     
  const navigate = useNavigate()

  const zones = ["Chakri Road" , "Down Town" , "Bagra Zone 4" , "Dedhar Zone 5"]

    const [date, setDate] = useState("")
const [shift, setShift] = useState("")

const [assignedZones, setAssignedZones] = useState([])

const [loading, setLoading] = useState(false)
  const [error , setError] = useState(null)

const [showZones, setShowZones] = useState(false)

const handleLoad = async (e) => {

    e.preventDefault()

    if (!date || !shift) {
       toast.error("Please Select Date and Shift")
        return;
    }

    try {
       const token = localStorage.getItem("token")
        setLoading(true)

        const res = await axios.get(`http://localhost:5000/location/getAssignments?date=${date}&shift=${shift}` ,
          {
            headers : {
              Authorization : `Bearer ${token}`
            }
          }
        )
        console.log(res.data.data)
        setAssignedZones(res.data.data)
    
        setShowZones(true)
    } catch (error) {
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
const lockedZones = assignedZones.map((item) => item.zone)

const openZone = (zone) => {
  navigate(`/assignLocation2?zone=${zone}&date=${date}&shift=${shift}`)
}

if (loading) {
    return <Loader/>
}

if (error) {
            return <ErrorScreen error = {error}/>
        }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center px-3 sm:px-4 md:px-6 py-6">

   {!showZones && (
     <form onSubmit={handleLoad}>
      <div className="
        relative
        w-full
        max-w-sm
        sm:max-w-md
        md:max-w-xl
        lg:max-w-2xl
        bg-white/5
        backdrop-blur-2xl
        border border-white/10
        rounded-[28px] sm:rounded-[32px]
        shadow-2xl
        p-5 sm:p-7 md:p-10
        overflow-hidden
      ">

        {/* Background Glow */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full"></div>

        {/* Heading */}
        <div className="text-center mb-8 md:mb-10 relative z-10">

          {/* Icon */}
          <div className="
            w-16 h-16
            sm:w-20 sm:h-20
            mx-auto
            rounded-3xl
            bg-blue-500/10
            border border-blue-500/20
            flex items-center justify-center
            text-3xl sm:text-4xl
            mb-4 sm:mb-5
            shadow-lg
          ">
            📍
          </div>

          {/* Title */}
          <h1 className="
            text-2xl
            sm:text-3xl
            md:text-5xl
            font-bold
            text-white
            tracking-tight
          ">
            Assign Guards
          </h1>

          {/* Subtitle */}
          <p className="
            text-slate-400
            mt-3 sm:mt-4
            text-sm sm:text-base
            leading-relaxed
            max-w-md
            mx-auto
            px-2
          ">
            Select date and shift to manage guard assignments
            across all security zones.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-5 sm:space-y-6 relative z-10">

          {/* Date */}
          <div>
            <label className="block text-slate-300 mb-2 sm:mb-3 text-sm font-medium">
              Select Date
            </label>
<input
  type="date"
  value={date}
  onChange={(e) => setDate(e.target.value)}
  className="
    w-full
    bg-slate-900/80
    border border-slate-700
    focus:border-blue-500
    focus:ring-4 focus:ring-blue-500/20
    transition-all duration-300
    rounded-2xl
    px-4 sm:px-5
    py-3 sm:py-4
    text-sm sm:text-base
    text-white
    outline-none

    [&::-webkit-calendar-picker-indicator]:invert
    [&::-webkit-calendar-picker-indicator]:cursor-pointer
  "
/>
          </div>

          {/* Shift */}
          <div>
            <label className="block text-slate-300 mb-2 sm:mb-3 text-sm font-medium">
              Select Shift
            </label>

            <select
            value={shift}
            onChange={(e) => setShift(e.target.value)}
              className="
                w-full
                bg-slate-900/80
                border border-slate-700
                focus:border-blue-500
                focus:ring-4 focus:ring-blue-500/20
                transition-all duration-300
                rounded-2xl
                px-4 sm:px-5
                py-3 sm:py-4
                text-sm sm:text-base
                text-white
                outline-none
              "
            >
                 <option value="">Select Shift</option>
              <option value="day">Day Shift</option>
              <option value="night">Night Shift</option>
            </select>
          </div>

          {/* Button */}
          <button
          type="submit"
            className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              active:scale-[0.99]
              transition-all duration-300
              rounded-2xl
              py-3 sm:py-4
              text-white
              font-semibold
              text-base sm:text-lg
              shadow-xl
              hover:shadow-blue-500/30
            "
          >
            Load Assignments
          </button>

        </div>

        {/* Footer */}
        <div className="mt-6 sm:mt-8 text-center relative z-10">
          <p className="text-slate-500 text-xs sm:text-sm">
            Security Management System
          </p>
        </div>

      </div>
      </form>
   )}

      {showZones && (
  <div className="px-3 sm:px-4 md:px-10 py-6">

    {/* Header */}
    <div className="text-center mb-8">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
        Zone Assignment Dashboard
      </h2>

      <p className="text-gray-400 mt-2 text-sm sm:text-base">
        Select a zone to assign guards
      </p>
    </div>

    {/* Grid */}
    <div className="
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3
      gap-4 sm:gap-6
    ">

      {zones.map((zone, i) => {
        const isLocked = lockedZones.includes(zone)

        return (
          <div
            key={i}
            onClick={() => !isLocked && openZone(zone)}
            className={`
              rounded-2xl
              p-4 sm:p-5 md:p-6
              border
              transition-all duration-300

              ${isLocked
                ? "bg-red-500/10 border-red-500/30 opacity-60 cursor-not-allowed"
                : "bg-green-500/10 border-green-500/30 hover:scale-[1.03] cursor-pointer"
              }
            `}
          >

            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white">
              {zone}
            </h3>

            <p className="text-xs sm:text-sm text-gray-300 mt-2">
              {isLocked ? "🔒 Already Assigned" : "🟢 Available"}
            </p>

          </div>
        )
      })}

    </div>

    {/* Back Button */}
    <div className="text-center mt-8 sm:mt-10">
      <button
        onClick={() => setShowZones(false)}
        className="
          px-5 sm:px-6 py-2 sm:py-3
          bg-gray-700 hover:bg-gray-600
          rounded-xl text-white
          text-sm sm:text-base
        "
      >
        Back
      </button>
    </div>

  </div>
)}
    </div>
  )
}