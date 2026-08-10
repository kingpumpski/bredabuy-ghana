import { Outlet } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        <div className="hidden lg:flex lg:w-1/2 bg-primary text-primary-foreground p-12 items-center justify-center">
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground/10">
                <ShoppingBag className="h-7 w-7" />
              </div>

              <div>
                <h1 className="text-2xl font-bold">BredaBuy Ghana</h1>
                <p className="text-sm opacity-80">
                  Ghana's modern marketplace
                </p>
              </div>
            </div>

            <h2 className="text-4xl font-bold leading-tight mb-6">
              Shop smarter.
              <br />
              Sell better.
              <br />
              Grow together.
            </h2>

            <p className="text-lg opacity-80">
              A modern Ghanaian marketplace connecting customers,
              sellers, logistics providers and businesses in one
              powerful commerce ecosystem.
            </p>
          </div>
        </div>

        <main className="flex flex-1 items-center justify-center p-6">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
