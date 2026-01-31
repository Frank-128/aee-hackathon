import React, { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  Package,
  MessageCircle,
  ShoppingCart,
  Wallet,
  Leaf,
  Layers,
  Truck,
  Sparkles,
  CloudSun,
  BookOpen,
  Bell,
  HelpCircle,
  Settings,
  LogOut,
  Menu,
  ChevronLeft,
  Search,
  X,
  Heart,
  Star,
  Users,
  ShieldCheck,
  UserCheck,
  FileText,
  ClipboardList,
  CreditCard,
  AlertTriangle,
  MapPin,
  FileSearch,
  Megaphone,
  BarChart3,
  MessageSquare,
  Clock,
  User,
  ChevronDown,
  ChevronUp,
  Palette,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { notifications } from '@/data/mockData';

interface ResponsiveLayoutProps {
  children: ReactNode;
  title?: string;
  showBack?: boolean;
  headerRight?: ReactNode;
  showSearch?: boolean;
  onAddNew?: () => void;
  addNewLabel?: string;
}

interface NavItem {
  icon: React.ElementType;
  label: string;
  path?: string;
  url?: string;
  badge?: number;
}

interface NavSection {
  title?: string;
  items: NavItem[];
  collapsible?: boolean;
}

// Navigation configurations remain the same
const farmerNavSections: NavSection[] = [
  {
    title: "Dashboard",
    items: [
      { icon: Home, label: "Home", path: "/farmer/dashboard" },
      { icon: Package, label: "My Products", path: "/farmer/products" },
      { icon: MessageCircle, label: "Messages", path: "/farmer/messages" },
      { icon: ShoppingCart, label: "Orders", path: "/farmer/orders" },
      { icon: Wallet, label: "Earnings", path: "/farmer/earnings" },
    ],
  },
  {
    title: "Farm Management",
    items: [
      { icon: Leaf, label: "Nearby Farmers", path: "/farmer/nearby-farmers" },
      { icon: Layers, label: "Inventory", path: "/farmer/inventory" },
      { icon: Truck, label: "Delivery", path: "/farmer/delivery" },
    ],
  },
  {
    title: "AI & Insights",
    items: [
      { icon: Sparkles, label: "Market Insights", path: "/farmer/insights" },
      { icon: CloudSun, label: "Weather Alerts", path: "/farmer/weather" },
      { icon: BookOpen, label: "Learn", path: "/farmer/learn" },
    ],
  },
];

const buyerNavSections: NavSection[] = [
  {
    title: "Navigate",
    items: [
      { icon: Home, label: "Dashboard", path: "/buyer/dashboard" },
      { icon: Search, label: "Explore Market", path: "/buyer/market" },
      { icon: ShoppingCart, label: "My Orders", path: "/buyer/orders" },
      { icon: Heart, label: "Wishlist", path: "/buyer/wishlist" },
    ],
  },
  {
    title: "Purchasing",
    items: [
      { icon: Wallet, label: "Payments", path: "/buyer/payments" },
      { icon: FileText, label: "Invoices", path: "/buyer/invoices" },
      { icon: Truck, label: "Delivery Tracking", path: "/buyer/tracking" },
    ],
  },
  {
    title: "Community",
    items: [
      { icon: MessageCircle, label: "Messages", path: "/buyer/messages" },
      { icon: Star, label: "Reviews", path: "/buyer/reviews" },
      { icon: Users, label: "Farmers", path: "/buyer/farmers" },
    ],
  },
];

const adminNavSections: NavSection[] = [
  {
    title: 'Overview',
    items: [
      { icon: Home, label: 'Dashboard', path: '/admin/dashboard' },
      { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
    ],
  },
  {
    title: 'User Management',
    items: [
      { icon: Users, label: 'Farmers', path: '/admin/farmers' },
      { icon: UserCheck, label: 'Buyers', path: '/admin/buyers' },
      { icon: ShieldCheck, label: 'Verification', path: '/admin/verifications' },
    ],
  },
  {
    title: 'Marketplace',
    items: [
      { icon: Package, label: 'Products', path: '/admin/products' },
      { icon: ClipboardList, label: 'Listings', path: '/admin/listings' },
      { icon: ShoppingCart, label: 'Orders', path: '/admin/orders' },
    ],
  },
  {
    title: 'Transactions',
    collapsible: true,
    items: [
      { icon: CreditCard, label: 'Payments', path: '/admin/payments' },
      { icon: FileText, label: 'Invoices', path: '/admin/invoices' },
      { icon: AlertTriangle, label: 'Disputes', path: '/admin/disputes' },
    ],
  },
];

const mobileNavItems: NavItem[] = [
  { icon: Home, label: 'Home', path: '/dashboard' },
  { icon: Search, label: 'Search', path: '/search' },
  { icon: ShoppingCart, label: 'Orders', path: '/orders' },
  { icon: MessageCircle, label: 'Messages', path: '/messages' },
  { icon: User, label: 'Profile', path: '/profile' },
];

export function ResponsiveLayout({
  children,
  title,
  showBack = false,
  headerRight,
  showSearch = true,
  onAddNew,
  addNewLabel = 'Add New'
}: ResponsiveLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['Navigate', 'Dashboard']));
  const [accountExpanded, setAccountExpanded] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const role = user?.role ?? 'farmer';

  const navSections =
    role === 'admin'
      ? adminNavSections
      : role === 'buyer'
        ? buyerNavSections
        : farmerNavSections;

  const isActive = (path?: string) => path ? location.pathname === path : false;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    if (!searchOpen) return;

    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-search-wrapper]') || target.closest('[data-header-actions]')) return;
      setSearchOpen(false);
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [searchOpen]);

  const toggleSection = (title: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(title)) {
      newExpanded.delete(title);
    } else {
      newExpanded.add(title);
    }
    setExpandedSections(newExpanded);
  };

  const unreadNotifications = notifications.filter(n => !n.read);

  // ============ SIDEBAR CONTENT ============
  const SidebarContent = ({ onNavigate }: { onNavigate?: () => void }) => (
    <div className="flex flex-col h-full bg-gradient-to-b from-emerald-50 to-green-50 dark:from-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100">
      {/* Logo Section */}
      <div className="h-20 px-4 flex items-center border-b border-emerald-100 dark:border-slate-800">
        <button
          className="flex items-center gap-3 w-full group hover:opacity-80 transition-opacity"
          onClick={() => {
            navigate('/');
            onNavigate?.();
          }}
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shrink-0 shadow-lg group-hover:shadow-emerald-500/30">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div className="leading-tight text-left">
            <h1 className="text-sm font-bold text-emerald-700 dark:text-emerald-400 tracking-tight">
              {role === 'admin' ? 'AgriAdmin' : 'RIHNO'}
            </h1>
            <p className="text-[11px] text-emerald-600/60 dark:text-emerald-500/50 font-medium">
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </p>
          </div>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-4 overflow-y-auto custom-scrollbar">
        {navSections.map((section, idx) => {
          const isExpanded = !section.collapsible || expandedSections.has(section.title || '');

          return (
            <div key={idx} className="space-y-1.5">
              {section.title && (
                <button
                  onClick={() => section.collapsible && toggleSection(section.title!)}
                  className="flex items-center justify-between w-full px-3 py-2 group hover:opacity-75 transition-opacity"
                >
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">
                    {section.title}
                  </span>
                  {section.collapsible && (
                    <ChevronUp
                      className={cn(
                        "w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500 transition-transform duration-200",
                        !isExpanded && "rotate-180"
                      )}
                    />
                  )}
                </button>
              )}

              <div className={cn(
                "space-y-0.5 transition-all duration-200 overflow-hidden",
                !isExpanded && "max-h-0"
              )}>
                {section.items.map((item) => (
                  <button
                    key={item.path ?? item.url}
                    onClick={() => {
                      if (item.url) {
                        window.open(item.url, '_blank');
                      } else if (item.path) {
                        navigate(item.path);
                      }
                      onNavigate?.();
                    }}
                    className={cn(
                      "flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-all duration-200 group",
                      isActive(item.path)
                        ? "bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-md font-medium"
                        : "text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-white/50 dark:hover:bg-slate-800/50"
                    )}
                  >
                    <item.icon className="w-[18px] h-[18px] shrink-0" />
                    <span className="text-[13px] font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto text-[11px] px-2 py-0.5 bg-red-500 text-white rounded-lg font-bold">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Account Section */}
      <div className="border-t border-emerald-100 dark:border-slate-800 bg-white dark:bg-slate-800/50">
        <button
          onClick={() => setAccountExpanded(!accountExpanded)}
          className="flex items-center gap-3 w-full px-4 py-3 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors"
        >
          <Avatar className="w-9 h-9 ring-2 ring-emerald-200 dark:ring-emerald-500/30">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-green-600 text-white text-sm font-bold">
              {user?.name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 text-left min-w-0">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">{user?.name || 'User'}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.email || 'user@email.com'}</p>
          </div>
          <ChevronDown
            className={cn(
              "w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0 transition-transform duration-200",
              accountExpanded && "rotate-180"
            )}
          />
        </button>

        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out border-t border-emerald-100 dark:border-slate-800",
            accountExpanded ? "max-h-80" : "max-h-0"
          )}
        >
          <div className="px-3 py-2 space-y-1 bg-emerald-50/50 dark:bg-slate-900/50">
            <button
              onClick={() => {
                navigate(`/${role}/profile`);
                onNavigate?.();
              }}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-white dark:hover:bg-slate-800 transition-all"
            >
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">View Profile</span>
            </button>

            <div className="lg:hidden flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400">
              <Palette className="w-4 h-4" />
              <span className="text-sm font-medium">Theme</span>
            </div>

            <button
              onClick={() => {
                navigate(`/settings`);
                onNavigate?.();
              }}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-white dark:hover:bg-slate-800 transition-all"
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm font-medium">Settings</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // ============ NOTIFICATION DROPDOWN ============
  const NotificationDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-10 w-10 rounded-xl text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-slate-800 transition-colors"
        >
          <Bell className="w-5 h-5" />
          {unreadNotifications.length > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80 rounded-2xl">
        <DropdownMenuLabel className="px-4 py-3 text-emerald-700 dark:text-emerald-400 font-bold">
          Notifications
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <div className="max-h-96 overflow-y-auto custom-scrollbar">
          {notifications.slice(0, 5).map((notif) => (
            <DropdownMenuItem
              key={notif.id}
              className="flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-emerald-50 dark:hover:bg-slate-800"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {notif.title}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {notif.message}
                </p>
              </div>
            </DropdownMenuItem>
          ))}
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="justify-center py-3 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-800 cursor-pointer"
          onClick={() => navigate(`/${role}/notifications`)}
        >
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // ============ MOBILE LAYOUT ============
  if (isMobile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white dark:from-slate-950 dark:to-slate-900 text-slate-900 dark:text-slate-100 flex flex-col">
        {/* Mobile Header */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-emerald-100 dark:border-slate-800">
          <div className="flex items-center justify-between h-16 px-4 gap-3">
            <div className="flex items-center gap-3">
              {showBack ? (
                <button onClick={() => navigate(-1)} className="p-1.5 -ml-1.5 text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400">
                  <ChevronLeft className="w-6 h-6" />
                </button>
              ) : (
                <button onClick={() => setSidebarOpen(true)} className="p-1.5 -ml-1.5 text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400">
                  <Menu className="w-6 h-6" />
                </button>
              )}
              <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">{title}</h1>
            </div>
            <div className="flex items-center gap-2">
              {headerRight}
              <NotificationDropdown />
            </div>
          </div>
        </header>

        {/* Mobile Content */}
        <main className="flex-1 overflow-y-auto pb-24 px-4 py-4">
          {children}
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-emerald-100 dark:border-slate-800">
          <div className="flex items-center justify-around h-20 max-w-lg mx-auto px-2">
            {mobileNavItems.map((item) => {
              const active = isActive(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path || '/')}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1.5 px-3 py-2 rounded-xl transition-all min-w-0 flex-1",
                    active
                      ? "text-emerald-600 dark:text-emerald-400 font-semibold"
                      : "text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                  )}
                >
                  <item.icon className="w-6 h-6 shrink-0" />
                  <span className="text-[10px] font-semibold truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Mobile Sidebar */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="w-72 p-0 bg-transparent border-r border-emerald-100 dark:border-slate-800">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <SheetDescription className="sr-only">
              Mobile navigation sidebar for the application.
            </SheetDescription>
            <SidebarContent onNavigate={() => setSidebarOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
    );
  }

  // ============ DESKTOP/TABLET LAYOUT ============
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 h-screen bg-gradient-to-b from-emerald-50 to-green-50 dark:from-slate-900 dark:to-slate-950 border-r border-emerald-100 dark:border-slate-800 sticky top-0 overflow-hidden">
        <SidebarContent />
      </aside>

      {/* Tablet Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-72 p-0 bg-transparent border-r border-emerald-100 dark:border-slate-800 lg:hidden">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Navigation sidebar for tablet and desktop views.
          </SheetDescription>
          <SidebarContent onNavigate={() => setSidebarOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-emerald-100 dark:border-slate-800">
          <div className="flex items-center h-16 px-4 lg:px-6 gap-4">
            {/* Left Section */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-10 w-10 rounded-xl text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-slate-800"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>

              {showBack && (
                <button
                  onClick={() => navigate(-1)}
                  className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {title && (
                <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 whitespace-nowrap">
                  {title}
                </h1>
              )}
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Right Section */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Search */}
              <div data-search-wrapper className="relative flex items-center">
                {!searchOpen && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-xl text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-slate-800"
                    onClick={() => setSearchOpen(true)}
                  >
                    <Search className="w-5 h-5" />
                  </Button>
                )}

                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-out",
                    searchOpen ? "w-[260px] opacity-100" : "w-0 opacity-0"
                  )}
                >
                  <div className="relative ml-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      autoFocus
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Escape' && setSearchOpen(false)}
                      placeholder="Search..."
                      className="h-10 w-full pl-10 pr-10 bg-emerald-50 dark:bg-slate-800 border border-emerald-100 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                    />
                    <button
                      onClick={() => setSearchOpen(false)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <NotificationDropdown />

              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-xl text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-slate-800"
                onClick={() => navigate(`/support`)}
              >
                <HelpCircle className="w-5 h-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-xl text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-slate-800"
                onClick={() => navigate(`/settings`)}
              >
                <Settings className="w-5 h-5" />
              </Button>

              <Avatar
                className="w-10 h-10 ring-2 ring-emerald-200 dark:ring-emerald-500/30 cursor-pointer hover:ring-emerald-300 dark:hover:ring-emerald-400/50 transition-all hidden lg:flex"
                onClick={() => navigate(`/${role}/profile`)}
              >
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-green-600 text-white font-bold">
                  {user?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 w-full max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}