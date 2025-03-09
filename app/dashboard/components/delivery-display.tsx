import React, {useMemo, useState} from "react";
import {DeliveryLocationMap} from "@/app/dashboard/components/delivery-location-map";
import {DeliveryI, DriverI, OrderStatus} from "@nanahq/sticky";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {BadgeDollarSign, Clock, MapPin, Navigation, Package, Phone, Truck, User} from "lucide-react";
import {useDrivers} from "@/contexts/drivers-context";
import {cn, getInitials} from "@/lib/utils";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {NumericFormat} from "react-number-format";
import {AssignDeliveryModal} from "@/app/dashboard/components/assing-delivery-to-driver-modal";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

export const DeliveryDisplay: React.FC<{ selectedDelivery: DeliveryI }> = (props) => {
    const [open, setOpen] = useState(false);
    const { drivers } = useDrivers();
    const [driver, setDriver] = useState<DriverI | null>(null);

    const driversInDelivery = useMemo(() => {
        const pool = props.selectedDelivery?.pool as unknown as string[] ?? [];
        return drivers.filter(driver => pool?.includes(driver._id) && driver.available);
    }, [props.selectedDelivery, drivers]);

    const getDeliveryStatus = () => {
        const status = props.selectedDelivery?.status || "pending";

        switch (status) {
            case OrderStatus.FULFILLED:
                return { label: "Delivered", color: "bg-green-100 text-green-600" };
            case OrderStatus.COURIER_PICKUP:
                return { label: "Assigned", color: "bg-purple-100 text-purple-600" };
            case OrderStatus.IN_ROUTE:
                return { label: "In Transit", color: "bg-blue-100 text-blue-600" };
            default:
                return { label: "Pending", color: "bg-yellow-100 text-yellow-600" };
        }
    };

    const statusInfo = getDeliveryStatus();

    return (
        <div className="h-screen overflow-y-auto pb-20 px-6 pt-5">
            {/* Delivery header with ID and status */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        #{props.selectedDelivery?._id?.substring(0, 8) || "ID"}
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Created {new Date(props.selectedDelivery?.createdAt || Date.now()).toLocaleDateString()}
                    </p>
                </div>
                <Badge className={cn("px-4 py-2 text-sm font-medium", statusInfo.color)}>
                    {statusInfo.label}
                </Badge>
            </div>

            {/* Map section with enhanced visibility */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md mb-6">
                <div className="h-80">
                    <DeliveryLocationMap delivery={props.selectedDelivery} />
                </div>
            </div>

            <div className="p-4 border-t border-gray-100">
                <div className="flex items-start space-x-3">
                    <div className="mt-1">
                        <div className="h-4 w-4 rounded-full bg-green-500"></div>
                        <div className="h-12 w-0.5 bg-gray-300 mx-auto my-1"></div>
                        <div className="h-4 w-4 rounded-full bg-red-500"></div>
                    </div>

                    <div className="flex-1">
                        <div className="mb-4">
                            <p className="text-xs text-gray-500">PICKUP LOCATION</p>
                            <p className="text-sm font-medium">
                                {props.selectedDelivery?.parsedAddress?.pickupAddress || "123 Main Street, Lagos, Nigeria"}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-500">DROPOFF LOCATION</p>
                            <p className="text-sm font-medium">
                                {props.selectedDelivery?.parsedAddress?.dropoffAddress || "456 Park Avenue, Lagos, Nigeria"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delivery info cards in a responsive grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow-sm p-4 flex items-center space-x-4">
                    <div className="p-3 bg-blue-50 rounded-full">
                        <BadgeDollarSign className="w-6 h-6 text-blue-500"/>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Delivery Fee</p>
                        <NumericFormat
                            value={props?.selectedDelivery?.deliveryFee}
                            prefix="₦"
                            thousandSeparator
                            displayType='text'
                            renderText={(value) => (
                                <p className="text-lg font-bold">{value}</p>
                            )}
                        />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4 flex items-center space-x-4">
                    <div className="p-3 bg-purple-50 rounded-full">
                        <Navigation className="w-6 h-6 text-purple-500"/>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Distance</p>
                        <p className="text-lg font-bold">
                            {props.selectedDelivery?.travelMeta?.distance || "0"} km
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4 flex items-center space-x-4">
                    <div className="p-3 bg-amber-50 rounded-full">
                        <Clock className="w-6 h-6 text-amber-500"/>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Est. Time</p>
                        <p className="text-lg font-bold">
                            {props.selectedDelivery?.travelMeta?.travelTime || "0"} min
                        </p>
                    </div>
                </div>
            </div>

            {/* Customer information card */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex items-center mb-4">
                    <User className="w-5 h-5 text-gray-500 mr-2"/>
                    <h2 className="text-lg font-semibold">Customer Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-gray-100 text-gray-600">
                                {getInitials(props.selectedDelivery?.user?.firstName || "Customer Name")}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium">{props.selectedDelivery?.user?.firstName || "Customer Name"}</p>
                            <p className="text-sm text-gray-500">Customer Phone:
                                #{props.selectedDelivery?.order.primaryContact?.substring(0, 6) || "ID"}</p>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-gray-500"/>
                            <p className="text-sm">{props.selectedDelivery?.order.primaryContact || "+234 XXX XXX XXXX"}</p>
                        </div>

                    </div>
                </div>
            </div>

            {/* Package information */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex items-center mb-4">
                    <Package className="w-5 h-5 text-gray-500 mr-2"/>
                    <h2 className="text-lg font-semibold">Package Details</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <p className="text-sm text-gray-500">Package Type</p>
                        <p className="font-medium">{props.selectedDelivery?.order?.fleetOrderType || "Standard"}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Weight</p>
                        <p className="font-medium">{"N/A"} kg</p>
                    </div>
                    <div className="md:col-span-3">
                        <p className="text-sm text-gray-500">Notes</p>
                        <p className="font-medium">{props.selectedDelivery?.order.specialNote || "No special instructions"}</p>
                    </div>
                </div>
            </div>

            {/* Nearby drivers section with enhanced UI */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="border-b border-gray-100 p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Truck className="w-5 h-5 text-gray-500 mr-2"/>
                            <h2 className="text-lg font-semibold">Available Drivers</h2>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                            {driversInDelivery.length} nearby
                        </Badge>
                    </div>
                </div>

                {driversInDelivery.length > 0 ? (
                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {driversInDelivery.map(driver => (
                            <div key={driver._id}
                                 className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                                <div className="flex items-center space-x-3">
                                    <Avatar>
                                        <AvatarFallback className="bg-blue-100 text-blue-600">
                                            {getInitials(driver?.firstName)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">{driver.firstName} {driver.lastName}</p>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <MapPin className="w-3 h-3 mr-1"/>
                                            <span>Is nearby</span>
                                        </div>
                                    </div>
                                </div>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="sm">
                                            Actions
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => {
                                            setOpen(true);
                                            setDriver(driver);
                                        }}>
                                            Assign delivery to driver
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link href={`/dashboard/drivers/${driver._id}`} className="w-full">
                                                View driver profile
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            Contact driver
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-8 text-center">
                        <p className="text-gray-500">No available drivers nearby</p>
                        <Button className="mt-4" variant="outline">
                            Search for more drivers
                        </Button>
                    </div>
                )}
            </div>

            {/* Action buttons */}
            <div className="flex space-x-4 mb-6">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Phone className="mr-2 h-4 w-4"/> Contact Customer
                </Button>
                <Button variant="outline" className="flex-1">
                    <Package className="mr-2 h-4 w-4"/> Update Status
                </Button>
            </div>

            <AssignDeliveryModal
                open={open}
                setOpen={setOpen}
                delivery={props.selectedDelivery}
                driver={driver as DriverI}
            />
        </div>
    );
};