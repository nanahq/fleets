import {
    ColumnDef,
    ColumnFiltersState,
    FilterFn,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable
} from "@tanstack/react-table";
import {rankItem} from "@tanstack/match-sorter-utils";
import {useState} from "react";
import {Input} from "@/components/ui/input";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {useDebounce} from "use-debounce";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]

    filterPlaceholder?: string

    onClick?: (data: any) => void

    actions?: React.FC
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value)

    addMeta({
        itemRank,
    })

    return itemRank.passed
}
export function DataTable<TData, TValue>(props: DataTableProps<TData, TValue>) {

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )

    const [globalFilter, setGlobalFilter] = useState('')

    const [value] = useDebounce(globalFilter, 400)


    const table = useReactTable({
        data: props.data,
        columns: props.columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: fuzzyFilter,
        onGlobalFilterChange: setGlobalFilter,
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        state: {
            columnFilters,
            globalFilter: value as any,
            pagination: {
                pageSize: 3,
                pageIndex: 0,
            },
        },
    })

    return (
        <div>
            <div className="flex items-center justify-start gap-2 pb-4">
                {props.actions !== undefined && (<props.actions />)}
                { props.filterPlaceholder !== undefined && (
                    <Input
                        placeholder={props.filterPlaceholder ?? ''}
                        value={globalFilter ?? ''}
                        onChange={({target}) => setGlobalFilter(String(target.value))}
                        className="max-w-sm"
                    />
                ) }
            </div>
            <Table >
                <TableHeader>
                    {table?.getHeaderGroups()?.map((headerGroup) => (
                        <TableRow data-testid="DataTable.HeaderRow" key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead data-testid={`DataTable.Head`} key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table?.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row, index) => (
                            <TableRow
                                data-testid={`DataTable.DataRow-${index}`}
                                onClick={() => {
                                    if(props.onClick) {
                                        props.onClick(row.original)
                                    }
                                }}
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow data-testid="DataTable.EmptyRow">
                            <TableCell  data-testid="DataTable.EmptyCell" colSpan={props.columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                <div className="flex items-center space-x-2 py-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </Table>
        </div>
    )
}
