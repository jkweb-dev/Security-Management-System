import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loader from "../Components/Loader"
import { useNavigate } from "react-router-dom"
import ErrorScreen from "../Components/Error"

export const Profile = () => {
    const {id} = useParams()
    const navigate  = useNavigate()

    const [profile , setProfile] = useState(null)
    const [loading , setLoading] = useState(true)
    const [error , setError] = useState(null)

    useEffect(() => {
      const fetchProfile = async () => {
        try {
          setLoading(true)
          const token = localStorage.getItem("token")
           const res = await axios.get(`http://localhost:5000/profile/${id}` , {
            headers : {
              Authorization : `Bearer ${token}`
            }
           }) 
           setProfile(res.data)
         
        } catch (error) {
           if (error.response && error.response.status === 401) {
             localStorage.removeItem("token")
             navigate("/login")
           }else if(error.response && error.response.status === 500){
            setError(error.response.data.message)
           }else if (error.response && error.response.status === 404){
            setError(error.response.data.message)
           }
        }finally{
          setLoading(false)
        }
      }
      fetchProfile()
    }, [])

    if (loading) {
      return <Loader/>
    }

    if(error){
      return <ErrorScreen error={error} />
    }

    return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-10">

  <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">

  
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 sm:p-8 text-white">
      <h1 className="text-2xl sm:text-3xl font-bold">Guard Profile</h1>
      <p className="text-sm sm:text-base text-blue-100 mt-1">
        Detailed information of security guard
      </p>
    </div>

    
    <div className="p-5 sm:p-6 md:p-8">

      
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

        
        <div className="flex-shrink-0">
          <img
            src={`http://localhost:5000/${profile.profilePic}`}
            className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-blue-200 shadow-md"
          />
        </div>

        <div className="text-center md:text-left space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{profile.name}</h2>
          <p className="text-gray-500">ID: {profile.id}</p>
          <p className="text-gray-600">Father Name: {profile.fatherName}</p>
          <p className="text-gray-600">Age: {profile.age}</p>
          <p className="text-gray-600">Designation: {profile.designation}</p>
        </div>
      </div>

      
      <div className="my-6 border-t"></div>

    
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm sm:text-base">

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-500">CNIC Number</p>
          <p className="font-medium text-gray-800">{profile.cnicNo}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-500">Phone 1</p>
          <p className="font-medium text-gray-800">{profile.phone1}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-500">Phone 2</p>
          <p className="font-medium text-gray-800">{profile.phone2}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-500">Education</p>
          <p className="font-medium text-gray-800">{profile.education}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg sm:col-span-2">
          <p className="text-gray-500">Reference</p>
          <p className="font-medium text-gray-800">{profile.reference}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg sm:col-span-2">
          <p className="text-gray-500">Address</p>
          <p className="font-medium text-gray-800">
           {profile.address}
          </p>
        </div>

      </div>

   
      <div className="my-6 border-t"></div>

      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        CNIC Documents
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-500 mb-2">CNIC Front</p>
          <img
            src={`http://localhost:5000/${profile.cnicFront}`}
            className="w-full h-32 object-cover rounded-md"
          />
        </div>

      
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-500 mb-2">CNIC Back</p>
          <img
             src={`http://localhost:5000/${profile.cnicBack}`}
            className="w-full h-32 object-cover rounded-md"
          />
        </div>

        
      
      </div>

    </div>
  </div>
</div>
    )
}
