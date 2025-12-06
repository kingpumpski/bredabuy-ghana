import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-cream">
      {/* Newsletter Section */}
      <div className="bg-gradient-gold py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-primary-foreground/80 mt-1">
                Get exclusive deals and updates delivered to your inbox
              </p>
            </div>
            <form className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-80 px-4 py-3 rounded-full bg-card text-foreground border-0 focus:ring-2 focus:ring-primary-foreground outline-none"
              />
              <Button variant="secondary" className="rounded-full px-6">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-gold rounded-xl flex items-center justify-center">
                <span className="text-xl font-bold text-primary-foreground">B</span>
              </div>
              <span className="text-xl font-display font-bold">
                Breda<span className="text-primary">Buy</span>
              </span>
            </Link>
            <p className="text-cream/70 mb-6 leading-relaxed">
              Ghana's premier e-commerce platform. We connect buyers and sellers
              across all industries, delivering quality products to your doorstep.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-cream/10 hover:bg-primary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: "All Products", path: "/products" },
                { name: "Categories", path: "/categories" },
                { name: "Today's Deals", path: "/deals" },
                { name: "New Arrivals", path: "/products?filter=new" },
                { name: "Best Sellers", path: "/products?filter=best" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-cream/70 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-display font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-3">
              {[
                { name: "Help Center", path: "/help" },
                { name: "Track Order", path: "/track-order" },
                { name: "Returns & Refunds", path: "/returns" },
                { name: "Payment Methods", path: "/payments" },
                { name: "Shipping Info", path: "/shipping" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-cream/70 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-display font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <span className="text-cream/70">
                  123 Independence Avenue, Accra, Ghana
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-cream/70">+233 20 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-cream/70">support@bredabuy.com</span>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-sm text-cream/50 mb-2">Accepted Payments</p>
              <div className="flex gap-2">
                <div className="px-3 py-1 bg-cream/10 rounded text-xs font-medium">
                  Mobile Money
                </div>
                <div className="px-3 py-1 bg-cream/10 rounded text-xs font-medium">
                  Bank Transfer
                </div>
                <div className="px-3 py-1 bg-cream/10 rounded text-xs font-medium">
                  COD
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cream/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-cream/50 text-sm text-center md:text-left">
              © {currentYear} BredaBuy. All rights reserved. Made with ❤️ in Ghana.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-cream/50 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-cream/50 hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
