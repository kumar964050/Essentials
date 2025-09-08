import { Link } from "react-router-dom";
import { Shirt, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Shirt className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">
                Essentials
              </span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Quality clothing essentials designed for comfort and style. Simple
              pieces that fit perfectly into your everyday life.
            </p>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Shop</h3>
            <div className="space-y-2">
              <Link
                to="/shirts"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Shirts
              </Link>
              <Link
                to="/pants"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Pants
              </Link>
              <Link
                to="/products"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                All Products
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <div className="space-y-2">
              <Link
                to="#"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Size Guide
              </Link>
              <Link
                to="#"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Returns & Exchanges
              </Link>
              <Link
                to="#"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Shipping Info
              </Link>
              <Link
                to="#"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>hello@essentials.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>123 Fashion St, NY 10001</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Essentials. All rights reserved. Made
            with ❤️ for everyone.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
