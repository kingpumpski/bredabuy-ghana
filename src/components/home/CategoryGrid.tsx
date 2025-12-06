import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/mockData";
import { cn } from "@/lib/utils";

const CategoryGrid: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Browse Categories
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of products across all industries in Ghana
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className={cn(
                "group relative overflow-hidden rounded-2xl aspect-square md:aspect-[4/3] animate-fade-in",
                index === 0 && "md:col-span-2 md:row-span-2 md:aspect-square"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end">
                <span className="text-2xl md:text-3xl mb-2">{category.icon}</span>
                <h3 className="text-lg md:text-xl font-display font-bold text-cream mb-1">
                  {category.name}
                </h3>
                <p className="text-cream/70 text-sm">
                  {category.productCount} Products
                </p>

                {/* Arrow */}
                <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-10 h-10 bg-cream/20 backdrop-blur-sm rounded-full flex items-center justify-center transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                  <ArrowRight className="w-5 h-5 text-cream" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
