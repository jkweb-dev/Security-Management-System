import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import { toast } from "react-toastify";
import ErrorScreen from "../Components/Error";

export const AddAttendence1 = () => {

  const navigate = useNavigate()

   const [loading , setLoading] = useState(false)
  const [error , setError] = useState(null)

    const[date , setDate] = useState("")
    const [shift , setShift] = useState("")

    const [tableData , setTableData] = useState([])

    const handleStatusChange = (guardId , value) => {
      const updatedData = tableData.map((guard) => {
        if (guard.guardId === guardId) {
          return {
            ...guard ,
            status : value
          }
        }else {
           return guard;
        }
       
      })

      setTableData(updatedData)
      
    }

    const validateAttendance = () => {
  return tableData.every((guard) => guard.status && guard.status.trim() !== "" && guard.status !== null && guard.status !== undefined);
};

const handleSave = async (e) => {
  e.preventDefault();

  // 1. VALIDATION
  if (!validateAttendance()) {
    toast.error("Please complete attendance for all guards");
    return;
  }

  setLoading(true);

  try {
    const token = localStorage.getItem("token");

    // 2. CLEAN PAYLOAD (ONLY WHAT BACKEND NEEDS)
    const payload = tableData.map((guard) => ({
      id: guard.guardId,
      date,
      shift,
      name : guard.name,
      status: guard.status
    }));

    // 3. API CALL
    await axios.post(
      "http://localhost:5000/attendance/save",
      { data: payload },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    // 4. SUCCESS ACTION
    toast.success("Attendance saved successfully");

    // optional reset
    setTableData([]);

  } catch (error) {

   console.log(error)

    if (error.response?.status === 401) {

      localStorage.removeItem("token");
      navigate("/login");
    } else if (error.response?.status === 500){
     setError("Server error");
    }

  } finally {
    setLoading(false);
  }
};



    const handleLoad = async (e) => {
      
     e.preventDefault()

     if (!date || !shift) {
        toast.error("Please Select Date and Shift")
        return;
    }
setLoading(true)
    try {
      const token = localStorage.getItem("token")

      const guardres = await axios.get("http://localhost:5000/guards" , {
        headers : {
        Authorization : `Bearer ${token}`
        }
      })

     

      const assignmentres = await axios.get(`http://localhost:5000/location/getAssignments?date=${date}&shift=${shift}` , {
        headers : {
          Authorization : `Bearer ${token}`
        }
      })

    

      const allAssignedGuards = []

      assignmentres.data.data.forEach((zone) => {
        zone.assignments.forEach((assignment) => {
          assignment.guards.forEach((guard) => {
             allAssignedGuards.push({
            guardId : guard ,
            location : assignment.location
          })
          })
         
        })
      })

      const assignmentMap = new Map()

      allAssignedGuards.forEach((item) => {
        assignmentMap.set(item.guardId , item.location)
      })

      const finalTableData = guardres.data.map((guard) => {
        const assignedLocation = assignmentMap.get(guard.id);

        return {
          guardId : guard.id ,
          name : guard.name ,
          phone : guard.phone1 ,
          assignment : assignedLocation ? `Assigned (${assignedLocation})`: "Not Assigned",
          status : ""
        }
      })
   
     setTableData(finalTableData)

    } catch (error) {

if (error.response.status === 401) {
  localStorage.removeItem("token")
  navigate("/login")
}else if (error.response.status === 500){
   setError("Something went wrong in Server , Please try again later")
}

    }finally{
              setLoading(false)
            }
    
    }

      if (loading) {
      return <Loader/>
    }

    if (error) {
      return <ErrorScreen error={error}/>;
      
    }
    
    
  return (
  <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 p-4 font-['Inter',sans-serif]">
<form onSubmit={handleLoad}>
      {/* Card */}
      <div className="w-full max-w-4xl rounded-2xl border border-slate-200 
        bg-white/80 backdrop-blur-xl shadow-2xl shadow-indigo-100/60 p-6 md:p-10">

        {/* Header */}
        <h1 className="text-slate-900 text-2xl md:text-3xl font-semibold text-center mb-8 tracking-tight font-['Plus_Jakarta_Sans',sans-serif] bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">
          Attendance Management Panel
        </h1>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Date */}
          <div className="flex flex-col">
            <label className="text-slate-600 text-sm mb-2 font-medium">Select Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50/60 text-slate-900 
              border border-slate-200 outline-none
              focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
            />
          </div>

          {/* Shift */}
          <div className="flex flex-col">
            <label className="text-slate-600 text-sm mb-2 font-medium">Select Shift</label>
            <select
            value={shift}
            onChange={(e) => setShift(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50/60 text-slate-900 
              border border-slate-200 outline-none
              focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
            >
                <option className="text-black" value="">Select Shift</option>
              <option className="text-black" value="day">Day Shift</option>
              <option className="text-black" value="night">Night Shift</option>
            </select>
          </div>

          {/* Load Button */}
          <div className="flex flex-col justify-end">
            <button
            type="submit"
              className="w-full p-3 rounded-xl font-semibold text-white
              bg-gradient-to-r from-indigo-600 to-sky-500
              hover:from-indigo-500 hover:to-sky-400
              hover:scale-105 active:scale-95 transition-all duration-200
              shadow-lg shadow-indigo-200"
            >
              Load Attendance
            </button>
          </div>

        </div>

        {/* Extra UI Hint Section */}
        <div className="mt-8 text-center text-slate-400 text-sm">
          Select date and shift to load guard attendance data
        </div>

      </div>
      </form>

      {
  tableData.length > 0 && (
    <div className="fixed inset-0 z-50 bg-slate-50 overflow-y-auto p-3 sm:p-6 font-['Inter',sans-serif]">

      {/* ================= WRAPPER ================= */}
      <div className="max-w-7xl mx-auto">

        {/* ================= TOP BAR ================= */}
        <div className="mb-5 sm:mb-6 bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* TITLE */}
            <div>
              <h1 className="text-xl sm:text-3xl font-semibold text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
                Attendance Sheet
              </h1>

              <p className="text-slate-500 text-xs sm:text-sm mt-1">
                Manage guards attendance system
              </p>
            </div>

            {/* DATE + SHIFT */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">

              {/* DATE */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-2 sm:px-5 sm:py-3">
                <p className="text-[10px] sm:text-xs text-blue-600 uppercase font-medium">
                  Date
                </p>
                <p className="text-slate-900 font-semibold text-sm sm:text-base">
                  {date}
                </p>
              </div>

              {/* SHIFT */}
              <div className="bg-purple-50 border border-purple-100 rounded-xl px-4 py-2 sm:px-5 sm:py-3">
                <p className="text-[10px] sm:text-xs text-purple-600 uppercase font-medium">
                  Shift
                </p>
                <p className="text-slate-900 font-semibold text-sm sm:text-base capitalize">
                  {shift}
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* ================= TABLE CARD ================= */}
        <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl shadow-sm overflow-hidden">

          {/* ================= SCROLL ================= */}
          <div className="overflow-x-auto">

            <table className="w-full min-w-[900px] text-slate-900">

              {/* ================= HEAD ================= */}
              <thead className="bg-slate-50 border-b border-slate-200">

                <tr>

                  <th className="p-3 sm:p-5 text-left text-xs sm:text-sm text-slate-500 font-medium uppercase tracking-wide">
                    ID
                  </th>

                  <th className="p-3 sm:p-5 text-left text-xs sm:text-sm text-slate-500 font-medium uppercase tracking-wide">
                    Name
                  </th>

                  <th className="p-3 sm:p-5 text-left text-xs sm:text-sm text-slate-500 font-medium uppercase tracking-wide">
                    Phone
                  </th>

                  <th className="p-3 sm:p-5 text-left text-xs sm:text-sm text-slate-500 font-medium uppercase tracking-wide">
                    Assignment
                  </th>

                  <th className="p-3 sm:p-5 text-left text-xs sm:text-sm text-slate-500 font-medium uppercase tracking-wide">
                    Status
                  </th>

                </tr>

              </thead>

              {/* ================= BODY ================= */}
              <tbody>

                {
                  tableData.map((guard) => (
                    <tr
                      key={guard.guardId}
                      className="border-b border-slate-100 hover:bg-slate-50 transition"
                    >

                      {/* ID */}
                      <td className="p-3 sm:p-5 text-xs sm:text-sm text-slate-500">
                        {guard.guardId}
                      </td>

                      {/* NAME */}
                      <td className="p-3 sm:p-5">
                        <div className="flex items-center gap-2 sm:gap-3">

                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 flex items-center justify-center text-xs sm:text-sm font-bold text-white">
                            {guard.name?.charAt(0)}
                          </div>

                          <div>
                            <p className="text-slate-900 text-xs sm:text-sm font-semibold">
                              {guard.name}
                            </p>
                            <p className="text-slate-400 text-[10px] sm:text-xs">
                              Guard
                            </p>
                          </div>

                        </div>
                      </td>

                      {/* PHONE */}
                      <td className="p-3 sm:p-5 text-slate-500 text-xs sm:text-sm">
                        {guard.phone}
                      </td>

                      {/* ASSIGNMENT */}
                      <td className="p-3 sm:p-5">

                        <span
                          className={`px-2 sm:px-4 py-1 sm:py-2 rounded-full text-[10px] sm:text-xs font-semibold ${
                            guard.assignment.startsWith("Assigned")
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-rose-50 text-rose-700 border border-rose-200"
                          }`}
                        >
                          {guard.assignment}
                        </span>

                      </td>

                      {/* STATUS */}
                      <td className="p-3 sm:p-5">

                        <select
                          value={guard.status}
                          onChange={(e) =>
                            handleStatusChange(
                              guard.guardId,
                              e.target.value
                            )
                          }
                          className="w-[130px] sm:w-[170px] bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-2 text-xs sm:text-sm text-slate-900 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                        >

                          <option value="" className="text-black">
                            Status
                          </option>

                          <option value="present" className="text-black">
                            Present
                          </option>

                          <option value="absent" className="text-black">
                            Absent
                          </option>

                          <option value="leave" className="text-black">
                            Leave
                          </option>

                          <option value="out" className="text-black">
                            Out
                          </option>

                        </select>

                      </td>

                    </tr>
                  ))
                }

              </tbody>

            </table>

          </div>

        </div>

        {/* ================= FOOTER ================= */}
        <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">

          <p className="text-slate-500 text-xs sm:text-sm">
            Total Guards: <span className="text-slate-900 font-semibold">{tableData.length}</span>
          </p>

          <button onClick={handleSave} className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-semibold shadow-lg shadow-emerald-200 transition duration-200 hover:-translate-y-0.5 active:translate-y-0">
            Save Attendance
          </button>

        </div>

      </div>

    </div>
  )
}
    </div>
  );
};

