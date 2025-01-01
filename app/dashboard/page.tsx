"use client";
import {NextPage} from "next";
import {cn} from "@/lib/utils";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import {Separator} from "@/components/ui/separator";
import {DeliveryDisplay} from "@/app/dashboard/components/delivery-display";
import {DeliveryList} from "@/app/dashboard/components/delivery-list";
import {Select, SelectTrigger, SelectItem, SelectValue, SelectGroup, SelectContent} from "@/components/ui/select";
import {useEffect, useState} from "react";
import {useDelivery} from "@/contexts/deliveries-context";

 enum DeliveryTypes  {
    'FOOD' = 'FOOD',
    'GROCERIES'  = 'GROCERIES',
    'PARCEL' = 'PARCEL',
    'ALL' = 'ALL'
}
const DashboardPage:NextPage = () => {
    const [viewTypes, setViewType] = useState<DeliveryTypes>(DeliveryTypes.ALL)
    const {deliveries, selectedDelivery, setSelectedDelivery, hasExistingDeliverySelected
    } = useDelivery()

    useEffect(() => {
        if(!selectedDelivery) {
            setSelectedDelivery(deliveries[0])
        }
    }, [hasExistingDeliverySelected, selectedDelivery, deliveries])

    return (
        <>
            <ResizablePanelGroup
                direction="horizontal"
                className="h-screen items-stretch"
            >
                <ResizablePanel
                    defaultSize={40}
                    collapsible={false}
                    minSize={40}
                    maxSize={40}
                    className={cn("transition-all duration-300 ease-in-out")}
                >
                    <div className="flex-col flex">
                        <div className="flex text-xs lg:text-base items-center justify-between px-4 py-2.5">
                            <h1 className="hidden xl:block text-xl font-bold">Available Deliveries</h1>
                            <div className="flex items-center justify-between gap-2">
                                <Select
                                    onValueChange={(value: DeliveryTypes) => setViewType(value)}
                                    defaultValue={DeliveryTypes.ALL}
                                >
                                    <SelectTrigger className="w-[140px] max-h-[32px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value={DeliveryTypes.ALL}>
                                                All Deliveries
                                            </SelectItem>
                                            <SelectItem value={DeliveryTypes.FOOD}>
                                                Food Deliveries
                                            </SelectItem>
                                            <SelectItem value={DeliveryTypes.GROCERIES}>
                                                Groceries Deliveries
                                            </SelectItem>
                                            <SelectItem value={DeliveryTypes.PARCEL}>
                                                Parcel Deliveries
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <Separator />
                        <DeliveryList
                            items={deliveries}
                            selectedDelivery={selectedDelivery}
                            setSelectedDelivery={setSelectedDelivery}
                        />
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle={false} />
                <ResizablePanel collapsible={false} defaultSize={60} minSize={60}>
                    {selectedDelivery && (
                        <DeliveryDisplay
                            selectedDelivery={selectedDelivery}
                        />
                    )}
                </ResizablePanel>
            </ResizablePanelGroup>
        </>
    );
}

export default DashboardPage
