import {Navigate,Outlet} from "react-router-dom";

export default function SellerRoute(){

const role="seller";


return role==="seller"
?<Outlet/>
:<Navigate to="/"/>

}

