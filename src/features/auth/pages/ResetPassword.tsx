import { FormEvent, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Loader2, LockKeyhole } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import authService from "../services/auth.service";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();

  const token =
    searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event: FormEvent) => {
    event.preventDefault();

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError(
        "Password must contain at least 8 characters."
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response =
        await authService.resetPassword({
          token,
          password,
        });

      if (!response.success) {
        setError(
          response.message ??
            "Unable to reset your password."
        );
        return;
      }

      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to reset your password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-120px)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <LockKeyhole className="h-6 w-6 text-primary" />
          </div>

          <CardTitle>
            Create a new password
          </CardTitle>
        </CardHeader>

        <CardContent>
          {success ? (
            <div className="space-y-5">
              <div className="rounded-lg border bg-muted/50 p-4 text-sm">
                Your password has been changed
                successfully.
              </div>

              <Button asChild className="w-full">
                <Link to="/login">
                  Sign in
                </Link>
              </Button>
            </div>
          ) : (
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
                <Label htmlFor="new-password">
                  New password
                </Label>

                <Input
                  id="new-password"
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(event) =>
                    setPassword(
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">
                  Confirm password
                </Label>

                <Input
                  id="confirm-password"
                  type="password"
                  required
                  value={confirm}
                  onChange={(event) =>
                    setConfirm(
                      event.target.value
                    )
                  }
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
                  ? "Updating..."
                  : "Update password"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
