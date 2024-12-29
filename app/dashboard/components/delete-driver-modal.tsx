import React, {useState} from "react";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {DriverI} from "@nanahq/sticky";
import {Icons} from "@/components/commons/icons";

export const DeleteDriverButton: React.FC<{driver: DriverI, open: boolean, setOpen: (open: boolean) => void}> = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const handleDeleteClient =  async () => {

    }
    return (
        <Dialog open={props.open} onOpenChange={props.setOpen}>
            <DialogTrigger>
                <DropdownMenuItem>
                    Delete Driver
                </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete {props?.driver?.firstName}</DialogTitle>
                </DialogHeader>
                <DialogFooter>
                    <Button disabled={isLoading} onClick={handleDeleteClient}>
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Continue
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
