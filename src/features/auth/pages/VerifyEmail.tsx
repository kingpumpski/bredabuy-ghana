import { useEffect, useState } from "react";
import {
  Link,
  useSearchParams,
} from "react-router-dom";
import {
  CheckCircle2,
  Loader2,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import authService from "../services/auth.service";

const VerifyEmail = () => {
  const [searchParams] =
    useSearchParams();

  const token =
    searchParams.get("token");

  const [loading, setLoading] =
    useState(Boolean(token));

  const [verified, setVerified] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setError(
        "No verification token was provided."
      );
      return;
    }

    const verify = async () => {
      try {
        const response =
          await authService.verifyEmail(
            token
          );

        if (!response.success) {
          setError(
            response.message ??
              "Email verification failed."
          );
          return;
        }

        setVerified(true);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Email verification failed."
        );
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token]);

  return (
    <div className="flex min-h-[calc(100vh-120px)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle>
            Email verification
          </CardTitle>
        </CardHeader>

        <CardContent>
          {loading && (
            <div className="space-y-4">
              <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">
                Verifying your email...
              </p>
            </div>
          )}

          {!loading && verified && (
            <div className="space-y-5">
              <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />

              <p className="text-sm text-muted-foreground">
                Your email address has been
                verified successfully.
              </p>

              <Button asChild className="w-full">
                <Link to="/login">
                  Continue to login
                </Link>
              </Button>
            </div>
          )}

          {!loading && !verified && error && (
            <div className="space-y-5">
              <XCircle className="mx-auto h-12 w-12 text-destructive" />

              <p className="text-sm text-destructive">
                {error}
              </p>

              <Button asChild className="w-full">
                <Link to="/login">
                  Return to login
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmail;
