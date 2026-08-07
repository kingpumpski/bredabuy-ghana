import {Navigate,Outlet} from "react-router-dom";


export default function ProtectedRoute(){

const authenticated=false;


return authenticated 
? <Outlet/>
:<Navigate to="/login"/>

}
