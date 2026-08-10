import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader2, Mail, Send } from "lucide-react";

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

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event: FormEvent) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await authService.forgotPassword({
        email,
      });

      if (!response.success) {
        setError(
          response.message ??
            "Unable to process your request."
        );
        return;
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to process your request."
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
            <Mail className="h-6 w-6 text-primary" />
          </div>

          <CardTitle>Forgot your password?</CardTitle>

          <CardDescription>
            Enter your email address and we'll send you
            instructions to reset your password.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {submitted ? (
            <div className="space-y-5">
              <div className="rounded-lg border bg-muted/50 p-4 text-sm">
                If an account exists for{" "}
                <strong>{email}</strong>, password reset
                instructions have been sent.
              </div>

              <Button asChild className="w-full">
                <Link to="/login">
                  Return to sign in
                </Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              {error && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="forgot-email">
                  Email address
                </Label>

                <Input
                  id="forgot-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="you@example.com"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}

                {loading
                  ? "Sending..."
                  : "Send reset instructions"}
              </Button>

              <Button
                asChild
                variant="ghost"
                className="w-full"
              >
                <Link to="/login">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to login
                </Link>
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
