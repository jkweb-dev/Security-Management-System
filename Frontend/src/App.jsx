import {createBrowserRouter,  RouterProvider } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { Landing } from "../Pages/landingPage"
import { LoginPage } from "../Pages/login"
import { Dashboard } from "../Pages/dashboard"
import ProtectedRoute from "../Components/ProtectedRoute"
import { AddGuard } from "../Pages/AddGuard"
import { Guards } from "../Pages/Guards"
import { Profile } from "../Pages/Profile"
import { ProfileEdit } from "../Pages/profileEdit"
import { AssignLocation1 } from "../Pages/AssignLocation1"
import { AssignLocation2 } from "../Pages/AssignLocation2"
import { AddAttendence1 } from "../Pages/AddAttendence1"
import { FineManagement } from "../Pages/Fine"
import "react-toastify/dist/ReactToastify.css"

const router = createBrowserRouter([
   {
    path : "/",
    element : <Landing/>
   },

   {
    path : "/login",
    element : <LoginPage/>
   },

    
  

   {
        element : <ProtectedRoute/>,
        children : [
            {
    path : "/dashboard",
    element : <Dashboard/>
},

 {
    path : "/Addguard",
    element : <AddGuard/>
   },
   
    {
    path : "/guards",
    element : <Guards/>
   },

     {
    path : "/profile/:id",
    element : <Profile/>
   },

    {
    path : "/profile/edit/:id",
    element : <ProfileEdit/>
   },

    {
        path : "/assignLocation1",
        element : <AssignLocation1/>
    } ,

     {
        path : "/assignLocation2",
        element : <AssignLocation2/>
    },

       {
        path : "/addAttendence1",
        element : <AddAttendence1/>
    },

      
     {
        path : "/fine-management",
        element : <FineManagement/>
    },
    
        ]
    },

   
])

export default function App(){
    return  <> <RouterProvider router={router}/> <ToastContainer/> </> 
}