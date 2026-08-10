import { Bell } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { accountNotifications } from "../data/account.data";

export default function AccountNotificationsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notifications
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {accountNotifications.map((notification) => (
          <div
            key={notification.id}
            className={[
              "rounded-xl border p-4",
              !notification.read ? "bg-primary/5" : "",
            ].join(" ")}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">
                    {notification.title}
                  </h3>

                  {!notification.read && (
                    <Badge variant="secondary">
                      New
                    </Badge>
                  )}
                </div>

                <p className="mt-1 text-sm text-muted-foreground">
                  {notification.message}
                </p>
              </div>

              <span className="whitespace-nowrap text-xs text-muted-foreground">
                {notification.date}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
