"use client"
import { useState, useEffect } from 'react';
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // // Handle scroll animation and blur effect
    // useEffect(() => {
    //     const header = document.querySelector('header');
    //     if (header) {
    //         setTimeout(() => {
    //             header.style.transform = 'translateY(0)';
    //             header.style.opacity = '1';
    //         }, 600);
    //     }
    // }, []);

    // Handle mobile menu animations
    const listItems = [
        { href: "#features", label: "Features" },
        { href: "#pricing", label: "Pricing" },
        { href: "#", label: "Contact Us" }
    ];

    return (
        <>
            <header className="fixed left-0 top-0 z-50 w-full translate-y-[-1rem] animate-fade-in border-b  backdrop-blur-[12px] py-5 bg-background/70 [--animation-delay:600ms]">
                <div className="container flex h-[3.5rem] items-center justify-between">
                    <a className="text-md flex items-center mr-4" href="/">
                       <img src="/image/fleet-black.png" width={100} height={40} />
                    </a>

                    <nav className="hidden md:flex items-center space-x-6">
                        {listItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="text-sm transition-colors hover:text-gray-500"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    <div className="ml-auto flex h-full items-center">
                        <a className="mr-6 text-sm" href="/login">
                            Log in
                        </a>
                        <a
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none  bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2 mr-6 text-sm"
                            href="/create-account"
                        >
                            Sign up
                        </a>
                    </div>

                    <button
                        className="ml-6 md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span className="sr-only">Toggle menu</span>
                        <Menu className="h-6 w-6" />
                    </button>
                </div>
            </header>

            {/* Mobile Navigation Menu */}
            <nav className={cn(
                "fixed left-0 top-0 z-50 h-screen w-full overflow-auto bg-background/70 backdrop-blur-[12px] transition-all duration-300",
                isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}>
                <div className="container flex h-[3.5rem] items-center justify-between">
                    <a className="text-md flex items-center" href="/">
                        Magic UI
                    </a>
                    <button
                        className="ml-6 md:hidden"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <span className="sr-only">Toggle menu</span>
                        <Menu className="h-6 w-6" />
                    </button>
                </div>

                <ul className="flex flex-col md:flex-row md:items-center uppercase md:normal-case ease-in">
                    {listItems.map((item, index) => (
                        <li
                            key={item.label}
                            className="border-grey-dark pl-6 py-0.5 border-b md:border-none"
                            style={{
                                opacity: isMenuOpen ? 1 : 0,
                                transform: `translateY(${isMenuOpen ? 0 : -20}px) translateZ(0)`,
                                transition: `all 0.3s ease-in-out ${index * 0.1}s`
                            }}
                        >
                            <a
                                className="hover:text-grey flex h-[var(--navigation-height)] w-full items-center text-xl transition-[color,transform] duration-300 md:translate-y-0 md:text-sm md:transition-colors"
                                href={item.href}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
};

export default Header;
