import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: 1,
    title: "Shop Ghana's Best",
    subtitle: "Quality Products, Delivered",
    description: "Discover authentic Ghanaian products and global brands at unbeatable prices.",
    cta: "Shop Now",
    ctaLink: "/products",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200",
    gradient: "from-primary/90 to-secondary/80",
  },
  {
    id: 2,
    title: "Electronics Sale",
    subtitle: "Up to 30% Off",
    description: "Latest smartphones, laptops, and gadgets with warranty and fast delivery.",
    cta: "View Deals",
    ctaLink: "/deals",
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1200",
    gradient: "from-secondary/90 to-charcoal/80",
  },
  {
    id: 3,
    title: "Fashion Forward",
    subtitle: "New Collection",
    description: "Traditional Kente, modern styles, and everything in between.",
    cta: "Explore Fashion",
    ctaLink: "/products?category=fashion",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200",
    gradient: "from-accent/90 to-primary/80",
  },
];

const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback((index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-all duration-700 ease-out",
            index === currentSlide
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105 pointer-events-none"
          )}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className={cn("absolute inset-0 bg-gradient-to-r", slide.gradient)} />
          </div>

          {/* Content */}
          <div className="relative h-full container mx-auto px-4 flex items-center">
            <div className="max-w-xl text-cream">
              <span
                className={cn(
                  "inline-block px-4 py-1.5 bg-cream/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4",
                  index === currentSlide && "animate-slide-up"
                )}
              >
                {slide.subtitle}
              </span>
              <h1
                className={cn(
                  "text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 leading-tight",
                  index === currentSlide && "animate-slide-up stagger-1"
                )}
              >
                {slide.title}
              </h1>
              <p
                className={cn(
                  "text-lg md:text-xl text-cream/90 mb-8",
                  index === currentSlide && "animate-slide-up stagger-2"
                )}
              >
                {slide.description}
              </p>
              <Link
                to={slide.ctaLink}
                className={cn(
                  "inline-block",
                  index === currentSlide && "animate-slide-up stagger-3"
                )}
              >
                <Button variant="hero" size="xl">
                  {slide.cta}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-cream/20 hover:bg-cream/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft className="w-6 h-6 text-cream" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-cream/20 hover:bg-cream/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
      >
        <ChevronRight className="w-6 h-6 text-cream" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              index === currentSlide
                ? "w-8 bg-cream"
                : "w-2 bg-cream/40 hover:bg-cream/60"
            )}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
