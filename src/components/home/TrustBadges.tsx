import React from "react";
import { Truck, Shield, CreditCard, HeadphonesIcon } from "lucide-react";

const badges = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Free shipping on orders over GH₵500",
  },
  {
    icon: Shield,
    title: "Secure Shopping",
    description: "100% secure payment processing",
  },
  {
    icon: CreditCard,
    title: "Flexible Payments",
    description: "Mobile Money, Bank & COD",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Round the clock assistance",
  },
];

const TrustBadges: React.FC = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {badges.map((badge, index) => (
            <div
              key={badge.title}
              className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left p-4 rounded-2xl hover:bg-muted/50 transition-colors duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <badge.icon className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-foreground mb-1">
                  {badge.title}
                </h4>
                <p className="text-sm text-muted-foreground">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
