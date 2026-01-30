import React, { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Palette  } from "lucide-react";


import {
  Home,
  Package,
  Clock,
  Bell,
  User,
  Wallet,
  BarChart3,
  LogOut,
  Menu,
  ChevronLeft,
  Check,
  FileText,
  Users,
  Settings,
  Search,
  Plus,
  ChevronDown,
  ChevronUp,
  X,
  HelpCircle,
  Sparkles,
  BookOpen,
  Calendar,
  CheckSquare,
  Folder,
  MessageSquare,
  GraduationCap,
  ClipboardList,
  StickyNote,
  UserCheck,
  ClipboardCheck,
  UserCog,
} from 'lucide-react';



import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
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
import { ThemeToggle } from '../common/ThemeToggle';

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
  path?: string;   // ✅ optional
  url?: string;    // ✅ optional
  badge?: number;
}


interface NavSection {
  title?: string;
  items: NavItem[];
  collapsible?: boolean;
}

const studentNavSections: NavSection[] = [
  {
    title: 'Navigate',
    items: [
      { icon: Home, label: 'Dashboard', path: '/student/dashboard' },
      { icon: FileText, label: 'Courses', path: '/student/courses' },
      { icon: Clock, label: 'Notes', path: '/student/notes' },
      { icon: Package, label: 'Files', path: '/student/files' },
      { icon: BarChart3, label: 'Grades', path: '/student/grades' },
      { icon: Bell, label: 'Notifications', path: '/student/notifications' },
      { icon: Users, label: 'Friends', path: '/student/friends' },
      { icon: Check, label: 'Calendar', path: '/student/calender' },
      { icon: User, label: 'Learn', path: '/student/learn' },
    ]
  },
  {
    title: 'More',
    collapsible: true,
    items: [
      { icon: FileText, label: 'Language', path: '/language' },
      { icon: HelpCircle, label: 'Help Center', path: '/helpcenter' },
      { icon: Sparkles, label: 'Support', path: '/support' },
    ]
  },
  {
    title: 'Links',
    collapsible: true,
    items: [
      { icon: Package, label: 'Facebook', url: 'https://facebook.com' },
      { icon: Package, label: 'Twitter', url: 'https://twitter.com' },
      { icon: Package, label: 'Instagram', url: 'https://instagram.com' },
      { icon: Package, label: 'LinkedIn', url: 'https://linkedin.com' },
    ]
  }
];

const facultyNavSections: NavSection[] = [
  {
    title: 'Navigate',
    items: [
      { icon: Home, label: 'Dashboard', path: '/faculty/dashboard' },
      { icon: BookOpen, label: 'Courses', path: '/faculty/courses' },
      { icon: Calendar, label: 'Calendar', path: '/faculty/calender' },
      { icon: FileText, label: 'Classes', path: '/faculty/classes' },
      { icon: BarChart3, label: 'Analytics', path: '/faculty/analytics' },
      { icon: Users, label: 'Students', path: '/faculty/students' },
    ],
  },

  {
    title: 'Academic Tools',
    items: [
      { icon: Folder, label: 'Files', path: '/faculty/files' },
      { icon: MessageSquare, label: 'Feedback', path: '/faculty/feedback' },
      { icon: Bell, label: 'Notifications', path: '/faculty/notifications' },
    ],
  },

  {
    title: 'Student Data',
    collapsible: true,
    items: [
      { icon: CheckSquare, label: 'Student Attendance', path: '/faculty/attendance' },
      { icon: StickyNote, label: 'Student Notes', path: '/faculty/student-notes' },
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
    title: 'Academic Management',
    items: [
      { icon: BookOpen, label: 'Courses', path: '/admin/courses-data' },
      { icon: Calendar, label: 'Timetable', path: '/admin/timetable' },
    ],
  },

  {
    title: 'Student Management',
    items: [
      { icon: Users, label: 'Students', path: '/admin/students' },
      { icon: UserCheck, label: 'Student Details', path: '/admin/student-detail' },
    ],
  },

  {
    title: 'Faculty Management',
    items: [
      { icon: GraduationCap, label: 'Faculty Data', path: '/admin/faculties' },
      { icon: ClipboardCheck, label: 'Faculty Attendance', path: '/admin/faculty-attendance' },
      { icon: Folder, label: 'Faculty Files', path: '/admin/faculty-files' },
      { icon: MessageSquare, label: 'Faculty Feedback', path: '/admin/faculty-feedback' },
      { icon: UserCog, label: 'Faculty Detail', path: '/admin/faculty-detail' },
    ],
  },

  {
    title: 'Communication',
    items: [
      { icon: Bell, label: 'Notifications', path: '/admin/notifications' },
    ],
  },
];


const mobileNavItems: NavItem[] = [
  { icon: Home, label: 'Home', path: '/student/dashboard' },
  { icon: FileText, label: 'Projects', path: '/student/courses' },
  { icon: Clock, label: 'Time', path: '/student/attendance' },
  { icon: BarChart3, label: 'Stats', path: '/student/grades' },
  { icon: User, label: 'Profile', path: '/student/profile' },
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
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['Navigate']));
  const [accountExpanded, setAccountExpanded] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  


  const role = user?.role ?? 'faculty';

  const navSections =
    role === 'faculty'
      ? facultyNavSections
      : role === 'admin'
      ? adminNavSections
      : studentNavSections;

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    if (!searchOpen) return;

    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (
        target.closest('[data-search-wrapper]') ||
        target.closest('[data-header-actions]')
      ) {
        return;
      }

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

  // Sidebar Content Component
  const SidebarContent = ({ onNavigate }: { onNavigate?: () => void }) => (
    <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground">

      {/* Logo */}
      <div className="h-16 px-4 flex items-center">
        <button className="flex items-center gap-3 w-full" onClick={() => {
          navigate('/');
          onNavigate?.();
        }}>
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0">
            <Package className="w-5 h-5 text-foreground" />
          </div>
          <div className="leading-tight text-left">
            <h1 className="text-sm font-semibold text-foreground tracking-tight">
              {role === 'admin' ? 'Constructor X' : 'CONNECT STUDENT'}
            </h1>
            <p className="text-[11px] text-foreground/50">
              {role.charAt(0).toUpperCase() + role.slice(1)} Portal
            </p>
          </div>
        </button>
      </div>


      {/* Navigation Sections */}
      <nav className="flex-1 px-3 space-y-6 overflow-y-auto custom-scrollbar">
        {navSections.map((section, sectionIdx) => {
          const isExpanded = !section.collapsible || expandedSections.has(section.title || '');
          
          return (
            <div key={sectionIdx}>
              {section.title && (
                <button
                  onClick={() => section.collapsible && toggleSection(section.title!)}
                  className="flex items-center justify-between w-full px-3 mb-2 group hover:opacity-100 transition-opacity"
                >
                  <span className="text-[11px] font-medium text-foreground/40 uppercase tracking-wider">
                    {section.title}
                  </span>
                  {section.collapsible && (
                    <ChevronUp
                      className={cn(
                        "w-3.5 h-3.5 text-foreground/40 transition-transform duration-200",
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
                        window.open(item.url, '_blank'); // 🌍 external
                      } else if (item.path) {
                        navigate(item.path);             // 🧭 internal
                      }
                      onNavigate?.();
                    }}
                    className={cn(
                      "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all duration-200 group",
                      isActive(item.path)
                        ? "bg-white/10 text-foreground"
                        : "text-muted-foreground/80     hover:text-sidebar-foreground hover:bg-sidebar-accent hover:bg-white/5 hover:text-foreground"
                    )}
                  >
                    <item.icon className="w-[18px] h-[18px] shrink-0" />
                    <span className="text-[13px] font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto text-[11px] px-1.5 py-0.5 bg-red-500 text-foreground rounded">
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



      {/* Expandable Account Section */}
      <div className="border-t border-white/5">
        <button
          onClick={() => setAccountExpanded(!accountExpanded)}
          className="flex items-center gap-3 w-full px-4 py-3 hover:bg-white/5 transition-colors"
        >
          <Avatar className="w-9 h-9 ring-2 ring-white/10">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-foreground text-sm font-medium">
              {user?.name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 text-left min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{user?.name || 'John Smith'}</p>
            <p className="text-xs text-foreground/50 truncate">{user?.email || 'johnsmith@gmail.com'}</p>
          </div>
          <ChevronDown
            className={cn(
              "w-4 h-4 text-foreground/40 shrink-0 transition-transform duration-200",
              accountExpanded && "rotate-180"
            )}
          />
        </button>

        {/* Expanded Account Menu */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            accountExpanded ? "max-h-80" : "max-h-0"
          )}
        >
          <div className="px-3 py-2 space-y-1">

            {/* View Profile */}
            <button
              onClick={() => {
                navigate(`/${role}/profile`);
                onNavigate?.();
              }}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-muted-foreground/80     hover:text-sidebar-foreground hover:bg-sidebar-accent hover:bg-white/5 hover:text-foreground transition-all"
            >
              <User className="w-4 h-4" />
              <span className="text-sm">View Profile</span>
            </button>

            {/* Theme Toggle as Button (Mobile) */}
            <div className="lg:hidden">
              <div
                className="flex items-center justify-between w-full px-3 py-0.8 rounded-lg
                          text-muted-foreground/80     hover:text-sidebar-foreground hover:bg-sidebar-accent hover:bg-white/5 hover:text-foreground transition-all"
              >
                <div className="flex items-center gap-3">
                  <Palette className="w-4 h-4 text-muted-foreground/80     hover:text-sidebar-foreground hover:bg-sidebar-accent group-hover:text-foreground transition-colors" />
                  <span className="text-sm">Theme</span>
                </div>
                <ThemeToggle />
              </div>
            </div>

            {/* Settings */}
            <button
              onClick={() => {
                navigate(`/settings`);
                onNavigate?.();
              }}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-muted-foreground/80     hover:text-sidebar-foreground hover:bg-sidebar-accent hover:bg-white/5 hover:text-foreground transition-all"
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm">Settings</span>
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-lg
                        text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Logout</span>
            </button>

          </div>
        </div>
      </div>
    </div>
  );

  // Notification Dropdown Component
  const NotificationDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 text-muted-foreground/80     hover:text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground hover:bg-muted"
        >
          <Bell className="w-4 h-4" />
          {unreadNotifications.length > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-80 bg-[#1a1a1a] border-white/10 p-0"
      >
        <DropdownMenuLabel className="px-3 py-2 text-foreground">
          Notifications
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-white/10" />

        {/* Notifications list */}
        <div className="max-h-80 overflow-y-auto custom-scrollbar">
          {notifications.slice(0, 5).map((notif) => (
            <DropdownMenuItem
              key={notif.id}
              className="flex items-start gap-3 px-3 py-3 text-foreground/80
                        hover:text-foreground focus:text-foreground
                        hover:bg-white/5 focus:bg-white/5"
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  {notif.title}
                </p>
                <p className="text-xs text-foreground/50 mt-0.5">
                  {notif.message}
                </p>
              </div>
            </DropdownMenuItem>
          ))}
        </div>

        <DropdownMenuSeparator className="bg-white/10" />

        {/* View all */}
        <DropdownMenuItem
          className="
            justify-center py-2 text-sm cursor-pointer
            text-primary
            hover:bg-white/5 focus:bg-white/5
            hover:text-primary focus:text-primary
          "

          onClick={() => navigate(`/${role}/notifications`)}
        >
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );


  // Mobile Layout
  if (isMobile) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
        {/* Mobile Header */}
        <header className="sticky top-0 z-40 bg-[#0f0f0f] border-b border-white/5">
          <div className="flex items-center justify-between h-14 px-4">
            <div className="flex items-center gap-3">
              {showBack ? (
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-muted-foreground/80     hover:text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground">
                  <ChevronLeft className="w-5 h-5" />
                </button>
              ) : (
                <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 text-muted-foreground/80     hover:text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground">
                  <Menu className="w-5 h-5" />
                </button>
              )}
              <h1 className="text-base font-semibold text-foreground">{title}</h1>
            </div>
            <div className="flex items-center gap-1">
              {headerRight}
              <ThemeToggle />
              <NotificationDropdown />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto pb-20 p-4">
          {children}
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#1a1a1a] border-t border-white/5 safe-bottom">
          <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
            {mobileNavItems.map((item) => {
              const active = isActive(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-0 flex-1",
                    active ? "text-foreground" : "text-muted-foreground/80     hover:text-sidebar-foreground hover:bg-sidebar-accent"
                  )}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  <span className="text-[10px] font-medium truncate w-full text-center">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Mobile Sidebar Sheet */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="w-72 p-0 bg-[#1a1a1a] border-white/10">
            <SidebarContent onNavigate={() => setSidebarOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
    );
  }

// Desktop Layout
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 h-screen bg-sidebar text-sidebar-foreground border-r border-white/10">
        <SidebarContent />
      </aside>

      {/* Tablet Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-72 p-0 bg-[#1a1a1a] border-white/10 lg:hidden">
          <SidebarContent onNavigate={() => setSidebarOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Desktop/Tablet Header */}
        <header className="sticky top-0 z-30 bg-background border-b border-border">
          {/* UPDATED: Changed px-6 to px-4 to remove the gap and align with sidebar */}
          <div className="flex items-center h-16 px-4 gap-4">
            {/* LEFT */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-9 w-9 text-muted-foreground/80     hover:text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground hover:bg-muted"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>

              {showBack && (
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 -ml-2 text-muted-foreground/80     hover:text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              {title && (
                <h1 className="text-lg font-semibold text-foreground whitespace-nowrap">
                  {title}
                </h1>
              )}
            </div>

            {/* ✅ FLEX SPACER */}
            <div className="flex-1" />

            {/* RIGHT */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Search */}
              <div data-search-wrapper className="relative flex items-center">
                {!searchOpen && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-muted-foreground/80     hover:text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground hover:bg-muted"
                    onClick={() => setSearchOpen(true)}
                  >
                    <Search className="w-5 h-5" />
                  </Button>
                )}

                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-out",
                    searchOpen ? "w-[240px] opacity-100" : "w-0 opacity-0"
                  )}
                >
                  <div className="relative ml-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                    <input
                      autoFocus
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Escape' && setSearchOpen(false)}
                      placeholder="Search..."
                      className="h-10 w-full pl-10 pr-10 bg-white/5 border border-white/10 rounded-lg text-sm text-foreground placeholder:text-foreground/40 focus:outline-none"
                    />
                    <button
                      onClick={() => setSearchOpen(false)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              <ThemeToggle />
              <NotificationDropdown />

              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-muted-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground hover:bg-muted"
                onClick={() => navigate(`/support`)}
              >
                <HelpCircle className="w-4 h-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-muted-foreground/80    hover:text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground hover:bg-muted"
                onClick={() => navigate(`/settings`)}
              >
                <Settings className="w-4 h-4" />
              </Button>

              <Avatar
                className="w-9 h-9 ring-2 ring-white/10 cursor-pointer hidden lg:flex"
                onClick={() => navigate(`/${role}/profile`)}
              >
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-foreground">
                  {user?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {/* UPDATED: Changed p-6 to p-4 to match the header alignment */}
          <div className="p-4 w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
