import {Building, Ellipsis, Mail, Phone, User, UserPlus, Network, Check, Pin, MapPin} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, {  useState } from "react";
import {ChartBar, ChartArea} from 'lucide-react'
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {DriverI} from "@nanahq/sticky";
import {getInitials} from "@/lib/utils";
import {DeleteDriverButton} from "@/app/dashboard/components/delete-driver-modal";
import {useProfile} from "@/contexts/profile-context";
import {DriverLocationMap} from "@/app/dashboard/components/driver-location-map";
import {DriverStatModal} from "@/app/dashboard/components/driver-stat-modal";



export const DriverDisplay: React.FC<{
    selectedDriver: DriverI;
}> = ({ selectedDriver }) => {
    const [deleteDriverModalOpen, setDeleteDriverModalOpen] = useState(false)
    const {profile} = useProfile()
    return (
        <>
            <ScrollArea className="flex h-screen flex-col">
                {selectedDriver ? (
                    <div className="flex flex-col flex-1 p-4">
                        <div className="flex flex-row w-full justify-between items-center">
                            <div className="flex items-center justify-start space-x-4">
                                <Avatar>
                                    <AvatarFallback className="border-primary border-[0.5px] bg-transparent">
                                        {getInitials(`${selectedDriver?.firstName} ${selectedDriver?.lastName}`)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-2xl font-medium leading-none">
                                        {selectedDriver?.firstName} {selectedDriver?.lastName}
                                    </p>
                                </div>

                            </div>
                            <div className="flex flex-row">
                                <div>
                                    <DriverStatModal driverId={selectedDriver._id} driverName={selectedDriver.firstName}>
                                        <Button variant="ghost">
                                            View driver performance
                                            <ChartArea className="w-5 h-5 text-black"/>
                                        </Button>
                                    </DriverStatModal>

                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline">
                                            <Ellipsis className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>
                                            Edit contact
                                        </DropdownMenuItem>
                                        <DeleteDriverButton driver={selectedDriver} open={deleteDriverModalOpen} setOpen={setDeleteDriverModalOpen} />
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                        </div>

                        <div className="flex flex-col gap-3 py-5">
                            <div className="flex gap-3">
                                <Card className="flex-1">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Organization
                                        </CardTitle>
                                        <Building className="h-5 w-5" color="grey" />
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-base">
                                            {profile?.organization.name}
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card className="flex-1">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Type</CardTitle>
                                        <User className="h-5 w-5" color="grey" />
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-base">
                                            {selectedDriver?.type
                                                    ?.toLowerCase()[0]
                                                    .toUpperCase() +
                                                selectedDriver?.type?.toLocaleLowerCase().slice(1)}
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="flex gap-3">
                                <Card className="flex-1">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Email</CardTitle>
                                        <Mail className="h-5 w-5" color="grey" />
                                    </CardHeader>
                                    <CardContent>
                                        {selectedDriver?.email ? (
                                            selectedDriver?.email?.split(",").filter(mail => Boolean(mail)).map((email) => (
                                                <p className="text-base flex items-center justify-start" key={email}>
                                                    {email}
                                                </p>
                                            ))
                                        ) : (
                                            <Button
                                                variant="link"
                                                className="h-auto p-0 text-base text-muted-foreground hover:underline"
                                                onClick={() => setDeleteDriverModalOpen(true)}
                                            >
                                                Add email
                                            </Button>
                                        )}

                                    </CardContent>
                                </Card>
                                <Card className="flex-1">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Phone</CardTitle>
                                        <Phone className="h-5 w-5" color="grey" />
                                    </CardHeader>
                                    <CardContent>
                                        {selectedDriver?.phone ? (
                                            <p className="text-base flex items-center justify-start">
                                                {selectedDriver.phone}
                                            </p>
                                        ) : (
                                            <Button
                                                variant="link"
                                                className="h-auto p-0 text-base text-muted-foreground hover:underline"
                                                onClick={() => setDeleteDriverModalOpen(true)}
                                            >
                                                Add phone number
                                            </Button>
                                        )}
                                    </CardContent>
                                </Card>
                                <Card className="flex-1">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Availability</CardTitle>
                                        <Check className="h-5 w-5" color="grey" />
                                    </CardHeader>
                                    <CardContent>

                                            <p className="text-base flex items-center justify-start">
                                                {selectedDriver.available ? 'Available to take orders' : 'Not available'}
                                            </p>
                                    </CardContent>
                                </Card>
                                <Card className="flex-1">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Status</CardTitle>
                                        <Network className="h-5 w-5" color="grey" />
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-base flex items-center justify-start">
                                            {selectedDriver.status === 'ONLINE' ? 'Driver is online' : 'Driver is offline'}
                                        </p>
                                    </CardContent>

                                </Card>
                            </div>
                        </div>
                       <Card>
                           <CardContent>
                               <CardHeader className="flex flex-row space-x-2 items-center">
                                       <CardTitle className="text-sm font-medium">Driver current location</CardTitle>
                                       <MapPin className="h-4 w-4" color="grey" />
                               </CardHeader>
                               <DriverLocationMap driver={selectedDriver} />
                           </CardContent>
                       </Card>
                    </div>
                ) : (
                    <div className="h-[90vh] flex items-center justify-center">
                        <div className="flex flex-col gap-4 items-center">
                            <UserPlus className="w-10 h-10" />
                            <p className="text-2xl text-center">Create a contact to get started</p>
                        </div>
                    </div>
                )}
            </ScrollArea>

        </>
    );
}
