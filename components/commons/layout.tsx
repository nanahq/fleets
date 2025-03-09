"use client";

import * as React from "react";
import {PropsWithChildren} from "react";
import {ChartColumnBig, FlagTriangleRight, MapPinned, Package,} from "lucide-react";
import dynamic from 'next/dynamic';
import {cn} from "@/lib/utils";
import { ResizablePanel, ResizablePanelGroup,} from "@/components/ui/resizable";

import {TooltipProvider} from "@/components/ui/tooltip";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {NavBar} from "@/components/commons/nav";
import {AccountSwitcher} from "@/components/commons/setting/icon";
import {useProfile} from "@/contexts/profile-context";


const ApprovalOverlay = dynamic(() => import("@/app/dashboard/components/account-approval"), {
    ssr: false,
});
interface LayoutProps {
    defaultLayout: [number, number];
    defaultCollapsed?: boolean;
    navCollapsedSize: number;
}

export function LayoutComponent({
                                    children,
                                }: PropsWithChildren<LayoutProps>) {
    const {profile} = useProfile()




    return (
        <TooltipProvider delayDuration={0}>
                <ResizablePanelGroup
                    direction="horizontal"
                    className="h-screen  overflow-hidden items-stretch"
                >
                    <ResizablePanel
                        defaultSize={12}
                        collapsible={false}
                        minSize={12}
                        maxSize={12}
                        className={cn(
                            "min-w-[50px] bg-slate-100 transition-all duration-300 ease-in-out"
                        )}
                    >
                        <div
                            className={cn(
                                "flex flex-col gap-2 mx-2"
                            )}
                        >
                            <AccountSwitcher  />
                            <Separator className="h-0.5 w-full bg-slate-200 -mx-2 my-1.5" />
                        </div>
                        <NavBar
                            links={[
                                {
                                    title: "Stats",
                                    icon: ChartColumnBig,
                                    path: "/dashboard/stats",
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
                                    title: "Deliveries Radar",
                                    icon: MapPinned,
                                    path: "/dashboard/maps",
                                },
                            ]}
                        />
                    </ResizablePanel>
                    <ResizablePanel defaultSize={88} minSize={88}>
                        <div className="bg-slate-100 p-3.5 overflow-hidden h-screen">
                            {children}
                        </div>
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
