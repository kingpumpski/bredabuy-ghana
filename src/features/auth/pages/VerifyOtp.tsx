import { FormEvent, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import authService from "../services/auth.service";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const identifier =
    location.state?.email ??
    location.state?.phone ??
    "";

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event: FormEvent) => {
    event.preventDefault();

    if (!identifier) {
      setError(
        "No verification account was provided."
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response =
        await authService.verifyOtp({
          identifier,
          code,
        });

      if (!response.success) {
        setError(
          response.message ??
            "Invalid verification code."
        );
        return;
      }

      navigate("/account");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Verification failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-120px)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>
            Verify your account
          </CardTitle>

          <CardDescription>
            Enter the verification code sent to
            your email or phone.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={submit}
            className="space-y-5"
          >
            {error && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="otp">
                Verification code
              </Label>

              <Input
                id="otp"
                inputMode="numeric"
                maxLength={6}
                required
                value={code}
                onChange={(event) =>
                  setCode(
                    event.target.value
                      .replace(/\D/g, "")
                  )
                }
                placeholder="000000"
                className="text-center text-xl tracking-[0.5em]"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}

              {loading
                ? "Verifying..."
                : "Verify code"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              <Link
                to="/auth/login"
                className="text-primary hover:underline"
              >
                Return to login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyOtp;
