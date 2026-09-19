import {createBrowserRouter} from "react-router"
import Login from "./auth/ui/pages/Login"
import Register from "./auth/ui/pages/Register"
import Protected from "./auth/ui/components/Protected"

export const router=createBrowserRouter([
    {
      path:'/',
      element:<Protected><h1>Home</h1></Protected>
    },
    {
        path:"/register",
        element:<Register/>
    },
    {
        path:"/login",
        element:<Login/>
    }
])