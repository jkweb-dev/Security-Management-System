import { useState } from "react"
import validatee from "../Components/AddGuardValidation"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const AddGuard = () => {

const navigate = useNavigate()
const [resetKey , setResetKey] = useState(0)

  const [error , setError] = useState({})

  const [form , setForm] =useState({
    profilePic : null ,
    id : "",
    name : "",
    fatherName : "" ,
    age : "",
    cnicNo : "",
    phone1 : "",
    phone2 : "",
    address : "",
    reference : "",
    designation : "",
    education : "",
    entryDate : "",
    cnicFront : null,
    cnicBack : null
  })

  const handleChange = (e) => {
    setError({})
    const {name , value , files} = e.target;

    if (files && files.length > 0) {
      setForm((prev) => ({
        ...prev , 
        [name] : files[0]
      }))
    } else {
       setForm((prev) => ({ 
        ...prev , 
        [name] : value
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const errors = validatee(form)

    
  if (Object.keys(errors).length > 0) {
    setError(errors);
    return; 
  }

  const data = new FormData()

  data.append("id" , form.id)
   data.append("name" , form.name)
    data.append("fatherName" , form.fatherName)
     data.append("age" , form.age)
      data.append("cnicNo" , form.cnicNo)
       data.append("phone1" , form.phone1)
        data.append("phone2" , form.phone2)
         data.append("address" , form.address)
          data.append("reference" , form.reference)
           data.append("entryDate" , form.entryDate)
           data.append("designation" , form.designation)
            data.append("education" , form.education)
             data.append("profilePic" , form.profilePic)
              data.append("cnicFront" , form.cnicFront)
               data.append("cnicBack" , form.cnicBack);

               try {
                const token = localStorage.getItem("token")
                const res = await axios.post("http://localhost:5000/Addguard" , data ,
                  {
                    headers :{
                       Authorization : `Bearer ${token}`
                    }
                  }
                )

                alert("Guard Added Successfully")

                
                setForm({
                 
    id : "",
    name : "",
    fatherName : "" ,
    age : "",
    cnicNo : "",
    phone1 : "",
    phone2 : "",
    address : "",
    reference : "",
    designation : "",
    education : "",
    entryDate : "",
   
                })

                setResetKey(prev => prev + 1)

               } catch (error) {
                 console.log(error.response?.status)
               if (error.response && error.response.status === 401) {
                    localStorage.removeItem("token")
                    navigate("/login")
                }else if (error.response && error.response.status === 500){
                   setError({serverError : "Something went wrong in Server , Please try again later"})
                } else if (error.response && error.response.status === 400) {
                  setError({fileUploadError : error.response.data.message})
                }else {
                  setError({general : "Something Went wrong"})
                }
               }

  }

  
    return (
     <div className="min-h-screen relative bg-gradient-to-br from-black via-purple-950 to-indigo-950 text-white overflow-x-hidden">


  <div className="absolute w-[250px] sm:w-[400px] md:w-[550px] h-[250px] sm:h-[400px] md:h-[550px] bg-purple-500/20 blur-3xl rounded-full top-[-120px] left-[-120px]"></div>
  <div className="absolute w-[250px] sm:w-[400px] md:w-[550px] h-[250px] sm:h-[400px] md:h-[550px] bg-blue-500/20 blur-3xl rounded-full bottom-[-120px] right-[-120px]"></div>

  <div className="flex justify-center px-4 py-10">

    <form onSubmit={handleSubmit} className="relative w-full max-w-5xl bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-5 sm:p-7 md:p-10">

    
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          Add New Guard
        </h1>
        <p className="text-gray-400 text-sm sm:text-base mt-2">
          Secure Guard Registration System
        </p>
      </div>

   
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full min-w-0">

       
        <div>
          <label className="text-gray-300 text-sm">Profile Picture</label>
          <input key={resetKey} type="file" name = "profilePic" onChange={handleChange}
            className="w-full mt-2 text-sm bg-white/5 border border-white/10 rounded-xl p-2 file:bg-purple-600 file:text-white file:border-0 file:px-3 file:py-1 file:rounded-lg min-w-0" />
            {error.profilePic && (
            <p className="text-red-400 font-bold text-center">{error.profilePic}</p>
          )}
        </div>

        <div>
          <label className="text-gray-300 text-sm">ID</label>
          <input type="text" placeholder="Enter ID" name="id" value={form.id} onChange={handleChange}
            className="w-full mt-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-purple-400 min-w-0" />
             {error.id && (
            <p className="text-red-400 font-bold text-center">{error.id}</p>
          )}
        </div>

       
        <div>
          <label className="text-gray-300 text-sm">Name</label>
          <input type="text" placeholder="Full Name" name="name" value={form.name} onChange={handleChange}
            className="w-full mt-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-purple-400 min-w-0" />
             {error.name && (
            <p className="text-red-400 font-bold text-center">{error.name}</p>
          )}
        </div>

       
        <div>
          <label className="text-gray-300 text-sm">Father Name</label>
          <input type="text" name="fatherName" value={form.fatherName} onChange={handleChange}
            className="w-full mt-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-purple-400 min-w-0" />
             {error.fatherName && (
            <p className="text-red-400 font-bold text-center">{error.fatherName}</p>
          )}
        </div>

        <div>
          <label className="text-gray-300 text-sm">Age</label>
          <input type="number" name="age" value={form.age} onChange={handleChange}
            className="w-full mt-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-purple-400 min-w-0" />
             {error.age && (
            <p className="text-red-400 font-bold text-center">{error.age}</p>
          )}
        </div>

        <div>
          <label className="text-gray-300 text-sm">CNIC No.</label>
          <input type="text" placeholder="xxxxx-xxxxxxx-x" name="cnicNo" value={form.cnicNo} onChange={handleChange}
            className="w-full mt-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-purple-400 min-w-0" />
             {error.cnicNo && (
            <p className="text-red-400 font-bold text-center">{error.cnicNo}</p>
          )}
        </div>

      
        <div>
          <label className="text-gray-300 text-sm">Phone 1</label>
          <input type="text" name="phone1" value={form.phone1} onChange={handleChange}
            className="w-full mt-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-purple-400 min-w-0" />
             {error.phone1 && (
            <p className="text-red-400 font-bold text-center">{error.phone1}</p>
          )}
        </div>

        <div>
          <label className="text-gray-300 text-sm">Phone 2</label>
          <input type="text" name="phone2" value={form.phone2} onChange={handleChange}
            className="w-full mt-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-purple-400 min-w-0" />
             {error.phone2 && (
            <p className="text-red-400 font-bold text-center">{error.phone2}</p>
          )}
        </div>

       
        <div className="sm:col-span-2 lg:col-span-3">
          <label className="text-gray-300 text-sm">Address</label>
          <input type="text" name="address" value={form.address} onChange={handleChange}
            className="w-full mt-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-purple-400 min-w-0" />
             {error.address && (
            <p className="text-red-400 font-bold text-center">{error.address}</p>
          )}
        </div>

       
        <div>
          <label className="text-gray-300 text-sm">Reference</label>
          <input type="text" name="reference" value={form.reference} onChange={handleChange}
            className="w-full mt-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-purple-400 min-w-0" />
             {error.reference && (
            <p className="text-red-400 font-bold text-center">{error.reference}</p>
          )}
        </div>

        <div>
          <label className="text-gray-300 text-sm">Designation</label>
          <input type="text" name="designation" value={form.designation} onChange={handleChange}
            className="w-full mt-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-purple-400 min-w-0" />
             {error.designation && (
            <p className="text-red-400 font-bold text-center">{error.designation}</p>
          )}
        </div>

      
        <div>
          <label className="text-gray-300 text-sm">Education</label>
          <select name="education" className="w-full mt-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-purple-400 min-w-0" value={form.education} onChange={handleChange}>
          <option value="" >Select</option>
            <option value="matric" className="text-blue-900 font-bold">Matric</option>
            <option value="fsc" className="text-blue-900 font-bold">FSc</option>
            <option value="bs" className="text-blue-900 font-bold">BS</option>
            <option value="ms" className="text-blue-900 font-bold">MS</option>
          </select>
           {error.education && (
            <p className="text-red-400 font-bold text-center">{error.education}</p>
          )}
        </div>

        <div>
          <label className="text-gray-300 text-sm">Entry Date</label>
          <input type="date" name="entryDate" value={form.entryDate} onChange={handleChange}
            className="w-full mt-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-purple-400 min-w-0" />
             {error.entryDate && (
            <p className="text-red-400 font-bold text-center">{error.entryDate}</p>
          )}
        </div>

   
        <div>
          <label className="text-gray-300 text-sm">CNIC Front</label>
          <input key={resetKey} type="file" name="cnicFront" onChange={handleChange}
            className="w-full mt-2 text-sm bg-white/5 border border-white/10 rounded-xl p-2 file:bg-purple-600 file:text-white file:border-0 file:px-3 file:py-1 file:rounded-lg min-w-0" />
              {error.cnicFront && (
            <p className="text-red-400 font-bold text-center">{error.cnicFront}</p>
          )}
        </div>

       
        <div>
          <label className="text-gray-300 text-sm">CNIC Back</label>
          <input key={resetKey} type="file" name="cnicBack" onChange={handleChange}
            className="w-full mt-2 text-sm bg-white/5 border border-white/10 rounded-xl p-2 file:bg-indigo-600 file:text-white file:border-0 file:px-3 file:py-1 file:rounded-lg min-w-0" />
             {error.cnicBack && (
            <p className="text-red-400 font-bold text-center">{error.cnicBack}</p>
          )}
        </div>

      </div>

     
      <div className="mt-8">
        <button type="submit"
       className  ="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-lg font-semibold hover:scale-[1.02] transition shadow-lg">
          Add Guard
        </button>
      </div>


{error.serverError && (
  <p className="text-red-400 font-bold text-center">{error.serverError}</p>
)}

{error.fileUploadError && (
  <p className="text-red-400 font-bold text-center">{error.fileUploadError}</p>
)}

{error.general && (
  <p className="text-red-400 font-bold text-center">{error.general}</p>
)}
    </form>

  </div>
</div>

    )
}