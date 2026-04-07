import * as React from "react";
import { 
  FileText, 
  Store, 
  Package, 
  Users, 
  BarChart3, 
  ChevronDown,
  Check,
  ExternalLink,
  LayoutGrid
} from "lucide-react";

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText,
  Store,
  Package,
  Users,
  BarChart3,
};

export interface AppDefinition {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: string;
  status: "live" | "coming-soon" | "beta";
}

export interface AppSwitcherProps {
  /** The ID of the current app (to highlight it) */
  currentAppId?: string;
  /** List of available apps */
  apps: AppDefinition[];
  /** Portal URL for "all apps" link */
  portalUrl?: string;
  /** Additional CSS classes */
  className?: string;
  /** Button variant */
  variant?: "default" | "compact";
}

// Simple styles (no external CSS needed, works with Tailwind)
const styles = {
  container: "relative inline-block",
  button: {
    default: "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors",
    compact: "flex items-center gap-1.5 p-1.5 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors",
  },
  dropdown: "absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-50",
  appItem: "flex items-start gap-3 p-3 hover:bg-slate-50 transition-colors cursor-pointer",
  appItemCurrent: "bg-indigo-50 hover:bg-indigo-100",
  iconWrapper: "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
  iconWrapperActive: "bg-indigo-100 text-indigo-600",
  iconWrapperInactive: "bg-slate-100 text-slate-500",
  checkIcon: "w-4 h-4 text-indigo-600 shrink-0",
};

export function AppSwitcher({
  currentAppId,
  apps,
  portalUrl,
  className = "",
  variant = "default",
}: AppSwitcherProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on Escape key
  React.useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // currentApp is available for potential future use (e.g., showing current app name in button)
  // const currentApp = apps.find((app) => app.id === currentAppId);

  return (
    <div ref={containerRef} className={`${styles.container} ${className}`}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={variant === "compact" ? styles.button.compact : styles.button.default}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        {variant === "default" ? (
          <>
            <LayoutGrid className="w-4 h-4" />
            <span>Apps</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </>
        ) : (
          <>
            <LayoutGrid className="w-5 h-5" />
          </>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className={styles.dropdown} role="menu">
          {/* Apps List */}
          <div className="py-1">
            {apps.map((app) => {
              const Icon = iconMap[app.icon] || FileText;
              const isCurrentApp = app.id === currentAppId;
              const isLive = app.status === "live";

              return (
                <a
                  key={app.id}
                  href={isLive ? app.url : "#"}
                  onClick={(e) => {
                    if (!isLive) {
                      e.preventDefault();
                      return;
                    }
                    setIsOpen(false);
                  }}
                  className={`${styles.appItem} ${isCurrentApp ? styles.appItemCurrent : ""}`}
                  role="menuitem"
                >
                  {/* Icon */}
                  <div
                    className={`${styles.iconWrapper} ${
                      isCurrentApp ? styles.iconWrapperActive : styles.iconWrapperInactive
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-900">{app.name}</span>
                      {isCurrentApp && <Check className={styles.checkIcon} />}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{app.description}</p>
                  </div>

                  {/* Status Badge */}
                  {app.status === "coming-soon" && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 rounded">
                      Soon
                    </span>
                  )}
                  {app.status === "beta" && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-700 rounded">
                      Beta
                    </span>
                  )}
                </a>
              );
            })}
          </div>

          {/* Portal Link */}
          {portalUrl && (
            <div className="border-t border-slate-100">
              <a
                href={portalUrl}
                className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <LayoutGrid className="w-4 h-4" />
                View All Apps
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Default apps configuration
export const DEFAULT_APPS: AppDefinition[] = [
  {
    id: "requisition",
    name: "Requisitions",
    description: "Purchase requests & approvals",
    url: process.env.NEXT_PUBLIC_REQUISITION_URL || "https://req.easypeasy.com",
    icon: "FileText",
    status: "live",
  },
  {
    id: "store-manager",
    name: "Store Manager",
    description: "Inventory & sales management",
    url: process.env.NEXT_PUBLIC_STORE_MANAGER_URL || "https://store.easypeasy.com",
    icon: "Store",
    status: "live",
  },
];

export default AppSwitcher;