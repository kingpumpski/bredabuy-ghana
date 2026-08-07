import {Outlet} from "react-router-dom";

export default function DashboardLayout(){

return(

<div className="flex min-h-screen">

<aside className="w-64 border-r p-5">
Dashboard Menu
</aside>


<div className="flex-1">

<header className="border-b p-4">
Dashboard Header
</header>

<main className="p-6">
<Outlet/>
</main>

</div>

</div>

)

}
