import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import ProfileAvatar from "./ProfileAvatar";

function AppHeader() {
  return (
    <div className="relative z-20 p-4 flex items-center justify-between w-full header-premium">
      <SidebarTrigger />
      <ProfileAvatar />
    </div>
  );
}

export default AppHeader;
