import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, } from "lucide-react";
import {DeliveryI} from "@nanahq/sticky";
import {NumericFormat} from "react-number-format";
import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";

interface DeliveryListProps {
    items: DeliveryI[];
    selectedDelivery?: DeliveryI;
    setSelectedDelivery: (delivery: DeliveryI) => void;
}

export function DeliveryList({
                               items,
                               setSelectedDelivery,
                               selectedDelivery,
                           }: DeliveryListProps) {
    const sortedItems = [...items].sort((a, b) => a.createdAt.localeCompare(b.createdAt));

    return (
        <ScrollArea className="h-screen pb-40">
            <div className="flex flex-col gap-2 p-4 ">
                {sortedItems.map((item) => {
                    return (
                        <button
                            data-testid="DealList.Card"
                            key={item._id}
                            className={cn(
                                "flex w-full py-4 flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                                selectedDelivery?._id === item?._id && "bg-nana-200 text-white border-nana-200 hover:bg-white hover:text-black"
                            )}
                            onClick={() => {
                                setSelectedDelivery(item);
                            }}
                        >
                            <div className="w-full flex-col flex">
                                <div className="flex w-full flex-row items-center justify-between">
                                    <h1 className="font-semibold">Delivery Id:{item?._id}</h1>
                                    <Badge variant="secondary">
                                        <NumericFormat
                                            value={selectedDelivery?.deliveryFee}
                                            prefix="₦"
                                            thousandSeparator
                                            displayType='text'
                                            renderText={(value) => (
                                                <p className="text-lg self-end">
                                                    {value}
                                                </p>
                                            )}
                                        />
                                    </Badge>
                                </div>
                                <Separator color="#ecf7fd" className="my-2"  />
                                <div className="text-xs flex flex-col space-y-3">
                                    <div className="flex flex-row space-x-1">
                                        <p>Travel Distance:</p>
                                        <p>{selectedDelivery?.travelMeta?.distance ?? 2}KM</p>
                                    </div>
                                    <div className="flex flex-row space-x-1">
                                        <p>Travel Time:</p>
                                        <p>{selectedDelivery?.travelMeta?.travelTime ?? 10} minutes</p>
                                    </div>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </ScrollArea>
    );
}
