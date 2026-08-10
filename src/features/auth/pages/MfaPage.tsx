import { FormEvent, useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import { Loader2, ShieldCheck } from "lucide-react";

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

const MfaPage = () => {
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    if (code.length !== 6) {
      setError(
        "Enter the six-digit verification code."
      );
      setLoading(false);
      return;
    }

    /*
     * MFA API integration will be connected
     * when the backend authentication provider
     * is implemented.
     */
    setTimeout(() => {
      setLoading(false);
      navigate("/account");
    }, 400);
  };

  return (
    <div className="flex min-h-[calc(100vh-120px)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <ShieldCheck className="h-6 w-6 text-primary" />
          </div>

          <CardTitle>
            Two-factor authentication
          </CardTitle>

          <CardDescription>
            Enter the verification code generated
            by your authenticator application.
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
              <Label htmlFor="mfa-code">
                Authentication code
              </Label>

              <Input
                id="mfa-code"
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
                className="text-center text-xl tracking-[0.5em]"
                placeholder="000000"
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
                : "Verify and continue"}
            </Button>

            <p className="text-center text-sm">
              <Link
                to="/auth/login"
                className="text-primary hover:underline"
              >
                Use another account
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MfaPage;
