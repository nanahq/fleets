import {PropsWithChildren, useEffect, useState} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import * as React from "react";
import {toast} from "sonner";
import {Icons} from "@/components/commons/icons";
import {DriverStatGroup} from '@nanahq/sticky'
import {ChevronsUpDown} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
export const DriverStatModal: React.FC<PropsWithChildren<{driverId: string, driverName: string}>> = (props) => {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState<DriverStatGroup | undefined>(undefined)

    useEffect(() => {
        void fetchStat()
    }, [props.driverId, props.driverName])
    const fetchStat = async () => {

        try{
            setIsLoading(true)
            const res = await fetch( `/api/fleet/driver-stats/${props.driverId}`,{
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const body = await res.json()
            setData(body)
            if(!res.ok) {
               throw body
            }
        } catch (error: any) {
            toast.error(error?.message ?? 'Failed to created a driver. Something went wrong')
        } finally {
            setIsLoading(false)
        }

    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild={true}>
                {props.children}
            </DialogTrigger>
            <DialogContent
                data-testid="ClientPage.AddClient.Modal"
                className="sm:max-w-[425px] max-w-[1000px]"
            >
                <DialogHeader>
                    <DialogTitle data-testid="ClientPage.AddClient.Title">
                        {props.driverName} Performance
                    </DialogTitle>
                </DialogHeader>
                {isLoading ? (
                    <div className="flex flex-row items-center justify-center">
                        <Icons.spinner className="h-8 w-8 animate-spin" />
                    </div>
                ) : (
                    <div className="flex flex-col space-y-10">
                        <Collapsible
                            defaultOpen={true}
                            className="w-[350px] space-y-2 border-b border-gray-100"
                        >
                            <div className="flex items-center justify-between">
                                <h4 className="text-sm font-semibold">
                                    Today performance
                                </h4>
                                <CollapsibleTrigger asChild>
                                    <Button variant="ghost" size="sm" className="w-9 p-0">
                                        <ChevronsUpDown className="h-4 w-4" />
                                        <span className="sr-only">Today performance</span>
                                    </Button>
                                </CollapsibleTrigger>
                            </div>

                            <CollapsibleContent className="px-2">
                                <div className="flex flex-col space-y-2">
                                    <div className="flex text-xs flex-row item-center space-x-3">
                                        <div>Total money earned:</div>
                                        <div>₦{data?.today.earnings}</div>
                                    </div>
                                    <Separator />
                                    <div className="flex text-xs flex-row item-center space-x-3">
                                        <div>Total distance covered:</div>
                                        <div>₦{data?.today.distance} KM</div>
                                    </div>
                                    <Separator />

                                    <div className="flex text-xs flex-row item-center space-x-3">
                                        <div>Total time spent:</div>
                                        <div>₦{data?.today.time} minutes</div>
                                    </div>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                        <Collapsible
                            defaultOpen={false}
                            className="w-[350px] space-y-2 border-b border-gray-100"
                        >
                            <div className="flex items-center justify-between">
                                <h4 className="text-sm font-semibold">
                                    Yesterday's performance
                                </h4>
                                <CollapsibleTrigger asChild>
                                    <Button variant="ghost" size="sm" className="w-9 p-0">
                                        <ChevronsUpDown className="h-4 w-4" />
                                        <span className="sr-only">Yesterday performance</span>
                                    </Button>
                                </CollapsibleTrigger>
                            </div>

                            <CollapsibleContent className="px-2">
                                <div className="flex flex-col space-y-2">
                                    <div className="flex text-xs flex-row item-center space-x-3">
                                        <div>Total money earned:</div>
                                        <div>₦{data?.yesterday.earnings}</div>
                                    </div>
                                    <Separator />
                                    <div className="flex text-xs flex-row item-center space-x-3">
                                        <div>Total distance covered:</div>
                                        <div>₦{data?.yesterday.distance} KM</div>
                                    </div>
                                    <Separator />

                                    <div className="flex text-xs flex-row item-center space-x-3">
                                        <div>Total time spent:</div>
                                        <div>₦{data?.yesterday.time} minutes</div>
                                    </div>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                        <Collapsible
                            defaultOpen={false}
                            className="w-[350px] space-y-2 border-b border-gray-100"
                        >
                            <div className="flex items-center justify-between">
                                <h4 className="text-sm font-semibold">
                                    Week performance
                                </h4>
                                <CollapsibleTrigger asChild>
                                    <Button variant="ghost" size="sm" className="w-9 p-0">
                                        <ChevronsUpDown className="h-4 w-4" />
                                        <span className="sr-only">Week performance</span>
                                    </Button>
                                </CollapsibleTrigger>
                            </div>

                            <CollapsibleContent className="px-2">
                                <div className="flex flex-col space-y-2">
                                    <div className="flex text-xs flex-row item-center space-x-3">
                                        <div>Total money earned:</div>
                                        <div>₦{data?.week.earnings}</div>
                                    </div>
                                    <Separator />
                                    <div className="flex text-xs flex-row item-center space-x-3">
                                        <div>Total distance covered:</div>
                                        <div>₦{data?.week.distance} KM</div>
                                    </div>
                                    <Separator />

                                    <div className="flex text-xs flex-row item-center space-x-3">
                                        <div>Total time spent:</div>
                                        <div>₦{data?.week.time} minutes</div>
                                    </div>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                        <Collapsible
                            defaultOpen={false}
                            className="w-[350px] space-y-2 border-b border-gray-100"
                        >
                            <div className="flex items-center justify-between">
                                <h4 className="text-sm font-semibold">
                                    30 days performance
                                </h4>
                                <CollapsibleTrigger asChild>
                                    <Button variant="ghost" size="sm" className="w-9 p-0">
                                        <ChevronsUpDown className="h-4 w-4" />
                                        <span className="sr-only">30 days performance</span>
                                    </Button>
                                </CollapsibleTrigger>
                            </div>

                            <CollapsibleContent className="px-2">
                                <div className="flex flex-col space-y-2">
                                    <div className="flex text-xs flex-row item-center space-x-3">
                                        <div>Total money earned:</div>
                                        <div>₦{data?.month.earnings}</div>
                                    </div>
                                    <Separator />
                                    <div className="flex text-xs flex-row item-center space-x-3">
                                        <div>Total distance covered:</div>
                                        <div>₦{data?.month.distance} KM</div>
                                    </div>
                                    <Separator />

                                    <div className="flex text-xs flex-row item-center space-x-3">
                                        <div>Total time spent:</div>
                                        <div>₦{data?.month.time} minutes</div>
                                    </div>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
