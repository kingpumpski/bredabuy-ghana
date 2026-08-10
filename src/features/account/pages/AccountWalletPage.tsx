import { ArrowDownLeft, ArrowUpRight, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AccountWalletPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-3 text-primary">
              <Wallet className="h-6 w-6" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Available Balance
              </p>
              <p className="text-3xl font-bold">
                GH₵ 450.00
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button>
              Fund Wallet
            </Button>

            <Button variant="outline">
              Withdraw
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {[
            {
              title: "Wallet top-up",
              amount: "+ GH₵ 500",
              positive: true,
            },
            {
              title: "Order payment",
              amount: "- GH₵ 50",
              positive: false,
            },
          ].map((transaction) => (
            <div
              key={transaction.title}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="flex items-center gap-3">
                {transaction.positive ? (
                  <ArrowDownLeft className="h-4 w-4 text-green-600" />
                ) : (
                  <ArrowUpRight className="h-4 w-4 text-red-600" />
                )}

                <span>{transaction.title}</span>
              </div>

              <span className="font-semibold">
                {transaction.amount}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
