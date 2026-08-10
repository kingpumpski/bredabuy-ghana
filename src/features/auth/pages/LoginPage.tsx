import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  FormEvent,
  useState,
} from "react";

import {
  Loader2,
  LockKeyhole,
  Mail,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Input,
} from "@/components/ui/input";

import {
  Label,
} from "@/components/ui/label";

import {
  Checkbox,
} from "@/components/ui/checkbox";

import {
  useAuth,
} from "../hooks/useAuth";

const LoginPage = () => {
  const {
    login,
  } = useAuth();

  const location =
    useLocation();

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    rememberMe,
    setRememberMe,
  ] = useState(true);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const submit = async (
    event: FormEvent
  ) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response =
        await login({
          email,
          password,
          rememberMe,
        });

      if (!response.success) {
        setError(
          response.message ??
            "Unable to sign in."
        );
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to sign in."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-120px)] items-center justify-center px-4 py-12">

      <Card className="w-full max-w-md">

        <CardHeader className="text-center">

          <CardTitle className="text-2xl">
            Welcome back
          </CardTitle>

          <CardDescription>
            Sign in to your BredaBuy Ghana account.
          </CardDescription>

        </CardHeader>

        <CardContent>

          <form
            onSubmit={submit}
            className="space-y-5"
          >

            {location.state?.message && (
              <div className="rounded-lg border p-3 text-sm">
                {location.state.message}
              </div>
            )}

            {error && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">
                Email address
              </Label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(
                      event.target.value
                    )
                  }
                  className="pl-10"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">

              <div className="flex justify-between">
                <Label htmlFor="password">
                  Password
                </Label>

                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">

                <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) =>
                    setPassword(
                      event.target.value
                    )
                  }
                  className="pl-10"
                  placeholder="Enter your password"
                />

              </div>

            </div>

            <div className="flex items-center gap-2">

              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) =>
                  setRememberMe(
                    checked === true
                  )
                }
              />

              <Label
                htmlFor="remember"
                className="text-sm font-normal"
              >
                Keep me signed in
              </Label>

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
                ? "Signing in..."
                : "Sign in"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-primary hover:underline"
              >
                Create one
              </Link>
            </p>

          </form>

        </CardContent>

      </Card>

    </div>
  );
};

export default LoginPage;
