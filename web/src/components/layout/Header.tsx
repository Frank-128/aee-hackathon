import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Zap,
  Search,
  ChevronDown,
  Leaf,
  Users,
  BarChart3,
  Wallet,
  Globe,
  HelpCircle,
  Settings,
  Truck,
  LayoutDashboard,
  LineChart,
} from "lucide-react";

interface DropdownItem {
  icon: React.ElementType;
  label: string;
  description: string;
  href?: string;
  badge?: string;
}

interface NavDropdownProps {
  label: string;
  items: {
    title?: string;
    items: DropdownItem[];
  }[];
}

const NavDropdown = ({ label, items }: NavDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  let closeTimer: any;

  const openDropdown = () => {
    if (closeTimer) clearTimeout(closeTimer);
    setIsOpen(true);
  };

  const closeDropdown = () => {
    closeTimer = setTimeout(() => setIsOpen(false), 80);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center gap-1 px-2 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        onMouseEnter={openDropdown}
        onMouseLeave={closeDropdown}
        onClick={() => setIsOpen((p) => !p)}
      >
        {label}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-0 mt-1 min-w-[300px] bg-card border border-border rounded-lg shadow-xl z-50"
          onMouseEnter={openDropdown}
          onMouseLeave={closeDropdown}
        >
          <div className="p-4">
            {items.map((section, i) => (
              <div key={i} className={i > 0 ? "mt-4 pt-4 border-t border-border" : ""}>
                {section.title && (
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                    {section.title}
                  </p>
                )}
                <div className="space-y-1">
                  {section.items.map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.href || "#"}
                      className="flex items-start gap-3 p-2 rounded-lg hover:bg-secondary transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                        <item.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{item.label}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const farmerDropdown: NavDropdownProps = {
    label: "Farmers",
    items: [
      {
        title: "Farmer Tools",
        items: [
          { icon: LayoutDashboard, label: "Dashboard", description: "Crop & profit overview", href: "/farmer/dashboard" },
          { icon: Leaf, label: "Crop Advisory", description: "What to grow & when", href: "/farmer/crops" },
          { icon: Wallet, label: "Pricing", description: "Suggested selling prices", href: "/farmer/pricing" },
        ],
      },
    ],
  };

  const buyerDropdown: NavDropdownProps = {
    label: "Buyers",
    items: [
      {
        title: "Buyer Marketplace",
        items: [
          { icon: Users, label: "Browse Farmers", description: "Verified producers", href: "/buyer/farmers" },
          { icon: BarChart3, label: "Market Prices", description: "Live price insights", href: "/buyer/prices" },
          { icon: Truck, label: "Orders", description: "Purchase & delivery tracking", href: "/buyer/orders" },
        ],
      },
    ],
  };

  const intelligenceDropdown: NavDropdownProps = {
    label: "Market Intelligence",
    items: [
      {
        title: "AI Insights",
        items: [
          { icon: LineChart, label: "Price Prediction", description: "Demand–supply analysis", href: "/intel/prices" },
          { icon: BarChart3, label: "Demand Trends", description: "Buyer demand patterns", href: "/intel/demand" },
        ],
      },
    ],
  };

  const adminDropdown: NavDropdownProps = {
    label: "Platform",
    items: [
      {
        title: "Administration",
        items: [
          { icon: LayoutDashboard, label: "Admin Panel", description: "System overview", href: "/admin/dashboard" },
          { icon: Settings, label: "Settings", description: "Roles & configurations", href: "/admin/settings" },
        ],
      },
    ],
  };

  const resourcesDropdown: NavDropdownProps = {
    label: "Resources",
    items: [
      {
        items: [
          { icon: Globe, label: "Knowledge Hub", description: "Farming guides & insights", href: "/resources/guides" },
          { icon: HelpCircle, label: "Help Center", description: "Support & FAQs", href: "/help" },
        ],
      },
    ],
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-background/90 backdrop-blur border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">
              AGRI CONNECT
            </span>

          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            <NavDropdown {...farmerDropdown} />
            <NavDropdown {...buyerDropdown} />
            <NavDropdown {...intelligenceDropdown} />
            <NavDropdown {...adminDropdown} />
            <NavDropdown {...resourcesDropdown} />
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Search className="w-5 h-5" />
            </Button>
            <Link to="/register">
              <Button
                className="
                  border border-primary 
                  text-primary 
                  bg-transparent 
                  hover:bg-transparent 
                  hover:text-primary 
                  focus:bg-transparent
                " size="sm">Register</Button>
            </Link>
            <Link to="/login">
              <Button size="sm">Login</Button>
            </Link>

          </div>

          {/* Mobile Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border space-y-2">
            <Link to="/farmer/dashboard"><Button variant="ghost" className="w-full">Farmers</Button></Link>
            <Link to="/buyer/farmers"><Button variant="ghost" className="w-full">Buyers</Button></Link>
            <Link to="/intel/prices"><Button variant="ghost" className="w-full">Market Intelligence</Button></Link>
            <Link to="/admin/dashboard"><Button variant="ghost" className="w-full">Platform</Button></Link>

            <div className="pt-4 border-t border-border">
              <Link to="/login"><Button variant="outline" className="w-full">Login</Button></Link>
              <Link to="/register">
                <Button className="w-full">Sign Up</Button>
              </Link>

            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
