import { Link } from "react-router-dom";
import { Zap, Mail, Phone, MapPin, Leaf } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">
              AGRI CONNECT
            </span>
            </div>
            <p className="text-muted-foreground text-sm">
              An AI-enabled farmer–buyer marketplace delivering real-time market
              intelligence, transparent pricing, and direct agricultural trade.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Platform
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "Farmers", href: "/farmer/dashboard" },
                { label: "Buyers", href: "/buyer/farmers" },
                { label: "Market Intelligence", href: "/intel/prices" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Resources
            </h4>
            <ul className="space-y-2">
              {[
                "Knowledge Hub",
                "Help Center",
                "Terms of Service",
                "Privacy Policy",
              ].map((item) => (
                <li key={item}>
                  <span className="text-muted-foreground hover:text-primary transition-colors text-sm cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail className="w-4 h-4 text-primary" />
                support@agriconnect.ai
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Phone className="w-4 h-4 text-primary" />
                +91 1800-XXX-XXXX
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                India
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2026 AGRI CONNECT. All rights reserved.
            <br />
            Building transparent, AI-powered agricultural marketplaces.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
