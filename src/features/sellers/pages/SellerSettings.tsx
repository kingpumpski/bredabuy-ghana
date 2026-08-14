import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Store, Bell, ShieldCheck, Truck } from "lucide-react";

export default function SellerSettings() {
  const [saved, setSaved] = useState(false);
  const [orderAlerts, setOrderAlerts] = useState(true);
  const [reviewAlerts, setReviewAlerts] = useState(true);

  const save = () => { setSaved(true); window.setTimeout(() => setSaved(false), 2500); };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div><h1 className="text-2xl font-bold tracking-tight">Store Settings</h1><p className="text-muted-foreground">Manage your seller profile, fulfilment preferences and notifications.</p></div>
      <Card><CardHeader><div className="flex items-center gap-3"><Store className="h-5 w-5" /><div><CardTitle>Store profile</CardTitle><CardDescription>Information customers see about your store.</CardDescription></div></div></CardHeader><CardContent className="grid gap-4 sm:grid-cols-2"><div className="space-y-2"><Label htmlFor="store-name">Store name</Label><Input id="store-name" defaultValue="BredaBuy Seller Store" /></div><div className="space-y-2"><Label htmlFor="business-name">Business name</Label><Input id="business-name" defaultValue="BredaBuy Marketplace Seller" /></div><div className="space-y-2 sm:col-span-2"><Label htmlFor="store-description">Store description</Label><Input id="store-description" defaultValue="Quality products from trusted sellers." /></div></CardContent></Card>
      <Card><CardHeader><div className="flex items-center gap-3"><Truck className="h-5 w-5" /><div><CardTitle>Fulfilment preferences</CardTitle><CardDescription>Configure how orders are prepared for dispatch.</CardDescription></div></div></CardHeader><CardContent className="space-y-4"><div className="space-y-2"><Label htmlFor="processing-time">Default processing time</Label><Input id="processing-time" type="number" min="0" defaultValue="2" /><p className="text-xs text-muted-foreground">Business days before an order is ready for dispatch.</p></div></CardContent></Card>
      <Card><CardHeader><div className="flex items-center gap-3"><Bell className="h-5 w-5" /><div><CardTitle>Notifications</CardTitle><CardDescription>Choose which seller events require your attention.</CardDescription></div></div></CardHeader><CardContent className="space-y-5"><div className="flex items-center justify-between"><div><p className="font-medium">New order alerts</p><p className="text-sm text-muted-foreground">Notify me when a new seller order arrives.</p></div><Switch checked={orderAlerts} onCheckedChange={setOrderAlerts} /></div><Separator /><div className="flex items-center justify-between"><div><p className="font-medium">Review alerts</p><p className="text-sm text-muted-foreground">Notify me when customers review my products.</p></div><Switch checked={reviewAlerts} onCheckedChange={setReviewAlerts} /></div></CardContent></Card>
      <Card><CardHeader><div className="flex items-center gap-3"><ShieldCheck className="h-5 w-5" /><div><CardTitle>Account security</CardTitle><CardDescription>Security controls remain managed by the main account system.</CardDescription></div></div></CardHeader><CardContent><Button variant="outline">Review account security</Button></CardContent></Card>
      <div className="flex items-center justify-end gap-3"><span className="text-sm text-muted-foreground" aria-live="polite">{saved ? "Settings saved" : ""}</span><Button onClick={save}>Save settings</Button></div>
    </div>
  );
}
