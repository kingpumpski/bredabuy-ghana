import {createBrowserRouter} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";


export const router=createBrowserRouter([


{
 path:"/",
 element:<MainLayout/>,
 children:[

 {
 path:"",
 element:<h1>BredaBuy Ghana Home</h1>
 }

 ]

},


{
 path:"/dashboard",
 element:<DashboardLayout/>,
 children:[

 {
 path:"",
 element:<h1>Dashboard</h1>
 }

 ]

}



])
