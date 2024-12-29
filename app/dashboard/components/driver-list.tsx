import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Building, HandCoins, Scale, User, } from "lucide-react";
import {DriverI} from "@nanahq/sticky";


interface DriverListProps {
        items: DriverI[];
    selectedDriver: DriverI;
    setSelectedDriver: (dricer: DriverI) => void;
}

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
                    const IconComponent = <User className="h-5 w-5" />

                    return (
                        <button
                            data-testid="DealList.Card"
                            key={item._id}
                            className={cn(
                                "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                                selectedDriver?._id === item?._id && "bg-muted"
                            )}
                            onClick={() => {
                                setSelectedDriver(item);
                            }}
                        >
                            <div className="flex w-full items-center gap-3">
                                {IconComponent}
                                <div className="flex flex-col w-full items-baseline">
                                    <p className="font-semibold">{item.firstName} {item.lastName}</p>
                                    <p className="text-xs font-medium">
                                        {item.phone}
                                    </p>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </ScrollArea>
    );
}
