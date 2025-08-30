import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  LayoutDashboard, 
  FileText, 
  TrendingUp, 
  Eye, 
  Settings, 
  Bell,
  Search,
  Menu,
  X,
  Sun,
  Moon
} from "lucide-react";

interface NavigationProps {
  activeView: string;
  onViewChange: (view: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export function Navigation({ activeView, onViewChange, isDarkMode, onToggleDarkMode }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'filings', label: 'Form 4 Filings', icon: FileText, badge: '47' },
    { id: 'portfolio', label: 'Portfolio', icon: TrendingUp },
    { id: 'watchlist', label: 'Watchlist', icon: Eye, badge: '24' },
  ];

  const NavButton = ({ item, mobile = false }: { item: typeof navigationItems[0], mobile?: boolean }) => (
    <Button
      variant={activeView === item.id ? "default" : "ghost"}
      className={`justify-start ${mobile ? 'w-full' : ''}`}
      onClick={() => {
        onViewChange(item.id);
        if (mobile) setMobileMenuOpen(false);
      }}
    >
      <item.icon className="h-4 w-4 mr-2" />
      {item.label}
      {item.badge && (
        <Badge variant="secondary" className="ml-auto">
          {item.badge}
        </Badge>
      )}
    </Button>
  );

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-border lg:bg-card">
        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex items-center h-16 px-4 border-b border-border">
            <h2 className="text-lg font-semibold">SEC Tracker</h2>
          </div>
          
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navigationItems.map((item) => (
              <NavButton key={item.id} item={item} />
            ))}
          </nav>

          <div className="p-4 border-t border-border space-y-2">
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={onToggleDarkMode}
            >
              {isDarkMode ? (
                <>
                  <Sun className="h-4 w-4 mr-2" />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4 mr-2" />
                  Dark Mode
                </>
              )}
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between h-16 px-4 border-b border-border bg-card">
          <h2 className="text-lg font-semibold">SEC Tracker</h2>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onToggleDarkMode}
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setMobileMenuOpen(false)} />
            <div className="fixed top-0 right-0 bottom-0 w-64 bg-card border-l border-border">
              <div className="flex items-center justify-between h-16 px-4 border-b border-border">
                <h2 className="text-lg font-semibold">Menu</h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <nav className="flex-1 px-4 py-4 space-y-2">
                {navigationItems.map((item) => (
                  <NavButton key={item.id} item={item} mobile />
                ))}
              </nav>

              <div className="p-4 border-t border-border space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={onToggleDarkMode}
                >
                  {isDarkMode ? (
                    <>
                      <Sun className="h-4 w-4 mr-2" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="h-4 w-4 mr-2" />
                      Dark Mode
                    </>
                  )}
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Top Bar for larger screens */}
      <div className="hidden lg:block lg:pl-64">
        <div className="flex items-center justify-between h-16 px-6 border-b border-border bg-card">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search companies, tickers..."
                className="pl-10 pr-4 py-2 w-80 bg-muted border-0 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onToggleDarkMode}
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}