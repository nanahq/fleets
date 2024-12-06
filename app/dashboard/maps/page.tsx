"use client"
import {NextPage} from "next";
import { DeliveryHeatmap} from "@/app/dashboard/components/heat-map";
import {useDelivery} from "@/contexts/deliveries-context";
import {Icons} from "@/components/commons/icons";
import { MapPin} from "lucide-react";


const DeliveryMapsPage: NextPage = (props) => {
    const {deliveries} = useDelivery()

    if(!deliveries.length) {
        return (
            <div className="flex flex-row items-center justify-center h-screen">
                <Icons.spinner className="h-8 w-8 animate-spin" />
            </div>
        )
    }
    if(deliveries.length < 1) {
        return (
            <div className="relative w-full">
                <div
                    className="absolute inset-0 flex items-start justify-center z-10 bg-background"
                    style={{ opacity: "0.96" }}
                >
                    <div className="flex flex-col items-center mt-[400px]">
                        <MapPin className="w-10 h-10 text-foreground mb-2" />
                        <p className="text-2xl text-foreground">
                            Insufficient Deliveries
                        </p>
                        <p className="text-md text-foreground mb-4">
                            Not enough deliveries from your state to show heatmap
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <DeliveryHeatmap deliveries={deliveries} gridSize={0.4} />
    )

}

export default DeliveryMapsPage
