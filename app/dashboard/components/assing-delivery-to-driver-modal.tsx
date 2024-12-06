import {PropsWithChildren, useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {mutate} from "swr";
import * as React from "react";
import {toast} from "sonner";
import {Icons} from "@/components/commons/icons";
import {DeliveryI, DriverI} from "@nanahq/sticky";

import {Separator} from "@/components/ui/separator";

export const AssignDeliveryModal: React.FC<PropsWithChildren<{driver: DriverI,  delivery: DeliveryI, open: boolean, setOpen: any}>> = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const handleSubmit = async () => {
        try{
            setIsLoading(true)
            const res = await fetch( '/api/fleet/driver/assign',{
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({driverId: props?.driver?._id, deliveryId: props.delivery._id}),
                method: 'POST',
            })

            if(!res.ok) {
                throw res
            }
            props.setOpen(false)
            toast.success('Delivery Assigned!')
            void mutate('/api/fleet/member/drivers')
            await mutate('/api/fleet/member/deliveries')
        } catch (error) {
            toast.error('Delivery is no longer available')
        } finally {
            setIsLoading(false)
        }

    }


    return (
        <Dialog open={props.open} onOpenChange={props.setOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Assign delivery to {props?.driver?.firstName}</DialogTitle>
                        <DialogDescription>
                            This delivery will be assigned to this driver and will be come unavailable for other drivers
                        </DialogDescription>
                        <Separator />
                    </DialogHeader>
                    <div className="flex flex-col">
                        <h3 className="text-md font-semibold mt-4">Delivery information</h3>
                        <ul className="text-xs space-y-2 mt-2 text-foreground">
                            <li>
                                <span>Delivery fee: </span>
                                <span>NGN {props.delivery.deliveryFee}</span>
                            </li>
                            <li>
                                <span>Delivery Distance: </span>
                                <span>NGN {props.delivery.travelMeta?.distance} KM</span>
                            </li>
                            <li>
                                <span>Delivery Time: </span>
                                <span>NGN {props.delivery.travelMeta?.travelTime} Minutes</span>
                            </li>
                        </ul>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleSubmit} disabled={isLoading}>
                            {isLoading && <Icons.spinner className="w-4 h-4 animate-spin" />}
                            Continue
                        </Button>
                    </DialogFooter>
                </DialogContent>

        </Dialog>
    );
}
