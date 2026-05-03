import {createBrowserRouter,  RouterProvider } from "react-router-dom"
import { Landing } from "../Pages/landingPage"
import { LoginPage } from "../Pages/login"
import { Dashboard } from "../Pages/dashboard"
import ProtectedRoute from "../Components/ProtectedRoute"
import { AddGuard } from "../Pages/AddGuard"
import { Guards } from "../Pages/Guards"

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

        ]
    },

    
])

export default function App(){
    return <RouterProvider router={router}/>
}