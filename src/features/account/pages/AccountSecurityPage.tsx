import {
  ShieldCheck,
  KeyRound,
  Smartphone,
  MailCheck,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { useAuthStore } from "@/features/auth/store/auth.store";

const AccountSecurityPage = () => {
  const user = useAuthStore(
    (state) => state.user
  );

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Security
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage your BredaBuy account security
          and verification status.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MailCheck className="h-5 w-5" />
              Email verification
            </CardTitle>
          </CardHeader>

          <CardContent>
            {user.emailVerified ? (
              <Badge>
                Verified
              </Badge>
            ) : (
              <Badge variant="secondary">
                Verification required
              </Badge>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Phone verification
            </CardTitle>
          </CardHeader>

          <CardContent>
            {user.phoneVerified ? (
              <Badge>
                Verified
              </Badge>
            ) : (
              <Badge variant="secondary">
                Verification required
              </Badge>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" />
              Multi-factor authentication
            </CardTitle>
          </CardHeader>

          <CardContent>
            {user.mfaEnabled ? (
              <Badge>
                Enabled
              </Badge>
            ) : (
              <Badge variant="secondary">
                Not enabled
              </Badge>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <KeyRound className="h-5 w-5" />
              Password
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-sm text-muted-foreground">
              Password changes and recovery are
              handled through BredaBuy's secure
              authentication workflow.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountSecurityPage;
