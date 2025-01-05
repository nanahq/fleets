"use client";
import {NextPage} from "next";
import {DeliveryI} from '@nanahq/sticky'
import {cn} from "@/lib/utils";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import {Separator} from "@/components/ui/separator";
import {Select, SelectTrigger, SelectItem, SelectValue, SelectGroup, SelectContent} from "@/components/ui/select";
import {useState, useCallback} from "react";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {AddDriverModal} from "@/app/dashboard/components/add-driver-modal";
import {DriverList} from "@/app/dashboard/components/driver-list";
import {useDrivers} from "@/contexts/drivers-context";
import {DriverDisplay} from "@/app/dashboard/components/driver-display";

 enum DeliveryTypes  {
    'FOOD' = 'FOOD',
    'GROCERIES'  = 'GROCERIES',
    'PARCEL' = 'PARCEL',
    'ALL' = 'ALL'
}
const DashboardPage:NextPage = () => {
    const [openModal, setOpenModal] = useState(false)
    const {drivers, selectedDriver, setSelectedDriver} = useDrivers()

    const handleOpen = useCallback(() => {
        setOpenModal(prev => !prev)
    }, [])

    const handleDriverSelect = useCallback((driver: any) => {
        setSelectedDriver(driver)
    }, [setSelectedDriver])

    return (
        <>
            <ResizablePanelGroup
                direction="horizontal"
                className="h-screen items-stretch"
            >
                <ResizablePanel
                    defaultSize={30}
                    collapsible={false}
                    minSize={30}
                    maxSize={30}
                    className={cn("transition-all duration-300 ease-in-out")}
                >
                    <div className="flex-col flex">
                        <div className="flex text-xs lg:text-base items-center justify-between px-4 py-2.5">
                            <h1 className="hidden xl:block text-xl font-bold">Manage Drivers</h1>
                            <div className="flex items-center justify-between gap-2">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button onClick={handleOpen} variant="outline" size="sm" className="text-xs">
                                            Create Driver
                                            <Plus className="ml-1 h-4 w-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Create a new driver</TooltipContent>
                                </Tooltip>
                            </div>
                        </div>
                        <Separator />
                        <DriverList
                            setSelectedDriver={handleDriverSelect}
                            items={drivers}
                            selectedDriver={selectedDriver}
                        />
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle={false} />
                <ResizablePanel  collapsible={false} defaultSize={70} minSize={70}>
                    <DriverDisplay
                        selectedDriver={selectedDriver}
                    />
                </ResizablePanel>
            </ResizablePanelGroup>
            <AddDriverModal open={openModal} setOpen={setOpenModal} />
        </>
    );
}

export default DashboardPage
