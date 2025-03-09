import React, { useState } from "react";
import { DriverI } from "@nanahq/sticky";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    Building,
    Phone,
    Mail,
    User,
    Check,
    Network,
    MapPin,
    Truck,
    ChartArea
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, getInitials } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useProfile } from "@/contexts/profile-context";
import { DriverLocationMap } from "@/app/dashboard/components/driver-location-map";
import { DriverStatModal } from "@/app/dashboard/components/driver-stat-modal";
import { DeleteDriverButton } from "@/app/dashboard/components/delete-driver-modal";

export const DriverDisplay: React.FC<{ selectedDriver: DriverI }> = ({ selectedDriver }) => {
    const [deleteDriverModalOpen, setDeleteDriverModalOpen] = useState(false);
    const { profile } = useProfile();

    const getStatusInfo = () => {
        return selectedDriver?.status === 'ONLINE'
            ? { label: "Online", color: "bg-green-100 text-green-600" }
            : { label: "Offline", color: "bg-gray-100 text-gray-600" };
    };

    const statusInfo = getStatusInfo();

    return (
        <ScrollArea className="h-screen overflow-y-auto pb-20 px-6 pt-5">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-gray-100 text-gray-600">
                            {getInitials(`${selectedDriver?.firstName} ${selectedDriver?.lastName}`)}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            {selectedDriver?.firstName} {selectedDriver?.lastName}
                        </h1>
                        <p className="text-gray-500 text-sm">
                            Joined {new Date(selectedDriver?.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
                <Badge className={cn("px-4 py-2 text-sm font-medium", statusInfo.color)}>
                    {statusInfo.label}
                </Badge>
            </div>

            {/* Location Map */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md mb-6">
                <div className="h-80">
                    <DriverLocationMap driver={selectedDriver} />
                </div>
            </div>

            {/* Driver Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow-sm p-4 flex items-center space-x-4">
                    <div className="p-3 bg-blue-50 rounded-full">
                        <Truck className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total Trips</p>
                        <p className="text-lg font-bold">{selectedDriver?.totalTrips}</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4 flex items-center space-x-4">
                    <div className="p-3 bg-purple-50 rounded-full">
                        <Check className="w-6 h-6 text-purple-500" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Availability</p>
                        <p className="text-lg font-bold">
                            {selectedDriver?.available ? "Available" : "Not Available"}
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4 flex items-center space-x-4">
                    <div className="p-3 bg-amber-50 rounded-full">
                        <MapPin className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">State</p>
                        <p className="text-lg font-bold">{selectedDriver?.state}</p>
                    </div>
                </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex items-center mb-4">
                    <User className="w-5 h-5 text-gray-500 mr-2" />
                    <h2 className="text-lg font-semibold">Contact Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-gray-500" />
                        <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="font-medium">
                                {selectedDriver?.phone || "Not provided"}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-gray-500" />
                        <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium">
                                {selectedDriver?.email || "Not provided"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Organization Details */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex items-center mb-4">
                    <Building className="w-5 h-5 text-gray-500 mr-2" />
                    <h2 className="text-lg font-semibold">Organization Details</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-500">Organization</p>
                        <p className="font-medium">{profile?.organization?.name}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Driver Type</p>
                        <p className="font-medium">
                            {selectedDriver?.type?.charAt(0).toUpperCase() +
                                selectedDriver?.type?.slice(1).toLowerCase()}
                        </p>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mb-6">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Phone className="mr-2 h-4 w-4" /> Contact Driver
                </Button>
                <DriverStatModal driverId={selectedDriver._id} driverName={selectedDriver.firstName}>
                    <Button variant="outline" className="flex-1">
                        <ChartArea className="mr-2 h-4 w-4" /> View Performance
                    </Button>
                </DriverStatModal>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex-1">
                            <Network className="mr-2 h-4 w-4" /> More Actions
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Contact</DropdownMenuItem>
                        <DeleteDriverButton
                            driver={selectedDriver}
                            open={deleteDriverModalOpen}
                            setOpen={setDeleteDriverModalOpen}
                        />
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </ScrollArea>
    );
};