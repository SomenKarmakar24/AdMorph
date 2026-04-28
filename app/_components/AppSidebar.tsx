"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Home,
  Sparkles,
  ImageIcon,
  Megaphone,
  FolderOpen,
  Clock,
  BarChart3,
  Star,
  Crown,
  User,
  Settings,
  HelpCircle,
  Zap,
  ChevronLeft,
  ChevronRight,
  Plus,
  LogOut,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthContext } from "../provider";
import ProfileAvatar from "./ProfileAvatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/* ── Navigation structure ── */
const mainItems = [
  { title: "Home", url: "/app", icon: Home },
  {
    title: "Creative Tools",
    url: "/creative-ai-tools/product-images",
    icon: Sparkles,
  },
  { title: "My Ads", url: "/creative-ai-tools/my-ads", icon: Megaphone },
];

const workspaceItems = [
  {
    title: "Product Images",
    url: "/creative-ai-tools/product-images",
    icon: ImageIcon,
  },
  {
    title: "Product Videos",
    url: "/creative-ai-tools/product-video",
    icon: FolderOpen,
  },
  {
    title: "Avatar Ads",
    url: "/creative-ai-tools/product-avatar",
    icon: Star,
  },
];

const accountItems = [
  { title: "Upgrade", url: "/upgrade", icon: Crown },
  { title: "Profile", url: "/profile", icon: User },
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Help Center", url: "/help", icon: HelpCircle },
];

/* ── Recent projects mock data ── */
const recentProjects = [
  { name: "Shoe Campaign", color: "bg-violet-500" },
  { name: "Perfume Launch", color: "bg-blue-500" },
  { name: "Burger Promo", color: "bg-orange-500" },
  { name: "Fashion Reel", color: "bg-pink-500" },
];

/* ── Section label ── */
function SectionLabel({
  label,
  collapsed,
}: {
  label: string;
  collapsed: boolean;
}) {
  if (collapsed) return <div className="my-2" />;
  return (
    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-500 px-3 mb-1.5 mt-4 select-none">
      {label}
    </p>
  );
}

/* ── Navigation item ── */
function NavItem({
  item,
  isActive,
  collapsed,
}: {
  item: { title: string; url: string; icon: React.ElementType };
  isActive: boolean;
  collapsed: boolean;
}) {
  const Icon = item.icon;

  const content = (
    <Link
      href={item.url}
      className={`group/nav relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
        isActive
          ? "bg-gradient-to-r from-violet-600/20 to-indigo-600/15 text-white shadow-lg shadow-violet-500/5"
          : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
      } ${collapsed ? "justify-center px-0" : ""}`}
    >
      {/* Active indicator bar */}
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-gradient-to-b from-violet-400 to-indigo-500 shadow-lg shadow-violet-500/50" />
      )}

      <div
        className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300 ${
          isActive
            ? "bg-violet-500/15 text-violet-300"
            : "text-gray-500 group-hover/nav:text-violet-400 group-hover/nav:bg-violet-500/10"
        } ${collapsed ? "w-9 h-9" : ""}`}
      >
        <Icon
          className={`w-[18px] h-[18px] transition-transform duration-300 group-hover/nav:scale-110 ${isActive ? "drop-shadow-[0_0_6px_rgba(139,92,246,0.5)]" : ""}`}
        />
      </div>

      {!collapsed && (
        <span
          className={`text-sm font-medium transition-all duration-300 truncate ${isActive ? "font-semibold" : ""}`}
        >
          {item.title}
        </span>
      )}
    </Link>
  );

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="right" className="text-xs font-medium">
          {item.title}
        </TooltipContent>
      </Tooltip>
    );
  }

  return content;
}

/* ── Main Sidebar Component ── */
export function AppSidebar() {
  const path = usePathname();
  const router = useRouter();
  const { user } = useAuthContext();
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === "collapsed";

  const isActive = (url: string) => {
    if (url === "/app") return path === "/app";
    return path.startsWith(url);
  };

  return (
    <Sidebar collapsible="icon">
      <TooltipProvider delayDuration={0}>
        <div className="flex flex-col h-full sidebar-premium backdrop-blur-xl relative">
          {/* Ambient glow */}
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-violet-600/[0.06] to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-indigo-600/[0.03] to-transparent pointer-events-none" />

          {/* ── Brand Header ── */}
          <SidebarHeader className="relative z-10 px-4 pt-5 pb-3">
            <div
              className={`flex items-center ${collapsed ? "justify-center" : "gap-3"}`}
            >
              {/* Logo orb */}
              <div className="relative flex-shrink-0">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20 animate-glow">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#0a0a0f] shadow-lg shadow-green-400/30" />
              </div>

              {!collapsed && (
                <div className="min-w-0">
                  <h1 className="text-lg font-bold bg-gradient-to-r from-violet-300 via-purple-300 to-indigo-400 bg-clip-text text-transparent leading-tight">
                    AdMorph
                  </h1>
                  <p className="text-[10px] text-gray-500 font-medium tracking-wide">
                    AI Creative Studio
                  </p>
                </div>
              )}
            </div>

            {/* ── CTA Button ── */}
            {!collapsed ? (
              <button
                onClick={() => router.push("/creative-ai-tools/product-images")}
                className="btn-premium w-full mt-4 text-xs py-2.5 rounded-xl"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Creative</span>
              </button>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() =>
                      router.push("/creative-ai-tools/product-images")
                    }
                    className="w-9 h-9 mt-3 mx-auto rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white hover:scale-105 transition-transform shadow-lg shadow-violet-500/20"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" className="text-xs font-medium">
                  New Creative
                </TooltipContent>
              </Tooltip>
            )}
          </SidebarHeader>

          {/* ── Scrollable Content ── */}
          <SidebarContent className="relative z-10 flex-1 overflow-y-auto custom-scrollbar px-3 py-1">
            {/* Main Section */}
            <SectionLabel label="Main" collapsed={collapsed} />
            <div className="space-y-0.5">
              {mainItems.map((item) => (
                <NavItem
                  key={item.title}
                  item={item}
                  isActive={isActive(item.url)}
                  collapsed={collapsed}
                />
              ))}
            </div>

            {/* Workspace Section */}
            <SectionLabel label="Workspace" collapsed={collapsed} />
            <div className="space-y-0.5">
              {workspaceItems.map((item) => (
                <NavItem
                  key={item.title}
                  item={item}
                  isActive={isActive(item.url)}
                  collapsed={collapsed}
                />
              ))}
            </div>

            {/* Recent Projects (expanded only) */}
            {!collapsed && (
              <>
                <SectionLabel label="Recent" collapsed={false} />
                <div className="space-y-0.5 px-1">
                  {recentProjects.map((project) => (
                    <div
                      key={project.name}
                      className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-white/[0.03] transition-all duration-200 cursor-pointer"
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${project.color} flex-shrink-0`}
                      />
                      <span className="text-xs truncate">{project.name}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Credits Widget (expanded only) */}
            {!collapsed && (
              <div className="mt-4 mx-1 p-4 rounded-xl bg-gradient-to-br from-white/[0.05] to-violet-500/[0.03] border border-violet-500/[0.1] shadow-lg shadow-black/10">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    AI Credits
                  </span>
                  <span className="text-[10px] font-bold text-violet-400">
                    78 / 100
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-1000"
                    style={{ width: "78%" }}
                  />
                </div>
                <p className="text-[9px] text-gray-600 mt-1.5">
                  Resets in 12 days
                </p>
              </div>
            )}

            {/* Account Section */}
            <SectionLabel label="Account" collapsed={collapsed} />
            <div className="space-y-0.5">
              {accountItems.map((item) => (
                <NavItem
                  key={item.title}
                  item={item}
                  isActive={isActive(item.url)}
                  collapsed={collapsed}
                />
              ))}
            </div>
          </SidebarContent>

          {/* ── Footer ── */}
          <SidebarFooter className="relative z-10 px-3 pb-4 pt-2 border-t border-violet-500/[0.06]">
            {/* Profile Card */}
            {user ? (
              <div
                className={`flex items-center ${collapsed ? "justify-center" : "gap-3"} p-2.5 rounded-xl bg-gradient-to-r from-white/[0.04] to-violet-500/[0.02] border border-violet-500/[0.08] hover:bg-white/[0.06] hover:border-violet-500/[0.15] transition-all duration-300 cursor-pointer shadow-lg shadow-black/10`}
              >
                <div className="relative flex-shrink-0">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="avatar"
                      className="w-8 h-8 rounded-full ring-2 ring-violet-500/30 shadow-lg shadow-violet-500/10"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                      {user.displayName?.charAt(0) || "U"}
                    </div>
                  )}
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#0a0a0f]" />
                </div>

                {!collapsed && (
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-white truncate">
                      {user.displayName || "User"}
                    </p>
                    <p className="text-[10px] text-gray-500 truncate">
                      Pro Creator
                    </p>
                  </div>
                )}

                {!collapsed && <ProfileAvatar />}
              </div>
            ) : (
              <Link href="/login">
                <button className="btn-premium w-full text-xs py-2.5 rounded-xl">
                  Sign In
                </button>
              </Link>
            )}

            {/* Footer text */}
            {!collapsed && (
              <div className="mt-3 px-1 flex items-center justify-between">
                <p className="text-[9px] text-gray-600">
                  Powered by OpenAI + Replicate
                </p>
                <p className="text-[9px] text-gray-600">v2.1</p>
              </div>
            )}

            {/* Collapse toggle */}
            <button
              onClick={toggleSidebar}
              className={`mt-2 flex items-center justify-center gap-2 w-full py-2 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-white/[0.04] transition-all duration-300 text-xs`}
            >
              {collapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <>
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Collapse</span>
                </>
              )}
            </button>
          </SidebarFooter>
        </div>
      </TooltipProvider>
    </Sidebar>
  );
}
