import { HelpCircle, Mail, MessageCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AccountSupportPage() {
  const channels = [
    {
      title: "Live Chat",
      description: "Chat with our support team.",
      icon: MessageCircle,
      action: "Start Chat",
    },
    {
      title: "Email Support",
      description: "Send us a detailed support request.",
      icon: Mail,
      action: "Contact Support",
    },
    {
      title: "Phone Support",
      description: "Speak directly with a BredaBuy agent.",
      icon: Phone,
      action: "Call Support",
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Customer Support
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
            Need help with an order, payment, delivery or seller?
            Our support team is ready to assist you.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {channels.map((channel) => {
          const Icon = channel.icon;

          return (
            <Card key={channel.title}>
              <CardContent className="p-6">
                <Icon className="h-7 w-7 text-primary" />

                <h3 className="mt-4 font-semibold">
                  {channel.title}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {channel.description}
                </p>

                <Button
                  className="mt-5 w-full"
                  variant="outline"
                >
                  {channel.action}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
