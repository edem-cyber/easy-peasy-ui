"use client";

import * as React from "react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Button } from "./button";
import { Check, LayoutGrid, Store, FileText, Users, BarChart3 } from "lucide-react";

export interface AppDefinition {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string; }>;
  url: string;
  description?: string;
  status?: "live" | "coming-soon" | "beta";
}

export const DEFAULT_APPS: AppDefinition[] = [
  {
    id: "portal",
    name: "Portal",
    icon: LayoutGrid,
    url: "https://easy-peasy-portal.vercel.app",
    description: "Dashboard overview",
    status: "live",
  },
  {
    id: "requisition",
    name: "Requisitions",
    icon: FileText,
    url: "https://requisition.easypeasy.com",
    description: "Procurement management",
    status: "live",
  },
  {
    id: "store",
    name: "Store Manager",
    icon: Store,
    url: "https://store.easypeasy.com",
    description: "Inventory & sales",
    status: "live",
  },
  {
    id: "hr",
    name: "HR",
    icon: Users,
    url: "https://hr.easypeasy.com",
    description: "Human resources",
    status: "coming-soon",
  },
  {
    id: "analytics",
    name: "Analytics",
    icon: BarChart3,
    url: "https://analytics.easypeasy.com",
    description: "Reports & insights",
    status: "beta",
  },
];

export interface AppSwitcherProps {
  currentAppId?: string;
  apps?: AppDefinition[];
  portalUrl?: string;
  className?: string;
  variant?: "default" | "compact";
}

export function AppSwitcher({
  currentAppId = "requisition",
  apps = DEFAULT_APPS,
  portalUrl = "https://easy-peasy-portal.vercel.app",
  className = "",
  variant = "default",
}: AppSwitcherProps) {
  const [open, setOpen] = useState(false);

  const currentApp = apps.find(app => app.id === currentAppId) || apps[0];
  const CurrentIcon = currentApp.icon;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={variant === "compact" ? "icon" : "default"}
          className={`gap-2 ${className}`}
        >
          <CurrentIcon className="h-4 w-4" />
          {variant !== "compact" && <span className="hidden md:inline">{currentApp.name}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5 text-xs font-semibold text-slate-500">
          Switch Application
        </div>
        {apps.map((app) => {
          const Icon = app.icon;
          const isActive = app.id === currentAppId;
          const isLive = app.status === "live";

          return (
            <DropdownMenuItem
              key={app.id}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => {
                if (isLive) {
                  window.location.href = app.url;
                }
              }}
            >
              <Icon className="h-4 w-4 text-slate-600" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="font-medium">{app.name}</div>
                  {app.status === "beta" && (
                    <span className="px-1 py-0.5 text-[10px] font-medium bg-indigo-100 text-indigo-700 rounded">
                      Beta
                    </span>
                  )}
                  {app.status === "coming-soon" && (
                    <span className="px-1 py-0.5 text-[10px] font-medium bg-amber-100 text-amber-700 rounded">
                      Soon
                    </span>
                  )}
                </div>
                {app.description && (
                  <div className="text-xs text-slate-500">{app.description}</div>
                )}
              </div>
              {isActive && <Check className="h-4 w-4 text-indigo-600" />}
            </DropdownMenuItem>
          );
        })}
        <div className="border-t mt-1 pt-1">
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              window.location.href = portalUrl;
            }}
          >
            <LayoutGrid className="h-4 w-4 mr-3 text-slate-600" />
            View All Apps
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}