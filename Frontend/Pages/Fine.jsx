import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Loader from "../Components/Loader"
import ErrorScreen from "../Components/Error"
import { toast } from "react-toastify"
import Footer from "../Components/footer"

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

       const [editId , setEditId] = useState(null)

       const handleEdit = (fine) => {
        setFormData({
          id : fine.id ,
          name : fine.name ,
          date : fine.date ,
          shift : fine.shift ,
          violationType : fine.violationType ,
          amount : fine.amount ,
          description : fine.description
        })

        setEditId(fine._id)
       }

       const handleSaveFine = async (e) => {
        e.preventDefault()
        if (!formData.id || !formData.name || !formData.date || !formData.shift || !formData.violationType || !formData.amount || !formData.description) {
         toast.error("Please Fill All Fields")
          return;
        }

        try {
          setLoading(true)

          const token = localStorage.getItem("token")

          if (editId) {
            await axios.put(`http://localhost:5000/fine/updateFine/${editId}` , formData , {
              headers : {
                Authorization : `Bearer ${token}`
              }
            })
toast.success("Updated Successfully")
            setEditId(null)
          }else {

          const res = await axios.post("http://localhost:5000/fine/addFineOrUpdate" ,
            formData ,
            {
              headers : {
                Authorization : `Bearer ${token}`
              }
            }
          )

          toast.success("Fined Saved Successfully !")
          }



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
            toast.errort("Fine already exist for that id ,shift and date")
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

         toast.success("Deleted Successfully")

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
  <>
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-indigo-50 p-4 md:p-8 font-['Inter',sans-serif]">

      <div className="max-w-6xl mx-auto">

        {/* ================= FORM SECTION ================= */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200 shadow-xl shadow-indigo-100/60 rounded-2xl p-6 md:p-10 mb-8">

          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-6 font-['Plus_Jakarta_Sans',sans-serif] bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">
            Fine Management System
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* Guard Dropdown */}
            <select
              className="p-3 rounded-xl bg-slate-50/60 border border-slate-200 outline-none text-slate-900 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
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
              className="p-3 rounded-xl bg-slate-50/60 border border-slate-200 outline-none text-slate-900 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />

            {/* Shift */}
            <select
              className="p-3 rounded-xl bg-slate-50/60 border border-slate-200 outline-none text-slate-900 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
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
              className="p-3 rounded-xl bg-slate-50/60 border border-slate-200 outline-none text-slate-900 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
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
              className="p-3 rounded-xl bg-slate-50/60 border border-slate-200 outline-none text-slate-900 placeholder-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
            />

            {/* Description */}
            <input
              type="text"
              placeholder="Description"
              className="p-3 rounded-xl bg-slate-50/60 border border-slate-200 outline-none text-slate-900 placeholder-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          {/* SAVE BUTTON */}
          <div className="mt-6 flex justify-end">
            <button type="submit" onClick={handleSaveFine} className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-indigo-500 hover:to-sky-400 text-white font-semibold shadow-lg shadow-indigo-200 transition duration-200 hover:-translate-y-0.5 active:translate-y-0">
             {editId ? "Edit Fine" : "Save Fine"}
            </button>
          </div>

        </div>

        {/* ================= TABLE SECTION ================= */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200 shadow-xl shadow-indigo-100/60 rounded-2xl overflow-hidden">

          <div className="p-4 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
              All Fines Records
            </h2>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-sm text-slate-700">

              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="p-3 text-left text-xs text-slate-500 font-medium uppercase tracking-wide">Guard</th>
                  <th className="p-3 text-left text-xs text-slate-500 font-medium uppercase tracking-wide">Date</th>
                  <th className="p-3 text-left text-xs text-slate-500 font-medium uppercase tracking-wide">Shift</th>
                  <th className="p-3 text-left text-xs text-slate-500 font-medium uppercase tracking-wide">Violation</th>
                  <th className="p-3 text-left text-xs text-slate-500 font-medium uppercase tracking-wide">Amount</th>
                  <th className="p-3 text-left text-xs text-slate-500 font-medium uppercase tracking-wide">Description</th>
                  <th className="p-3 text-left text-xs text-slate-500 font-medium uppercase tracking-wide">Actions</th>
                </tr>
              </thead>

              <tbody>
                {fines.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-10 text-slate-400">
                      🚫 No fines recorded right now
                    </td>
                  </tr>
                ) : (
                  fines.map((fine, index) => (
                    <tr
                      key={index}
                      className="border-t border-slate-100 hover:bg-slate-50 transition"
                    >
                      <td className="p-3 font-medium text-slate-900">
                        {fine.id} | {fine.name}
                      </td>

                      <td className="p-3">{fine.date}</td>

                      <td className="p-3 capitalize">{fine.shift}</td>

                      <td className="p-3">{fine.violationType}</td>

                      <td className="p-3 text-rose-600 font-semibold">
                        {fine.amount}
                      </td>

                      <td className="p-3">{fine.description}</td>

                      <td className="p-3 flex gap-2">
                        <button onClick={() => handleEdit(fine)} className="px-3 py-1 text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 rounded-lg hover:bg-blue-100 transition">
                     Edit
                        </button>

                        <button onClick={() => handleDelete(fine._id)} className="px-3 py-1 text-xs font-medium bg-rose-50 text-rose-700 border border-rose-100 rounded-lg hover:bg-rose-100 transition">
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

    <Footer/>
    </>

  );
}