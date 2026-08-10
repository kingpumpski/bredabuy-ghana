import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { Checkbox } from "@/components/ui/checkbox";

import { useAuth } from "../hooks/useAuth";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (
    field: keyof typeof form,
    value: string | boolean
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();

    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!form.acceptTerms) {
      setError(
        "Please accept the terms and conditions."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await register({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        password: form.password,
        acceptTerms: form.acceptTerms,
      });

      if (!response.success) {
        setError(
          response.message ??
            "Unable to create your account."
        );
        return;
      }

      navigate("/verify-email", {
        state: {
          email: form.email,
        },
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to create your account."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-120px)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Create your BredaBuy account</CardTitle>

          <CardDescription>
            Join Ghana's growing digital marketplace.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={submit} className="space-y-5">

            {error && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">
                  First name
                </Label>

                <Input
                  id="firstName"
                  required
                  value={form.firstName}
                  onChange={(event) =>
                    update(
                      "firstName",
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">
                  Last name
                </Label>

                <Input
                  id="lastName"
                  required
                  value={form.lastName}
                  onChange={(event) =>
                    update(
                      "lastName",
                      event.target.value
                    )
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="register-email">
                Email address
              </Label>

              <Input
                id="register-email"
                type="email"
                required
                value={form.email}
                onChange={(event) =>
                  update(
                    "email",
                    event.target.value
                  )
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">
                Phone number
              </Label>

              <Input
                id="phone"
                type="tel"
                placeholder="+233..."
                value={form.phone}
                onChange={(event) =>
                  update(
                    "phone",
                    event.target.value
                  )
                }
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="password">
                  Password
                </Label>

                <Input
                  id="password"
                  type="password"
                  required
                  minLength={8}
                  value={form.password}
                  onChange={(event) =>
                    update(
                      "password",
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  Confirm password
                </Label>

                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  value={form.confirmPassword}
                  onChange={(event) =>
                    update(
                      "confirmPassword",
                      event.target.value
                    )
                  }
                />
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Checkbox
                id="terms"
                checked={form.acceptTerms}
                onCheckedChange={(checked) =>
                  update(
                    "acceptTerms",
                    checked === true
                  )
                }
              />

              <Label
                htmlFor="terms"
                className="text-sm font-normal leading-5"
              >
                I agree to BredaBuy's terms and
                privacy policy.
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
                ? "Creating account..."
                : "Create account"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="font-medium text-primary hover:underline"
              >
                Sign in
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
