import React from "react";
import { brands } from "@/data/mockData";

const BrandShowcase: React.FC = () => {
  return (
    <section className="py-12 md:py-16 border-y border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-lg font-medium text-muted-foreground">
            Trusted by Top Brands
          </h3>
        </div>

        {/* Infinite scroll animation */}
        <div className="relative overflow-hidden">
          <div className="flex animate-[scroll_20s_linear_infinite] gap-12 md:gap-20">
            {[...brands, ...brands].map((brand, index) => (
              <div
                key={`${brand.id}-${index}`}
                className="flex-shrink-0 flex items-center justify-center h-16 w-32 md:w-40 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
              >
                <span className="text-2xl md:text-3xl font-display font-bold text-muted-foreground hover:text-foreground transition-colors">
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default BrandShowcase;
