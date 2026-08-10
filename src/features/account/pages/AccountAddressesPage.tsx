import { MapPin, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { accountAddresses } from "../data/account.data";

export default function AccountAddressesPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Address Book</CardTitle>

        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Address
        </Button>
      </CardHeader>

      <CardContent className="grid gap-4 md:grid-cols-2">
        {accountAddresses.map((address) => (
          <div
            key={address.id}
            className="rounded-xl border p-5"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="font-semibold">
                  {address.label}
                </span>
              </div>

              {address.isDefault && (
                <Badge variant="secondary">
                  Default
                </Badge>
              )}
            </div>

            <div className="mt-4 space-y-1 text-sm">
              <p className="font-medium">
                {address.recipient}
              </p>
              <p>{address.phone}</p>
              <p>{address.address}</p>
              <p>
                {address.city}, {address.region}
              </p>
            </div>

            <div className="mt-5 flex gap-2">
              <Button variant="outline" size="sm">
                Edit
              </Button>

              {!address.isDefault && (
                <Button variant="ghost" size="sm">
                  Make Default
                </Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
