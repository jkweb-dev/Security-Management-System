import { useEffect } from "react"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import {toast } from "react-toastify"
import Loader from "../Components/Loader"
import axios from "axios"
import ErrorScreen from "../Components/Error"
import { useNavigate } from "react-router-dom"

export const AssignLocation2 = () => {

    const navigate = useNavigate()

    const location = useLocation()
    const query = new URLSearchParams(location.search)

    const zone = query.get("zone")
      const date = query.get("date")
        const shift = query.get("shift")

        const [assignments , setAssignments] = useState([])
        const [selectedGuards , setSelectedGuards] = useState({})
        const [locations , setLocations] = useState([])       
        const [guards , setGuards] = useState([])
        const[loading , setLoading] = useState(false)
        const [error , setError] = useState(null)

        const fetchData = async () => {
            try {

                setLoading(true)
                const token = localStorage.getItem("token")

                const locRes = await axios.get(`http://localhost:5000/location/getLocations?zone=${zone}` , {
                    headers : {
                           Authorization : `Bearer ${token}`
                    }
                })

                  const guardRes = await axios.get("http://localhost:5000/guards" , {
                    headers : {
                           Authorization : `Bearer ${token}`
                    }
                })

                setLocations(locRes.data)
                setGuards(guardRes.data)
               
                setAssignments(
                    locRes.data.map((loc) => ({
                        locationName : loc.name,
                        assignedGuards : []
                    }))
                )
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem("token")
                    navigate("/login")
                }else if (error.response.status === 500){
                   setError("Something went wrong in Server , Please try again later")
                } else if (error.response.status === 404) {
                    setError("Zone Or Guard Not Found")
                }
            } finally{
                setLoading(false)
            }
        }

        useEffect(() => {
            fetchData()
        } ,[])

      const addGuard = (locationIndex) => {

  const selectedGuardId = selectedGuards[locationIndex]

  if (!selectedGuardId) {
    return toast.error("Select Guard First")
  }

  const fullGuard = guards.find(
    (g) => g.id === selectedGuardId
  )

  const updated = [...assignments]

  // Prevent duplicate guard

  const alreadyExists =
    updated[locationIndex].assignedGuards.some(
      (g) => g.id === selectedGuardId
    )

  if (alreadyExists) {
    return toast.error("Guard already assigned")
  }

  updated[locationIndex].assignedGuards.push({
    id: fullGuard.id,
    name: fullGuard.name
  })

  setAssignments(updated)

  // Reset dropdown

  setSelectedGuards({
    ...selectedGuards,
    [locationIndex]: ""
  })
}

const removeGuard = (locationIndex, guardId) => {

  const updated = [...assignments]

  updated[locationIndex].assignedGuards =
    updated[locationIndex].assignedGuards.filter(
      (g) => g.id !== guardId
    )

  setAssignments(updated)
}

const handleSave = async () => {
  try {
    const token = localStorage.getItem("token")

    const payLoad = {
      date,
      shift,
      zone,
      assignments : assignments.map((item) => ({
        location : item.locationName,
        guards :item.assignedGuards.map(
          (g) => g.id
        )
      })),
      locked : true
    }

    const res = await axios.post("http://localhost:5000/location/assignLocation" , payLoad ,
      {
        headers : {
          Authorization : `Bearer ${token}`
        }
      }
    )
  toast.success("Assignment Saved Successfully")
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.removeItem("token")
      navigate("/login")
    }else if (error.response.status === 400) {
      setError("Already Assigned for this zone, date and shift")
    }else if (error.response.status === 500) {
      setError("Internal Server Error")
    }
  }
}

        
        if (loading) {
            return <Loader/>
        }

        if (error) {
            return <ErrorScreen error = {error}/>
        }

    return (
    <>
   <div className="
  w-full
  bg-slate-900/90
  backdrop-blur-2xl
  border border-slate-700
  rounded-3xl
  px-5 py-4
  mb-6
  flex
  flex-col lg:flex-row
  lg:items-center
  lg:justify-between
  gap-4
  shadow-2xl
">

  {/* LEFT SIDE */}
  <div>
    <h1 className="text-white text-xl md:text-2xl font-bold">
      Zone Assignment Dashboard
    </h1>

    <p className="text-slate-400 text-sm mt-1">
      Manage guards efficiently for selected zone
    </p>
  </div>

  {/* RIGHT SIDE INFO BOXES */}
  <div className="flex flex-wrap gap-3">

    {/* ZONE */}
    <div className="
      bg-slate-800
      border border-slate-700
      rounded-xl
      px-4 py-2
      min-w-[90px]
    ">
      <p className="text-xs text-slate-400">Zone</p>
      <p className="text-white font-semibold">
        {zone}
      </p>
    </div>

    {/* DATE */}
    <div className="
      bg-slate-800
      border border-slate-700
      rounded-xl
      px-4 py-2
      min-w-[110px]
    ">
      <p className="text-xs text-slate-400">Date</p>
      <p className="text-white font-semibold">
        {date}
      </p>
    </div>

    {/* SHIFT */}
    <div className="
      bg-slate-800
      border border-slate-700
      rounded-xl
      px-4 py-2
      min-w-[100px]
    ">
      <p className="text-xs text-slate-400">Shift</p>
      <p className="text-white font-semibold capitalize">
        {shift}
      </p>
    </div>

    {/* TOTAL LOCATIONS */}
    <div className="
      bg-slate-800
      border border-slate-700
      rounded-xl
      px-4 py-2
      min-w-[130px]
    ">
      <p className="text-xs text-slate-400">Locations</p>
      <p className="text-white font-semibold">
        {assignments.length}
      </p>
    </div>

  </div>

</div>
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

  {assignments?.map((item, index) => (

    <div
      key={item.locationName}
      className="
        bg-white/5
        border border-white/10
        rounded-3xl
        p-5
        backdrop-blur-xl
      "
    >

      {/* Location Name */}

      <h2 className="text-xl font-bold text-black mb-4">
        {item?.locationName}
      </h2>

      {/* Dropdown */}

      <select

        value={selectedGuards[index] || ""}

        onChange={(e) =>
          setSelectedGuards({
            ...selectedGuards,
            [index]: e.target.value
          })
        }

        className="
          w-full
          bg-slate-900
          border border-slate-700
          rounded-xl
          px-4 py-3
          text-white
          outline-none
        "
      >

        <option value="">
          Select Guard
        </option>

        {guards?.map((guard) => (

          <option
            key={guard.id}
            value={guard.id}
          >
            {guard.name} - {guard.id}
          </option>

        ))}

      </select>

      {/* Add Button */}

      <button

        onClick={() => addGuard(index)}

        className="
          w-full
          mt-3
          bg-blue-600
          hover:bg-blue-700
          rounded-xl
          py-3
          text-white
          font-semibold
        "
      >
        Add Guard
      </button>

      {/* Assigned Guards */}

      <div className="mt-5 flex flex-wrap gap-3">

        {item?.assignedGuards.map((guard) => (

          <div

            key={guard.id}

            className="
              bg-green-900
              border border-green-500/20
              rounded-2xl
              font-bold
              px-4 py-2
              flex items-center gap-3
              text-white
            "
          >

            <span>
              {guard.name} - {guard.id}
            </span>

            <button

              onClick={() =>
                removeGuard(index, guard.id)
              }

              className="
                bg-red-500/20
                hover:bg-red-500/30
                w-6 h-6
                rounded-full
                text-red-300
              "
            >
              ✕
            </button>

          </div>

        ))}

      </div>

    </div>

  ))}

</div>

<div className="text-center">
<button onClick={handleSave} className="mb-10 rounded-lg w-[50%] hover:bg-green-900 bg-green-800 text-white font-bold px-5 py-3">Save</button>
</div>
</>
  )
    
}