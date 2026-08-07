import {Outlet} from "react-router-dom";

export default function MainLayout(){

return(
<div className="min-h-screen flex flex-col">

<header className="p-4 border-b">
BredaBuy Ghana
</header>

<main className="flex-1">
<Outlet/>
</main>

<footer className="p-4 border-t">
© BredaBuy Ghana
</footer>

</div>
)

}
