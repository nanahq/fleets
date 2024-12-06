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

interface LayoutProps {
    defaultLayout: [number, number];
    defaultCollapsed?: boolean;
    navCollapsedSize: number;
}

export function LayoutComponent({
                                    defaultCollapsed = true,
                                    children,
                                }: PropsWithChildren<LayoutProps>) {
    const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
    const panelRef = useRef<any>(null);
    useEffect(() => {
        if (defaultCollapsed && panelRef.current?.collapse) {
            panelRef.current.collapse();
        }
    }, [defaultCollapsed]);


    // if(!isInternetConnected) {
    //     return (
    //         <NoInternetConnection />
    //     )
    // }
    //
    // if(status === DataFetchingStatus.FETCHED && !profile?.accountApproved) {
    //     return (
    //         <ApprovalOverlay />
    //     )
    // }


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
                            isCollapsed &&
                            "min-w-[50px] transition-all duration-300 ease-in-out"
                        )}
                    >
                        <div
                            className={cn(
                                "flex h-[52px] items-center justify-center",
                                isCollapsed ? "h-[52px]" : "px-2"
                            )}
                        >
                            <AccountSwitcher isCollapsed={true} />
                        </div>
                        <Separator />
                        <NavBar
                            isCollapsed={true}
                            links={[
                                {
                                    title: "Home",
                                    icon: ChartColumnBig,
                                    path: "/dashboard/home",
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
            {/*{!profile?.brokerageName && status === DataFetchingStatus.FETCHED && (*/}
            {/*    <CompleteProfileModal />*/}
            {/*)}*/}
        </TooltipProvider>
    );
}
