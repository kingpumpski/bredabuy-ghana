import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Star, Search, MessageSquare, TrendingUp } from "lucide-react";

interface Review { id: string; product: string; customer: string; rating: number; comment: string; date: string; replied: boolean; }
const reviews: Review[] = [
  { id: "RV-001", product: "Wireless Earbuds Pro", customer: "Verified customer", rating: 5, comment: "Excellent sound quality and fast delivery.", date: "12 Aug 2026", replied: true },
  { id: "RV-002", product: "Smart Fitness Watch", customer: "Verified customer", rating: 4, comment: "Good product. Battery could last a little longer.", date: "10 Aug 2026", replied: false },
  { id: "RV-003", product: "Portable Blender", customer: "Verified customer", rating: 5, comment: "Exactly as described and well packaged.", date: "08 Aug 2026", replied: false },
];

export default function SellerReviews() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => reviews.filter((review) => `${review.product} ${review.comment}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const average = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold tracking-tight">Reviews</h1><p className="text-muted-foreground">Monitor customer feedback and respond to product reviews.</p></div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card><CardContent className="flex items-center gap-3 p-5"><Star className="h-5 w-5 fill-current" /><div><p className="text-sm text-muted-foreground">Average rating</p><p className="text-2xl font-bold">{average.toFixed(1)} / 5</p></div></CardContent></Card>
        <Card><CardContent className="flex items-center gap-3 p-5"><MessageSquare className="h-5 w-5" /><div><p className="text-sm text-muted-foreground">Total reviews</p><p className="text-2xl font-bold">{reviews.length}</p></div></CardContent></Card>
        <Card><CardContent className="flex items-center gap-3 p-5"><TrendingUp className="h-5 w-5" /><div><p className="text-sm text-muted-foreground">Response rate</p><p className="text-2xl font-bold">{Math.round((reviews.filter((r) => r.replied).length / reviews.length) * 100)}%</p></div></CardContent></Card>
      </div>
      <Card><CardHeader><CardTitle>Customer feedback</CardTitle></CardHeader><CardContent className="space-y-4">
        <div className="relative max-w-md"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search reviews..." className="pl-9" /></div>
        <div className="space-y-3">{filtered.map((review) => <div key={review.id} className="rounded-lg border p-4"><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><p className="font-semibold">{review.product}</p><p className="text-sm text-muted-foreground">{review.customer} · {review.date}</p></div><Badge variant={review.replied ? "default" : "secondary"}>{review.replied ? "Replied" : "Needs response"}</Badge></div><div className="mt-3 flex items-center gap-1">{Array.from({ length: 5 }, (_, i) => <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-current" : "text-muted-foreground"}`} />)}</div><p className="mt-2 text-sm">{review.comment}</p>{!review.replied && <Button variant="outline" size="sm" className="mt-3">Respond</Button>}</div>)}</div>
        {filtered.length === 0 && <div className="py-10 text-center text-muted-foreground">No reviews match your search.</div>}
      </CardContent></Card>
    </div>
  );
}
