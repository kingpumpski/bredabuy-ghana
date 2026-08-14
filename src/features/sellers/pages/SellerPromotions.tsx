import { useMemo, useState } from "react";
import { Megaphone, Plus, Search, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const initialCampaigns = [
  { id: "PROMO-001", name: "Weekend Price Drop", type: "Percentage discount", value: "10%", status: "Active", reach: "All shoppers" },
  { id: "PROMO-002", name: "New Customer Welcome", type: "Fixed discount", value: "GH₵20", status: "Scheduled", reach: "New customers" },
  { id: "PROMO-003", name: "Clearance Boost", type: "Featured placement", value: "Catalogue boost", status: "Draft", reach: "Selected products" },
];

export default function SellerPromotions() {
  const [query, setQuery] = useState("");
  const campaigns = useMemo(() => initialCampaigns.filter((item) => `${item.name} ${item.type} ${item.id}`.toLowerCase().includes(query.toLowerCase())), [query]);
  return <div className="space-y-6">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm font-medium text-primary">Seller Centre</p><h1 className="text-3xl font-bold tracking-tight">Promotions</h1><p className="mt-1 text-muted-foreground">Create campaigns that improve product visibility and conversion.</p></div><Button><Plus className="mr-2 h-4 w-4" />Create promotion</Button></div>
    <div className="grid gap-4 sm:grid-cols-3"><Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Active campaigns</p><p className="mt-2 text-2xl font-bold">1</p></CardContent></Card><Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Scheduled</p><p className="mt-2 text-2xl font-bold">1</p></CardContent></Card><Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Draft campaigns</p><p className="mt-2 text-2xl font-bold">1</p></CardContent></Card></div>
    <Card><CardContent className="p-4"><div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(e) => setQuery(e.target.value)} className="pl-9" placeholder="Search promotions" /></div></CardContent></Card>
    <Card><CardHeader><CardTitle className="flex items-center gap-2"><Megaphone className="h-5 w-5" />Campaigns</CardTitle></CardHeader><CardContent className="space-y-3">{campaigns.map((item) => <div key={item.id} className="flex flex-col gap-4 rounded-xl border p-4 md:flex-row md:items-center md:justify-between"><div className="flex gap-3"><div className="rounded-lg bg-primary/10 p-3"><Tag className="h-5 w-5 text-primary" /></div><div><p className="font-semibold">{item.name}</p><p className="text-sm text-muted-foreground">{item.type} · {item.value} · {item.reach}</p><p className="mt-1 text-xs text-muted-foreground">{item.id}</p></div></div><Badge variant={item.status === "Active" ? "default" : "secondary"}>{item.status}</Badge></div>)}{campaigns.length === 0 && <p className="py-10 text-center text-sm text-muted-foreground">No promotions match your search.</p>}</CardContent></Card>
  </div>;
}
