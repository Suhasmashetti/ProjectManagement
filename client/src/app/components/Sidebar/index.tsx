"use client";
import { useState } from "react";
import Image from "next/image";
import { AlertCircle, AlertOctagon, AlertTriangle, Briefcase, ChevronDown, ChevronUp, Home, Layers3, LockIcon, LucideIcon, Search, Settings, ShieldAlert, User, Users, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../redux";
import Link from "next/link";
import { setIsSidebarCollapsed } from "@/src/state";

const Sidebar = () => {
  const [showProjects, setShowProjects] = useState(true);
  const [showPriority, setShowPriority] = useState(true);
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const sidebarClassNames = `fixed flex flex-col h-full justify-between shadow-xl transition-all duration-300 z-40 dark:bg-black overflow-y-auto bg-white ${
    isSidebarCollapsed ? "w-0 hidden" : "w-64"
  }`;

  return (
    <div className={sidebarClassNames}>
      {/* Top logo */}
      <div className="flex h-full w-full flex-col justify-start">
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
          <div className="text-xl font-bold text-gray-800 dark:text-white">
            EDLIST
          </div>
          {!isSidebarCollapsed && (
            <button
              className="py-3"
              onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
            >
              <X className="h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white" />
            </button>
          )}
        </div>

        {/* Team section */}
        <div className="flex items-center gap-5 border-y border-gray-200 px-8 py-4 dark:border-gray-700">
          <Image src="/logo.svg" alt="logo" width={40} height={20} />
          <div>
            <h3 className="text-md font-bold tracking-wide dark:text-gray-200">
              Suhas Team
            </h3>
            <div className="mt-1 flex items-center gap-2">
              <LockIcon className="h-3 w-3 text-gray-500 dark:text-white " />
              <p className="text-xs text-gray-500 dark:text-white">Private</p>
            </div>
          </div>
        </div>

        {/* Navbar Links */}
        <nav className="z-10 w-full">
          <SidebarLink icon={Home} label="Home" href="/" />
          <SidebarLink icon={Briefcase} label="Timeline" href="/timeline" />
          <SidebarLink icon={Search} label="Search" href="/search" />
          <SidebarLink icon={Settings} label="Settings" href="/settings" />
          <SidebarLink icon={User} label="Users" href="/user" />
          <SidebarLink icon={Users} label="Teams" href="/teams" />
        </nav>
        <button onClick={() => setShowProjects((prev) => !prev)}
            className="flex w-full items-center justify-between px-6 py-3 text-gray-500 dark:text-white">
                <span className="">Projects</span>
                {showProjects ? (
                    <ChevronUp className="h-5 w-5" />
                ): (
                    <ChevronDown className = "h-5 w-5"/>
                )}
            </button>
            <button onClick={() => setShowPriority((prev) => !prev)}
            className="flex w-full items-center justify-between px-6 py-3 text-gray-500 dark:text-white">
                <span className="">Priority</span>
                {showPriority ? (
                    <ChevronUp className="h-5 w-5" />
                ): (
                    <ChevronDown className = "h-5 w-5"/>
                )}
            </button>
            {showPriority && (
                <> 
                <SidebarLink icon={AlertCircle} label="Urgent" href="/priority/urgent"/> 
                <SidebarLink icon={ShieldAlert} label="High" href="/priority/high"/> 
                <SidebarLink icon={AlertTriangle} label="Medium" href="/priority/medium"/> 
                <SidebarLink icon={AlertOctagon} label="Low" href="/priority/low"/> 
                <SidebarLink icon={Layers3} label="Urgent" href="/priority/backlog"/> 

                </>
            )}
      </div>
    </div>
  );
};

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex cursor-pointer items-center gap-3 px-6 py-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${
          isActive ? "bg-gray-100 dark:bg-gray-600" : ""
        }`}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-full w-[5px] bg-blue-400" />
        )}
        <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
        <span className="font-medium text-gray-800 dark:text-gray-100">
          {label}
        </span>
      </div>
    </Link>
  );
};

export default Sidebar;
