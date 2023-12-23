"use client";

import { useEffect, useState } from "react";
import { Navbar } from "./_components/navbar";
import Sidebar from "./_components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  if (!domLoaded) {
    return;
  }

  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="h-full hidden md:flex flex-col w-56 fixed inset-y-0 border-r z-50 ">
        <Sidebar />
      </div>
      <main className="h-full pt-[80px] md:pl-56">{children}</main>
    </div>
  );
};

export default DashboardLayout;
