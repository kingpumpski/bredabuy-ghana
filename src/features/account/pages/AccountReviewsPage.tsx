import { Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { accountReviews } from "../data/account.data";

export default function AccountReviewsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Reviews</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {accountReviews.map((review) => (
          <div
            key={review.id}
            className="rounded-xl border p-5"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-semibold">
                  {review.product}
                </h3>

                <div className="mt-2 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={[
                        "h-4 w-4",
                        index < review.rating
                          ? "fill-current"
                          : "text-muted-foreground",
                      ].join(" ")}
                    />
                  ))}
                </div>
              </div>

              <Badge variant="secondary">
                {review.status}
              </Badge>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              {review.comment}
            </p>

            <p className="mt-2 text-xs text-muted-foreground">
              {review.date}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
