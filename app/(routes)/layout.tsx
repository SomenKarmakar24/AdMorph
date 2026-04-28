import React from "react";
import AppProvider from "./provider";

function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppProvider>{children}</AppProvider>;
}

export default AppLayout;
