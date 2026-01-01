import { NavLink } from 'react-router-dom';
import { Zap, LayoutDashboard, Map, MessageSquare, Rocket, FileText } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/heatmap', label: 'Investment Heatmap', icon: Map },
  { to: '/regulatory', label: 'Regulatory AI', icon: MessageSquare },
  { to: '/startups', label: 'Startup Portal', icon: Rocket },
  { to: '/reports', label: 'Reports', icon: FileText },
];

export function TopNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card">
      <div className="container flex h-16 items-center">
        <NavLink to="/" className="flex items-center gap-2.5 mr-8">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold tracking-tight text-foreground">
            CleanAxis
          </span>
        </NavLink>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-secondary text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <div className="text-xs text-muted-foreground">
            Last updated: 29 December 2025
          </div>
          <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
            <span className="text-xs font-medium text-accent-foreground">EN</span>
          </div>
        </div>
      </div>
    </header>
  );
}
