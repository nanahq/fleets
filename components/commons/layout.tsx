"use client";

import * as React from "react";
import {PropsWithChildren, useEffect, useRef, useState} from "react";
import {ChartColumnBig, FlagTriangleRight, Home, LandPlot, MapPinned, Notebook, Package,} from "lucide-react";

import {cn} from "@/lib/utils";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup,} from "@/components/ui/resizable";

import {TooltipProvider} from "@/components/ui/tooltip";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {NavBar} from "@/components/commons/nav";
import {AccountSwitcher} from "@/components/commons/setting/icon";
import {useProfile} from "@/contexts/profile-context";
import {ApprovalOverlay} from "@/app/dashboard/components/account-approval";

interface LayoutProps {
    defaultLayout: [number, number];
    defaultCollapsed?: boolean;
    navCollapsedSize: number;
}

export function LayoutComponent({
                                    defaultCollapsed = true,
                                    children,
                                }: PropsWithChildren<LayoutProps>) {
    const {profile} = useProfile()
    const panelRef = useRef<any>(null);


    useEffect(() => {
        if (defaultCollapsed && panelRef.current?.collapse) {
            panelRef.current.collapse();
        }
    }, [defaultCollapsed]);




    return (
        <TooltipProvider delayDuration={0}>
                <ResizablePanelGroup
                    direction="horizontal"
                    className="h-screen  overflow-hidden items-stretch"
                >
                    <ResizablePanel
                        defaultSize={4}
                        collapsedSize={4}
                        collapsible={false}
                        minSize={4}
                        maxSize={4}
                        className={cn(
                            "min-w-[50px] transition-all duration-300 ease-in-out"
                        )}
                    >
                        <div
                            className={cn(
                                "flex h-[52px] items-center justify-center"
                            )}
                        >
                            <AccountSwitcher isCollapsed={true} />
                        </div>
                        <Separator />
                        <NavBar
                            isCollapsed={true}
                            links={[
                                {
                                    title: "Metrics",
                                    icon: ChartColumnBig,
                                    path: "/dashboard/metrics",
                                },
                                {
                                    title: "Deliveries",
                                    icon: Package,
                                    path: "/dashboard",
                                },
                                {
                                    title: "Drivers",
                                    icon: FlagTriangleRight,
                                    path: "/dashboard/drivers",
                                },
                                {
                                    title: "Heat Map",
                                    icon: MapPinned,
                                    path: "/dashboard/maps",
                                },
                            ]}
                        />
                    </ResizablePanel>
                    <ResizableHandle withHandle={false} />
                    <ResizablePanel defaultSize={96} minSize={96}>
                        {children}
                    </ResizablePanel>
                </ResizablePanelGroup>
            <div className="block md:hidden">
                <div className=" flex flex-col h-screen w-screen justify-center item-center p-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-center">
                                This page can only be viewed on Tablet and desktop
                            </CardTitle>
                        </CardHeader>
                    </Card>
                </div>
            </div>
            {profile !== undefined && !profile?.organization?.accountApproved && (
                <ApprovalOverlay />
            )}
        </TooltipProvider>
    );
}
