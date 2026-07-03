import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Loader from "../Components/Loader"
import { useParams } from "react-router-dom"
import axios from "axios"
import validates from "../Components/profileEditValidation"
import ErrorScreen from "../Components/Error"
import { useNavigate } from "react-router-dom"

export const ProfileEdit = () => {
  const navigate = useNavigate()
  const {id} = useParams()
   const [error , setError] = useState({})
   const [err , setErr] = useState(null)
  const [loading , setLoading] = useState(true)

  const [data , setData] = useState({
    profilePic : "",
    id : "",
    name : "",
    fatherName : "",
    age : "",
    cnicNo : "",
    phone1 : "",
    phone2 : "",
    address : "",
    reference : "",
    designation : "",
    education : "", 
    entryDate : "",
    cnicFront : "",
    cnicBack : ""
  })

 useEffect(() => {
      const fetchProfileEdit = async () => {
        try {
          setLoading(true)
          const token = localStorage.getItem("token")
           const res = await axios.get(`http://localhost:5000/profile/${id}` , {
            headers : {
              Authorization : `Bearer ${token}`
            }
           }) 
           setData({
            ...res.data,
            entryDate : res.data.entryDate.split("T")[0]
           })
  
        } catch (error) {
           if (error.response && error.response.status === 401) {
             localStorage.removeItem("token")
             navigate("/login")
           }else if(error.response && error.response.status === 500){
            setErr(error.response.data.message)
           }else if (error.response && error.response.status === 404){
            setErr(error.response.data.message)
           }
        }finally{
          setLoading(false)
        }
      }
      fetchProfileEdit()
    }, [])

   
     const handleChange = (e) => {
   
    const {name , value , files} = e.target;

    if (files && files.length > 0) {
      setData((prev) => ({
        ...prev , 
        [name] : files[0]
      }))
    } else {
       setData((prev) => ({ 
        ...prev , 
        [name] : value
      }))
    }
  }


    const getFileName = (path) => {
      if (!path) return ""


     
      if (typeof path === "object") {
        return path.name
      }

      const normalized = path.replace(/\\/g,"/")

      const file = normalized.split("/").pop()

      return file.includes("-") ? file.substring(file.indexOf("-") + 1) : file
    }


    const handleSubmit = (e) => {
      e.preventDefault()

      const errors = validates(data)

       if (Object.keys(errors).length > 0) {
    setError(errors);
    return; 
  }

  try {
    const token = localStorage.getItem("token")

    const dataa = new FormData()

    dataa.append("id" , data.id)
    dataa.append("name" , data.name)
    dataa.append("fatherName" , data.fatherName)
    dataa.append("age" , data.age)
    dataa.append("address" , data.address)
    dataa.append("cnicNo" , data.cnicNo)
    dataa.append("phone1" , data.phone1)
    dataa.append("phone2" , data.phone2)
    dataa.append("designation" , data.designation)
    dataa.append("reference" , data.reference)
    dataa.append("entryDate" , data.entryDate)
    dataa.append("education" , data.education)

    if (typeof data.profilePic === "object") {
      dataa.append("profilePic" , data.profilePic)
    }

     if (typeof data.cnicFront === "object") {
      dataa.append("cnicFront" , data.cnicFront)
    }

     if (typeof data.cnicBack === "object") {
      dataa.append("cnicBack" , data.cnicBack)
    }
    
    const res = axios.put(`http://localhost:5000/profile/${id}` , dataa ,
      {
        headers : {
          Authorization :  `Bearer ${token}`
        }

      }
    )

  
    

    setData({
    profilePic : "",
    id : "",
    name : "",
    fatherName : "",
    age : "",
    cnicNo : "",
    phone1 : "",
    phone2 : "",
    address : "",
    reference : "",
    designation : "",
    education : "", 
    entryDate : "",
    cnicFront : "",
    cnicBack : ""
 

  })  
  setTimeout(() => {
  toast.success("Guard Updated Successfully")
  } , 0)

    navigate("/guards")
  } catch (error) {
     if (error.response && error.response.status === 401) {
             localStorage.removeItem("token")
             navigate("/login")
           }else if(error.response && error.response.status === 500){
          setErr("Guard Not updated Due to Some Reason")
           }else if (error.response && error.response.status === 404){
           setErr("Guard Not updated Because Guard Not Found")
           }
  }

    }

    if (loading) {
      return <Loader/>
    }

if (err) {
  return <ErrorScreen error={err}/>
}
    return (
      <div className="min-h-screen relative bg-gradient-to-br from-slate-50 via-white to-indigo-50 text-slate-900 overflow-x-hidden font-['Inter',sans-serif]">

  <div className="absolute w-[220px] sm:w-[350px] md:w-[500px] h-[220px] sm:h-[350px] md:h-[500px] bg-indigo-200/50 blur-3xl rounded-full top-[-100px] left-[-100px]"></div>
  <div className="absolute w-[220px] sm:w-[350px] md:w-[500px] h-[220px] sm:h-[350px] md:h-[500px] bg-sky-200/50 blur-3xl rounded-full bottom-[-100px] right-[-100px]"></div>

  <div className="flex justify-center px-3 sm:px-4 md:px-6 py-6 sm:py-10">

    <form onSubmit={handleSubmit} className="relative w-full max-w-5xl bg-white/80 backdrop-blur-2xl border border-slate-200 rounded-2xl sm:rounded-3xl shadow-2xl shadow-indigo-100/60 p-4 sm:p-6 md:p-10">

      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl md:text-4xl font-semibold tracking-tight font-['Plus_Jakarta_Sans',sans-serif] bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">Update Guard</h1>
        <p className="text-slate-500 text-xs sm:text-sm md:text-base mt-2">
          Secure Guard Update System
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">

        <div className="min-w-0">
          <label className="text-slate-600 text-xs sm:text-sm font-medium">Profile Picture</label>
          <input type="file" name="profilePic" onChange={handleChange}
            className="w-full mt-2 text-xs sm:text-sm bg-slate-50/60 border border-slate-200 rounded-xl p-2 text-slate-600 file:bg-indigo-600 file:text-white file:border-0 file:px-3 file:py-1 file:rounded-lg file:font-medium" />
             {error.profilePic && (
            <p className="text-red-500 font-semibold text-center mt-1 text-sm">{error.profilePic}</p>
          )}
            <p className="text-emerald-600 text-sm mt-1">Current :  {getFileName(data.profilePic)}
             
            </p>
        </div>

        <div className="min-w-0">
          <label className="text-slate-600 text-xs sm:text-sm font-medium">ID</label>
          <input type="text" placeholder="Enter ID" name="id" onChange={handleChange} value={data.id} 
            className="w-full mt-2 px-3 sm:px-4 py-2.5 sm:py-3 text-sm rounded-xl bg-slate-50/60 border border-slate-200 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none text-slate-900" />
             {error.id && (
            <p className="text-red-500 font-semibold text-center mt-1 text-sm">{error.id}</p>
          )}
        </div>

        <div className="min-w-0">
          <label className="text-slate-600 text-xs sm:text-sm font-medium">Name</label>
          <input type="text" placeholder="Full Name" name="name" value={data.name} onChange={handleChange}
            className="w-full mt-2 px-3 sm:px-4 py-2.5 sm:py-3 text-sm rounded-xl bg-slate-50/60 border border-slate-200 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none text-slate-900" />
             {error.name && (
            <p className="text-red-500 font-semibold text-center mt-1 text-sm">{error.name}</p>
          )}
        </div>

        <div className="min-w-0">
          <label className="text-slate-600 text-xs sm:text-sm font-medium">Father Name</label>
          <input type="text" name="fatherName" value={data.fatherName} onChange={handleChange}
            className="w-full mt-2 px-3 sm:px-4 py-2.5 sm:py-3 text-sm rounded-xl bg-slate-50/60 border border-slate-200 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none text-slate-900" />
             {error.fatherName && (
            <p className="text-red-500 font-semibold text-center mt-1 text-sm">{error.fatherName}</p>
          )}
        </div>

        <div className="min-w-0">
          <label className="text-slate-600 text-xs sm:text-sm font-medium">Age</label>
          <input type="number" name="age" value={data.age} onChange={handleChange}
            className="w-full mt-2 px-3 sm:px-4 py-2.5 sm:py-3 text-sm rounded-xl bg-slate-50/60 border border-slate-200 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none text-slate-900" />
             {error.age && (
            <p className="text-red-500 font-semibold text-center mt-1 text-sm">{error.age}</p>
          )}
        </div>

        <div className="min-w-0">
          <label className="text-slate-600 text-xs sm:text-sm font-medium">CNIC No.</label>
          <input type="text" placeholder="xxxxx-xxxxxxx-x" name="cnicNo" value={data.cnicNo} onChange={handleChange}
            className="w-full mt-2 px-3 sm:px-4 py-2.5 sm:py-3 text-sm rounded-xl bg-slate-50/60 border border-slate-200 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none text-slate-900" />
             {error.cnicNo && (
            <p className="text-red-500 font-semibold text-center mt-1 text-sm">{error.cnicNo}</p>
          )}
        </div>

        <div className="min-w-0">
          <label className="text-slate-600 text-xs sm:text-sm font-medium">Phone 1</label>
          <input type="text" name="phone1" value={data.phone1} onChange={handleChange}
            className="w-full mt-2 px-3 sm:px-4 py-2.5 sm:py-3 text-sm rounded-xl bg-slate-50/60 border border-slate-200 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none text-slate-900" />
             {error.phone1 && (
            <p className="text-red-500 font-semibold text-center mt-1 text-sm">{error.phone1}</p>
          )}
        </div>

        <div className="min-w-0">
          <label className="text-slate-600 text-xs sm:text-sm font-medium">Phone 2</label>
          <input type="text" name="phone2" value={data.phone2} onChange={handleChange}
            className="w-full mt-2 px-3 sm:px-4 py-2.5 sm:py-3 text-sm rounded-xl bg-slate-50/60 border border-slate-200 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none text-slate-900" />
             {error.phone2 && (
            <p className="text-red-500 font-semibold text-center mt-1 text-sm">{error.phone2}</p>
          )}
        </div>

        <div className="sm:col-span-2 lg:col-span-3 min-w-0">
          <label className="text-slate-600 text-xs sm:text-sm font-medium">Address</label>
          <input type="text" name="address" value={data.address} onChange={handleChange}
            className="w-full mt-2 px-3 sm:px-4 py-2.5 sm:py-3 text-sm rounded-xl bg-slate-50/60 border border-slate-200 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none text-slate-900" />
             {error.address && (
            <p className="text-red-500 font-semibold text-center mt-1 text-sm">{error.address}</p>
          )}
        </div>

        <div className="min-w-0">
          <label className="text-slate-600 text-xs sm:text-sm font-medium">Reference</label>
          <input type="text" name="reference" value={data.reference} onChange={handleChange}
            className="w-full mt-2 px-3 sm:px-4 py-2.5 sm:py-3 text-sm rounded-xl bg-slate-50/60 border border-slate-200 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none text-slate-900" />
             {error.reference && (
            <p className="text-red-500 font-semibold text-center mt-1 text-sm">{error.reference}</p>
          )}
        </div>

        <div className="min-w-0">
          <label className="text-slate-600 text-xs sm:text-sm font-medium">Designation</label>
          <input type="text" name="designation" value={data.designation} onChange={handleChange}
            className="w-full mt-2 px-3 sm:px-4 py-2.5 sm:py-3 text-sm rounded-xl bg-slate-50/60 border border-slate-200 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none text-slate-900" />
             {error.designation && (
            <p className="text-red-500 font-semibold text-center mt-1 text-sm">{error.designation}</p>
          )}
        </div>

        <div className="min-w-0">
          <label className="text-slate-600 text-xs sm:text-sm font-medium">Education</label>
          <select name="education" value={data.education} onChange={handleChange}
            className="w-full mt-2 px-3 sm:px-4 py-2.5 sm:py-3 text-sm rounded-xl bg-slate-50/60 border border-slate-200 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none text-slate-900">
            <option value="">Select</option>
            <option value="matric" className="text-black">Matric</option>
            <option value="fsc" className="text-black">FSc</option>
            <option value="bs" className="text-black">BS</option>
            <option value = "ms" className="text-black">MS</option>
          </select>
           {error.education && (
            <p className="text-red-500 font-semibold text-center mt-1 text-sm">{error.education}</p>
          )}
        </div>

        <div className="min-w-0">
          <label className="text-slate-600 text-xs sm:text-sm font-medium">Entry Date</label>
          <input type="date" name="entryDate" value={data.entryDate} onChange={handleChange}
            className="w-full mt-2 px-3 sm:px-4 py-2.5 sm:py-3 text-sm rounded-xl bg-slate-50/60 border border-slate-200 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none text-slate-900" />
             {error.entryDatec && (
            <p className="text-red-500 font-semibold text-center mt-1 text-sm">{error.entryDate}</p>
          )}
        </div>

        <div className="min-w-0">
          <label className="text-slate-600 text-xs sm:text-sm font-medium">CNIC Front</label>
          <input type="file" name="cnicFront" onChange={handleChange}
            className="w-full mt-2 text-xs sm:text-sm bg-slate-50/60 border border-slate-200 rounded-xl p-2 text-slate-600 file:bg-indigo-600 file:text-white file:border-0 file:px-3 file:py-1 file:rounded-lg file:font-medium" />
             {error.cnicFrontc && (
            <p className="text-red-500 font-semibold text-center mt-1 text-sm">{error.cnicBack}</p>
          )}
             <p className="text-emerald-600 text-sm mt-1">Current : {getFileName(data.cnicFront)}
            </p>
        </div>

        <div className="min-w-0">
          <label className="text-slate-600 text-xs sm:text-sm font-medium">CNIC Back</label>
          <input type="file" name="cnicBack" onChange={handleChange}
            className="w-full mt-2 text-xs sm:text-sm bg-slate-50/60 border border-slate-200 rounded-xl p-2 text-slate-600 file:bg-sky-500 file:text-white file:border-0 file:px-3 file:py-1 file:rounded-lg file:font-medium" />
             {error.cnicBack && (
            <p className="text-red-500 font-semibold text-center mt-1 text-sm">{error.cnicBack}</p>
          )}
             <p className="text-emerald-600 text-sm mt-1">Current :  {getFileName(data.cnicBack)}        
            </p>
        </div>

      </div>

      <div className="mt-6 sm:mt-8">
        <button type="submit"
          className="w-full py-3 sm:py-4 text-sm sm:text-lg rounded-xl sm:rounded-2xl bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-indigo-500 hover:to-sky-400 text-white font-semibold hover:scale-[1.02] transition shadow-lg shadow-indigo-200">
          Update Guard
        </button>
      </div>

    </form>

  </div>
</div>
    )
}