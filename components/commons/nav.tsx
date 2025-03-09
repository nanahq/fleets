"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { usePathname } from "next/navigation";

interface NavLink {
    path: string;
    title: string;
    label?: string;
    icon: LucideIcon;
}

interface NavBarProps {
    links: NavLink[];
}

export function NavBar({ links }: NavBarProps) {
    const pathname = usePathname();

    return (
        <div className="bg-slate-100  p-4">
            <nav className="flex flex-col gap-2">
                {links.map((link) => {
                    const isActive = pathname === link.path;

                    return (
                        <Link
                            key={link.path}
                            href={link.path}
                            data-testid={`Dashboard.Nav.Link_${link.title}`}
                            className={cn(
                                buttonVariants({
                                    variant: isActive ? "default" : "ghost",
                                    size: "sm",
                                }),
                                "justify-start h-10 px-4 w-full",
                                isActive && "bg-primary text-primary-foreground font-medium",
                                !isActive && "hover:bg-slate-100 dark:hover:bg-slate-800"
                            )}
                        >
                            <link.icon className="mr-3 h-4 w-4" />
                            <span className="truncate">{link.title}</span>
                            {link.label && (
                                <span className={cn(
                                    "ml-auto px-2 py-0.5 rounded-full text-xs font-medium",
                                    isActive
                                        ? "bg-primary-foreground/20 text-primary-foreground"
                                        : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200"
                                )}>
                  {link.label}
                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}