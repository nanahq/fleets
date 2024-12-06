"use client";
import * as React from "react";
import {TeamTableColumn} from "@/components/commons/table/column-team-members";
import {FleetMemberI, internationalisePhoneNumber} from "@nanahq/sticky";
import {DataTable} from "@/components/commons/table/table";
import {useProfile} from "@/contexts/profile-context";
import {toast} from "sonner";
import {Copy} from "lucide-react";
import {Button} from "@/components/ui/button";

export const TeamSettings = () => {
    const {members, profile} = useProfile()

    const handleCopy = async () => {
        const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL}/invite?orgId=${profile?.organization.inviteLink}`
        await navigator.clipboard.writeText(inviteLink ?? '');
        toast.success("Invite link copied to clipboard!", {
            dismissible: true,
        });
    };

    const Actions = () => {
        return <Button onClick={handleCopy} variant="outline" size="sm">
            Invite link <Copy className="w-4 h-4" />
        </Button>;
    };

    return (
        <DataTable
            actions={
                Actions
            }
            // filterPlaceholder="Search members by name or email"
            columns={
                TeamTableColumn({
                    isAdmin: true ,
                    profileId: "34567890",
                }) as any
            }
            data={members as any}
        />
    );
};
