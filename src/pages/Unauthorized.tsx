import { useNavigate, useLocation } from "react-router-dom";
import { ShieldAlert, ArrowLeft, Home } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Unauthorized = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-12">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <ShieldAlert className="h-8 w-8 text-destructive" />
          </div>

          <CardTitle className="text-2xl">
            Access Restricted
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 text-center">
          <p className="text-muted-foreground">
            You do not have permission to access this page.
            Please contact an administrator if you believe this
            is an error.
          </p>

          <p className="rounded-md bg-muted px-4 py-2 text-sm text-muted-foreground">
            Requested path:{" "}
            <span className="font-medium text-foreground">
              {location.pathname}
            </span>
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>

            <Button asChild>
              <a href="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Unauthorized;
