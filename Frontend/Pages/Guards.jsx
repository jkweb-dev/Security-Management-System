import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Loader from "../Components/Loader"
import ErrorScreen from "../Components/Error"

export const Guards = () => {
const navigate = useNavigate()
  const [guards, setGuards] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 1️⃣ Fetch Guards
  useEffect(() => {
    const fetchGuards = async () => {
      try {
        setLoading(true)

        const token = localStorage.getItem("token")

        const res = await axios.get("http://localhost:5000/guards", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        setGuards(res.data)

      } catch (err) {
       if (err.response?.status === 401) {
         localStorage.removeItem("token")
         navigate("/login")
       }else if(err.response?.status === 500)
        setError(error.response.data.message || "Internal Server Error")

      } finally {
        setLoading(false)
      }
    }

    fetchGuards()
  }, [])

  // 2️⃣ FILTER LOGIC (SEARCH)
  const filteredGuards = guards.filter((guard) => {
    return (
      guard.name?.toLowerCase().includes(search.toLowerCase()) ||
      guard.id?.toString().includes(search)
    )
  })

  const handleView = (id) => {
    navigate(`/profile/${id}`)
  }

  const handleEdit = (id) => {
    navigate(`/profile/edit/${id}`)
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this Guard Profile")

    if (!confirmDelete) return ;

    try {
      const token = localStorage.getItem("token")

      await axios.delete(`http://localhost:5000/profile/${id}` , {
        headers : {
          Authorization : `Bearer ${token}`
        }
      })

      alert("Guard Deleted Successfully")

      setGuards(p => p.filter(g => g._id !== id))

    } catch (error) {
      console.log(error)
      if (error.response?.status === 401) {
         localStorage.removeItem("token")
         navigate("/login")
       }else if (error.response?.status === 404) {
        alert("Guard Not Found")
       } else if (error.response?.status === 500) {
         alert("Internal Server Error")
       }
    }
  }

  // 3️⃣ LOADING STATE
  if (loading) {
     return <Loader/>
  }

  // 4️⃣ ERROR STATE
  if (error) {
  return <ErrorScreen error={error}/>;
  }

  if(guards.length === 0){
    return (
      <div className="h-screen bg-gray-400 flex justify-center items-center">
        <p className="text-3xl font-bold">No Result Found</p>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-10">

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-5 sm:p-6 md:p-8">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            All Guards
          </h1>

          <button onClick={() => navigate("/Addguard")} className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500">
            + Add Guard
          </button>
        </div>

        {/* SEARCH */}
        <div className="mb-5">
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">

          {/* EMPTY SEARCH RESULT */}
          {filteredGuards.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No results found
            </div>
          ) : (

            <table className="w-full text-left border-collapse">

              <thead>
                <tr className="bg-gray-50 text-gray-600 text-sm uppercase">
                  <th className="p-3">Profile</th>
                  <th className="p-3">ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Father Name</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="text-gray-700">

                {filteredGuards.map((guard) => (
                  <tr key={guard._id} className="border-t hover:bg-gray-50">

                    <td className="p-3">
                      <img
                        src={
                          guard.profilePic
                            ? `http://localhost:5000/${guard.profilePic}`
                            : "https://via.placeholder.com/40"
                        }
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </td>

                    <td className="p-3">{guard.id}</td>
                    <td className="p-3 font-medium">{guard.name}</td>
                    <td className="p-3">{guard.fatherName}</td>

                    <td className="p-3 text-center">
                      <div className="flex justify-center gap-2 flex-wrap">

                        <button onClick={() => handleView(guard._id)} className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md">
                          View
                        </button>

                        <button onClick={() => handleEdit(guard._id)} className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded-md">
                          Edit
                        </button>

                        <button onClick={() => handleDelete(guard._id)} className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded-md">
                          Delete
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}

              </tbody>
            </table>

          )}

        </div>
      </div>
    </div>
  )
}