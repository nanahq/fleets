import React, {useMemo, useState} from "react";
import {DeliveryLocationMap} from "@/app/dashboard/components/delivery-location-map";
import {DeliveryI, DriverI} from "@nanahq/sticky";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {BadgeDollarSign, SwatchBook, Truck} from "lucide-react";
import {useDrivers} from "@/contexts/drivers-context";
import {getInitials} from "@/lib/utils";
import Link from "next/link";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {NumericFormat} from "react-number-format";
import {AssignDeliveryModal} from "@/app/dashboard/components/assing-delivery-to-driver-modal";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

export const DeliveryDisplay: React.FC<{selectedDelivery: DeliveryI}> = (props) => {
    const [open, setOpen] = useState(false)
    const {drivers} = useDrivers()
    const [driver, setDriver] = useState<DriverI | null>(null)

    const driversInDelivery  = useMemo(() => {
        const pool = props.selectedDelivery?.pool as unknown as string[] ?? []
        return drivers.filter(driver => pool?.includes(driver._id) && driver.available)
    }, [props.selectedDelivery, drivers])


    return (
            <div className="h-screen pb-40 px-5 pt-5">
               <div className="flex flex-col space-y-5">
                   <DeliveryLocationMap delivery={props.selectedDelivery} />
                   <Card>
                     <CardHeader>
                         <CardTitle className="font-semibold">
                             Drivers close by
                         </CardTitle>
                     </CardHeader>
                       <CardContent>
                           <div className="flex flex-row flex-wrap space-x-5">
                               {driversInDelivery.map(driver => (
                                   <DropdownMenu key={driver._id}>
                                       <DropdownMenuTrigger asChild>
                                           <div key={driver._id} className="flex cursor-pointer flex-row items-center space-x-2">
                                               <Avatar>
                                                   <AvatarFallback>{getInitials(driver?.firstName)}</AvatarFallback>
                                               </Avatar>
                                               <p className="text-sm">{driver.firstName} {driver.lastName}</p>
                                           </div>
                                       </DropdownMenuTrigger>
                                       <DropdownMenuContent>
                                           <DropdownMenuItem onClick={() => {
                                               setOpen(true)
                                               setDriver(driver)
                                           } }>
                                               Assign delivery to driver
                                           </DropdownMenuItem>
                                           <DropdownMenuItem>
                                              <Link href="/dashboard/drivers">
                                                  Go to driver profile
                                              </Link>
                                           </DropdownMenuItem>
                                       </DropdownMenuContent>
                                   </DropdownMenu>
                               ))}
                           </div>
                       </CardContent>
                   </Card>
                   <Card>
                       <CardHeader>
                           <CardTitle className="font-semibold">
                              Delivery Information
                           </CardTitle>
                       </CardHeader>
                       <CardContent>
                           <div className="flex flex-row flex-wrap space-x-5">
                               <div className="flex flex-row items-center space-x-2">
                                   <BadgeDollarSign className="w-6 h-6"/>
                                   <NumericFormat
                                       value={props?.selectedDelivery?.deliveryFee}
                                       prefix="₦"
                                       thousandSeparator
                                       displayType='text'
                                       renderText={(value) => (
                                           <p className="text-sm">
                                               Delivery fee: {value}
                                           </p>
                                       )}
                                   />
                               </div>
                               <div className="flex flex-row items-center space-x-2">
                                   <Truck className="w-6 h-6"/>
                                   <p className="text-sm">Delivery Distance: {props.selectedDelivery?.travelMeta?.distance}</p>
                               </div>
                               <div className="flex flex-row items-center space-x-2">
                                   <SwatchBook className="w-6 h-6"/>
                                   <p className="text-sm">Delivery Time: {props.selectedDelivery?.travelMeta?.travelTime}</p>
                               </div>
                           </div>
                       </CardContent>
                   </Card>
               </div>
                <AssignDeliveryModal
                    open={open}
                    setOpen={setOpen}
                    delivery={props.selectedDelivery}
                    driver={driver as DriverI}
                />
            </div>
        )
}
