import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {Building, Circle, HandCoins, MapPin, Phone, Scale, Truck, User,} from "lucide-react";
import {DriverI} from "@nanahq/sticky";
import {Badge} from "@/components/ui/badge";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";


interface DriverListProps {
        items: DriverI[];
    selectedDriver: DriverI;
    setSelectedDriver: (dricer: DriverI) => void;
}

const DriverCard = ({
                        driver,
                        isSelected,
                        onSelect
}: {
    driver: DriverI;
    isSelected: boolean;
    onSelect: (driver: DriverI) => void;
}) => {
    const statusColor = driver.status === 'ONLINE'
        ? 'bg-green-100 text-green-800'
        : 'bg-gray-100 text-gray-800';

    return (
        <button
            data-testid="DriverList.Card"
            className={cn(
                "w-full flex items-center gap-4 p-4 rounded-xl border",
                "bg-white hover:bg-gray-50 transition-all hover:shadow-sm",
                isSelected && "border-slate-600 bg-muted shadow-sm"
            )}
            onClick={() => onSelect(driver)}
        >
            <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
          <span className="text-lg font-medium text-gray-600">
            {driver.firstName[0]}{driver.lastName[0]}
          </span>
                </div>
            </div>

            {/* Driver Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 truncate">
                        {driver.firstName} {driver.lastName}
                    </h3>
                    <Badge variant="secondary" className={cn(statusColor)}>
                        {driver.status}
                    </Badge>
                </div>

                <div className="mt-1 space-y-1">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone size={14} />
                        <span className="truncate">{driver.phone}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Truck size={14} />
                        <span>{driver.totalTrips} trips completed</span>
                    </div>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <MapPin size={14} />
                                    <span className="truncate">{driver.state}</span>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Lat: {driver.location.coordinates[0]}</p>
                                <p>Long: {driver.location.coordinates[1]}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
            {driver.available && (
                <div className="flex-shrink-0">
                    <Circle className="w-5 h-5 text-green-500" />
                </div>
            )}
        </button>
    );
};
export function DriverList({
                                items,
                                setSelectedDriver,
                                selectedDriver,
                            }: DriverListProps) {
    const sortedItems = [...items].sort((a, b) => a.firstName.localeCompare(b.firstName));

    return (
        <ScrollArea className="h-screen pb-40">
            <div className="flex flex-col gap-2 p-4 ">
                {sortedItems.map((item) => {
                    return (
                        <DriverCard driver={item} isSelected={item._id === selectedDriver?._id} onSelect={setSelectedDriver} />
                    );
                })}
            </div>
        </ScrollArea>
    );
}
