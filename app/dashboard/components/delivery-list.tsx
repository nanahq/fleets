import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Check,
    Clock,
    ClockIcon,
    Mail,
    MapPin,
    MapPinIcon,
    Package,
    PackageIcon,
    Phone,
    Truck,
    User,
} from "lucide-react";
import {DeliveryI} from "@nanahq/sticky";
import {NumericFormat} from "react-number-format";
import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import React from "react";

interface DeliveryListProps {
    items: DeliveryI[];
    selectedDelivery?: DeliveryI;
    setSelectedDelivery: (delivery: DeliveryI) => void;
}

const DeliveryListItem = ({ item, selectedDelivery, setSelectedDelivery }: {item: DeliveryI, selectedDelivery: DeliveryI, setSelectedDelivery: any}) => {
    const displayId = item?._id ? `#${item._id.substring(0, 8)}` : "#41239110";

    const pickupAddress = item?.parsedAddress?.pickupAddress || "Kano Nigeria";
    const deliveryAddress = item?.parsedAddress?.dropoffAddress || "Kano Nigeria";

    const customerName = `${item.user.firstName} ${item.user.lastName}`;

    const getBadgeStyle = () => {
        if (item.deliveryFee > 1200) {
            return "bg-blue-100 text-blue-600";
        } else if (item.deliveryFee > 1500) {
            return "bg-green-100 text-green-600";
        }
        return "bg-gray-100 text-gray-600";
    };

    return (
        <div
            className={cn("w-full cursor-point rounded-lg border border-gray-200 bg-white p-4 mb-4 shadow-sm",   selectedDelivery?._id === item?._id && "bg-muted border-slate-600")}
            onClick={() => setSelectedDelivery(item)}
        >
            {/* Header with ID and status */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-gray-800 font-bold text-lg">{displayId}</h3>
                <NumericFormat
                    value={item?.deliveryFee}
                    prefix="₦"
                    thousandSeparator
                    displayType='text'
                    renderText={(value) => (
                        <span className={`px-4 py-1 rounded-full text-sm font-medium ${getBadgeStyle()}`}>
          {value}
        </span>
                    )}
                />

            </div>

            {/* Delivery route visualization */}
            <div className="flex items-center mb-4 px-2">
                <div className="w-full h-px bg-gray-300"></div>
                <div className="mx-2">
                    <Truck
                        size={20}
                        className={item.deliveryFee > 1500 ? "text-green-600" : "text-blue-600"}
                    />
                </div>
                {true && (
                    <div className="h-4 w-4 bg-gray-800 rounded-full ml-1"></div>
                )}
            </div>

            {/* Addresses */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-sm">
                    <p className="text-gray-600 line-clamp-2">{pickupAddress}</p>
                </div>
                <div className="text-sm">
                    <p className="text-gray-600 line-clamp-2">{deliveryAddress}</p>
                </div>
            </div>

            {/* Customer info */}
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-medium text-gray-800">{customerName}</p>
                    <p className="text-sm text-gray-500">Delivery contact</p>
                </div>

                {/* Contact buttons */}
                {/*<div className="flex space-x-2">*/}
                {/*    <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">*/}
                {/*        <Mail size={18} className="text-gray-600" />*/}
                {/*    </button>*/}
                {/*    <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">*/}
                {/*        <Phone size={18} className="text-gray-600" />*/}
                {/*    </button>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export function DeliveryList({
                               items,
                               setSelectedDelivery,
                               selectedDelivery,
                           }: DeliveryListProps) {
    const sortedItems = [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return (
        <ScrollArea className="h-screen pb-40">
            <div className="flex flex-col gap-2 p-4 ">
                {/*<div className="flex mb-6 space-x-2">*/}
                {/*    <button className="px-2 py-1 rounded-lg text-gray-800 text-xs bg-gray-100">*/}
                {/*        All <span className="ml-1 font-medium">{20}</span>*/}
                {/*    </button>*/}
                {/*    <button className="px-2 py-1 rounded-lg text-gray-800 text-xs bg-yellow-200 font-medium">*/}
                {/*        Food delivery <span className="ml-1">{20}</span>*/}
                {/*    </button>*/}
                {/*    <button className="px-2 py-1 rounded-lg text-gray-800 text-xs bg-gray-100">*/}
                {/*        Package <span className="ml-1">{50}</span>*/}
                {/*    </button>*/}
                {/*    <button className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center ml-auto">*/}
                {/*        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"*/}
                {/*             strokeWidth="2"*/}
                {/*             strokeLinecap="round" strokeLinejoin="round">*/}
                {/*            <line x1="4" y1="21" x2="4" y2="14"></line>*/}
                {/*            <line x1="4" y1="10" x2="4" y2="3"></line>*/}
                {/*            <line x1="12" y1="21" x2="12" y2="12"></line>*/}
                {/*            <line x1="12" y1="8" x2="12" y2="3"></line>*/}
                {/*            <line x1="20" y1="21" x2="20" y2="16"></line>*/}
                {/*            <line x1="20" y1="12" x2="20" y2="3"></line>*/}
                {/*            <line x1="1" y1="14" x2="7" y2="14"></line>*/}
                {/*            <line x1="9" y1="8" x2="15" y2="8"></line>*/}
                {/*            <line x1="17" y1="16" x2="23" y2="16"></line>*/}
                {/*        </svg>*/}
                {/*    </button>*/}
                {/*</div>*/}
                {sortedItems.map((item) => {
                    return (
                        <DeliveryListItem key={item._id} item={item}
                                          selectedDelivery={selectedDelivery as any}
                                          setSelectedDelivery={setSelectedDelivery}
                        />
                    );
                })}
            </div>
        </ScrollArea>
    );
}
