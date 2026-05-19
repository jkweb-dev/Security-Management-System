import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Loader from "../Components/Loader"
import ErrorScreen from "../Components/Error"

export const FineManagement = () => {

    const navigate = useNavigate()
    const [loading , setLoading] = useState(false)
     const [error , setError] = useState(null)

     const [guards , setGuards] = useState([])
       const [fines, setFines] = useState([])

       const [formData , setFormData] = useState({
        id : "" ,
        name : "",
        date : "",
        shift : "",
        violationType : "",
        amount : "",
        description : ""
       })

       const handleSaveFine = async (e) => {
        e.preventDefault()
        if (!formData.id || !formData.name || !formData.date || !formData.shift || !formData.violationType || !formData.amount || !formData.description) {
          alert("Please Fill All Fields")
          return;
        }

        try {
          setLoading(true)

          const token = localStorage.getItem("token")

          const res = await axios.post("http://localhost:5000/fine/addFineOrUpdate" ,
            formData ,
            {
              headers : {
                Authorization : `Bearer ${token}`
              }
            }
          )

          alert("Fined Saved Successfully !")

       const resp = await axios.get("http://localhost:5000/fine/getFines" , {
                        headers : {
                            Authorization :`Bearer ${token}`
                        }
                    })

                    setFines(resp.data.data)

                    setFormData({
                        id : "" ,
        name : "",
        date : "",
        shift : "",
        violationType : "",
        amount : "",
        description : ""
                    })

        } catch (error) {
          
          if (error.response?.status === 401) {
            localStorage.removeItem("token")
            navigate("/login")
          } else if (error.response?.status === 400) {
            alert("Fill All Fields")
          } else if (error.response?.status === 500) {
            setError("Internal Server Issue")
          } else if (error.response?.status === 404) {
            alert("Fine already exist for that id ,shift and date")
          }

        } finally{
          setLoading(false)
        }
       }


       useEffect(() => {
        const fetchData = async () => {
            setLoading(true)

            try {
                const token = localStorage.getItem("token")

                const [guardsRes , finesRes] = await Promise.all([

                    axios.get("http://localhost:5000/guards" , {
          headers: {
            Authorization: `Bearer ${token}`
          }
                    }),

                      axios.get("http://localhost:5000/fine/getFines" , {
                        headers : {
                            Authorization :`Bearer ${token}`
                        }
                    }),
                ])

                setGuards(guardsRes.data)
            
                 setFines(finesRes.data.data)

            } catch (error) {

                if (error.response?.status === 401) {
                    localStorage.removeItem("token")
                    navigate("/login")
                }else if (error.response?.status === 500) {
                    setError("Internal Server Error")
                }

            } finally {
                setLoading(false)
            }

        }
        fetchData()
       } , [])

       const handleDelete = async (id) => {
        try {
          setLoading(true)
          const token = localStorage.getItem("token")

        const res =   await axios.delete(`http://localhost:5000/fine/deleteFine/${id}` , {
            headers : {
                  Authorization :`Bearer ${token}`
            }
          })

          setFines((p) => p.filter((fine) => fine._id !== id))

          alert("Deleted Successfully")

        } catch (error) {
          
          console.log(error)
          
                if (error.response?.status === 401) {
                    localStorage.removeItem("token")
                    navigate("/login")
                }else if (error.response?.status === 500) {
                    setError("Internal Server Error")
                } else if (error.response?.status === 404) {
                    setError("Fine Not Found")
                }
        } finally {
          setLoading(false)
        }

       }

       if (loading) {
        return <Loader/>
       }

       if (error) {
        return <ErrorScreen error={error}/>
       }

return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-4 md:p-8">

      <div className="max-w-6xl mx-auto">

        {/* ================= FORM SECTION ================= */}
        <div className="backdrop-blur-xl bg-white/40 border border-white/60 shadow-xl rounded-2xl p-6 md:p-10 mb-8">

          <h1 className="text-2xl md:text-3xl font-bold text-slate-700 mb-6 text-center">
            Fine Management System
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* Guard Dropdown */}
            <select
              className="p-3 rounded-xl bg-white/60 border border-white/70 outline-none focus:ring-2 focus:ring-indigo-300"
              value={formData.id}
              onChange={(e) => {
                const selectedId = e.target.value
                const selectedGuard = guards.find((g) => g.id === selectedId)
                setFormData({
                  ...formData,
                  id: selectedGuard.id,
                  name: selectedGuard.name,
                });
              }}
            >
              <option value="">Select Guard</option>
              {guards.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.id} | {g.name}
                </option>
              ))}
            </select>

            {/* Date */}
            <input
              type="date"
              className="p-3 rounded-xl bg-white/60 border border-white/70 outline-none focus:ring-2 focus:ring-indigo-300"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />

            {/* Shift */}
            <select
              className="p-3 rounded-xl bg-white/60 border border-white/70 outline-none focus:ring-2 focus:ring-indigo-300"
              value={formData.shift}
              onChange={(e) =>
                setFormData({ ...formData, shift: e.target.value })
              }
            >
              <option value="">Select Shift</option>
              <option value="day">Day</option>
              <option value="night">Night</option>
            </select>

            {/* Violation */}
            <select
              className="p-3 rounded-xl bg-white/60 border border-white/70 outline-none focus:ring-2 focus:ring-indigo-300"
              value={formData.violationType}
              onChange={(e) =>
                setFormData({ ...formData, violationType: e.target.value })
              }
            >
              <option value="">Violation Type</option>
              <option value="Sleeping">Sleeping</option>
              <option value="Late Arrival">Late Arrival</option>
              <option value="Phone Usage">Phone Usage</option>
              <option value="Leaving Duty Post">Leaving Duty Post</option>
              <option value="Uniform Issue">Uniform Issue</option>
              <option value="Misconduct">Misconduct</option>
              <option value="Other">Other</option>
            </select>

            {/* Amount */}
            <input
              type="number"
              placeholder="Fine Amount"
              className="p-3 rounded-xl bg-white/60 border border-white/70 outline-none focus:ring-2 focus:ring-indigo-300"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
            />

            {/* Description */}
            <input
              type="text"
              placeholder="Description"
              className="p-3 rounded-xl bg-white/60 border border-white/70 outline-none focus:ring-2 focus:ring-indigo-300"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          {/* SAVE BUTTON */}
          <div className="mt-6 flex justify-end">
            <button type="submit" onClick={handleSaveFine} className="px-6 py-3 rounded-xl bg-indigo-500 text-white font-semibold shadow-lg hover:bg-indigo-600 transition">
              Save Fine
            </button>
          </div>

        </div>

        {/* ================= TABLE SECTION ================= */}
        <div className="backdrop-blur-xl bg-white/40 border border-white/60 shadow-xl rounded-2xl overflow-hidden">

          <div className="p-4 border-b border-white/60">
            <h2 className="text-xl font-semibold text-slate-700">
              All Fines Records
            </h2>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-sm text-slate-700">

              <thead className="bg-white/50">
                <tr>
                  <th className="p-3 text-left">Guard</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Shift</th>
                  <th className="p-3 text-left">Violation</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Description</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {fines.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-10 text-slate-500">
                      🚫 No fines recorded right now
                    </td>
                  </tr>
                ) : (
                  fines.map((fine, index) => (
                    <tr
                      key={index}
                      className="border-t border-white/40 hover:bg-white/30 transition"
                    >
                      <td className="p-3 font-medium">
                        {fine.id} | {fine.name}
                      </td>

                      <td className="p-3">{fine.date}</td>

                      <td className="p-3 capitalize">{fine.shift}</td>

                      <td className="p-3">{fine.violationType}</td>

                      <td className="p-3 text-red-600 font-semibold">
                        {fine.amount}
                      </td>

                      <td className="p-3">{fine.description}</td>

                      <td className="p-3 flex gap-2">
                        <button className="px-3 py-1 text-xs bg-blue-500 text-white rounded-lg">
                          Edit
                        </button>

                        <button onClick={() => handleDelete(fine._id)} className="px-3 py-1 text-xs bg-red-500 text-white rounded-lg">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>

          </div>

        </div>

      </div>
    </div>
  );
}