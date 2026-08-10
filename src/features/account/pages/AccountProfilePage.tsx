import { Mail, Phone, User } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useAuthStore } from "@/features/auth/store/auth.store";

export default function AccountProfilePage() {
  const user = useAuthStore((state) => state.user);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-9"
                defaultValue={
                  user?.name ||
                  [user?.firstName, user?.lastName]
                    .filter(Boolean)
                    .join(" ")
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-9"
                type="email"
                defaultValue={user?.email || ""}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-9"
                defaultValue={user?.phone || ""}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button>
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
