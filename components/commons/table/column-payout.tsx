"use client"
import {
    ColumnDef
} from "@tanstack/react-table"
import React from "react";
import { VendorPayoutI} from '@nanahq/sticky'
export const PayoutTableColumn = (): ColumnDef<VendorPayoutI>[] => {
    const defaultCols:  ColumnDef<VendorPayoutI>[]  =  [
        {
            accessorKey: "earnings",
            header: "Earnings",
            cell: ({row}) => {
                const original = row.original
                return <div className="py-4">{original.earnings}</div>
            }

        },
        {
            accessorKey: "paid",
            header: "Status",
            cell: ({row}) => {
                const original = row.original
                return <div className="py-4">{original.paid ? 'Paid out' : 'Pending'}</div>
            }

        },
        {
            accessorKey: "refId",
            header: "Ref ID",
            cell: ({row}) => {
                const original = row.original
                return <div className="py-4">{original.refId}</div>
            }

        },
        {
            accessorKey: "refId",
            header: "Ref ID",
            cell: ({row}) => {
                const original = row.original
                return <div className="py-4">{original.refId}</div>
            }

        }
    ]

    return defaultCols
}
