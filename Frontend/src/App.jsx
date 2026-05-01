import {createBrowserRouter,  RouterProvider } from "react-router-dom"
import { Landing } from "../Pages/landingPage"
import { LoginPage } from "../Pages/login"
import { Dashboard } from "../Pages/dashboard"
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
    path : "/dashboard",
    element : <Dashboard/>
   }

])

export default function App(){
    return <RouterProvider router={router}/>
}