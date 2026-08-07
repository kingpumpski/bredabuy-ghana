import {Navigate,Outlet} from "react-router-dom";

export default function AdminRoute(){

const role="admin";


return role==="admin"
?<Outlet/>
:<Navigate to="/"/>

}
