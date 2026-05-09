import {createBrowserRouter,  RouterProvider } from "react-router-dom"
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
    }
    
        ]
    },

   
])

export default function App(){
    return <RouterProvider router={router}/>
}