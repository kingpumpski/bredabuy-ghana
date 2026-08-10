import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { accountOrders } from "../data/account.data";

export default function AccountOrdersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Orders</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {accountOrders.map((order) => (
          <div
            key={order.id}
            className="rounded-xl border p-4"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-semibold">{order.id}</p>
                <p className="text-sm text-muted-foreground">
                  Placed {order.date}
                </p>
                <p className="mt-1 text-sm">
                  {order.items} item(s)
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant="secondary">
                  {order.status}
                </Badge>

                <span className="font-semibold">
                  GH₵ {order.total.toLocaleString()}
                </span>

                <Button asChild variant="outline" size="sm">
                  <Link to={`/account/orders/${order.id}`}>
                    View
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
