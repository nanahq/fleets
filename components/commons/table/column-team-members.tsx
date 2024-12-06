"use client"
import {
    ColumnDef
} from "@tanstack/react-table"
import {Badge} from "@/components/ui/badge";
import React from "react";
import { FleetMemberI} from '@nanahq/sticky'
import {TeamAdminManagement} from "@/components/commons/modal/team-management";
export const TeamTableColumn = (props: {isAdmin: boolean, profileId: string}): ColumnDef<FleetMemberI>[] => {
    const defaultCols:  ColumnDef<FleetMemberI>[]  =  [
        {
            accessorKey: "name",
            header: "Name",
            cell: ({row}) => {
                const original = row.original
                return <div className="py-4">{original?.firstName} {original?.lastName}</div>
            }

        },
        {
            accessorKey: "email",
            header: "Email",
            cell: ({row}) => {
                const original = row.original
                return <div className="py-2">
                    <Badge variant="secondary" className="text-xs m-1 px-1 py-0 font-light max-w-max">
                        <div className="flex flex-row items-center p-0">
                            <span className="p-0">{original?.email}</span>
                        </div>
                    </Badge>
                </div>
            }
        }
    ]


    const actionColumns: ColumnDef<FleetMemberI> = {
        accessorKey: "_id",
        header: () => {
            return <div className="sr-only">
                Action
            </div>
        },
        cell: ({row}) => {
            const original = row.original
            return <div className={props.profileId === original._id ? 'py-4 justify-end flex sr-only' : 'py-4 justify-end flex'}>
                {/*<TeamAdminManagement  isAdmin={props.isAdmin} member={original} />*/}
            </div>
        }
    }


    if(props.isAdmin){
        return [...defaultCols, actionColumns]
    }
    return defaultCols
}
