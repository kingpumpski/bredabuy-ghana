import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Clock, ArrowRight, Flame } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { discountedProducts } from "@/data/mockData";
import { Button } from "@/components/ui/button";

const DealsSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-accent/10 via-primary/5 to-secondary/10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center animate-pulse-gold">
              <Flame className="w-7 h-7 text-accent-foreground" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                Flash Deals
              </h2>
              <p className="text-muted-foreground">
                Grab these deals before they're gone!
              </p>
            </div>
          </div>

          {/* Countdown */}
          <div className="flex items-center gap-3 bg-card rounded-2xl p-4 shadow-soft">
            <Clock className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium text-muted-foreground">Ends in:</span>
            <div className="flex gap-2">
              {[
                { value: timeLeft.hours, label: "H" },
                { value: timeLeft.minutes, label: "M" },
                { value: timeLeft.seconds, label: "S" },
              ].map((item, index) => (
                <React.Fragment key={item.label}>
                  <div className="bg-charcoal text-cream rounded-lg px-3 py-2 min-w-[48px] text-center">
                    <span className="text-lg font-bold font-display">
                      {String(item.value).padStart(2, "0")}
                    </span>
                    <span className="text-xs ml-1">{item.label}</span>
                  </div>
                  {index < 2 && (
                    <span className="text-2xl font-bold text-charcoal">:</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {discountedProducts.slice(0, 4).map((product, index) => (
            <div
              key={product.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} showDiscount />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/deals">
            <Button variant="hero" className="group">
              View All Deals
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
