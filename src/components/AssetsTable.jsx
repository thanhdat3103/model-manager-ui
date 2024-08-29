import * as React from 'react';
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';

import { ArrowUpDown, ChevronDown, MoreHorizontal, Plus } from 'lucide-react';
import SearchIcon from '@/assets/icons/SearchIcon';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { humanFileSize } from '@/lib/utils';

const data = [
    {
        id: 'm5gr84i9',
        size: 31432556,
        type: '3dt',
        name: 'Google Photorealistic 3D Tiles',
        publisher: 'ken99@yahoo.com',
        addedDate: new Date(Math.random() * Date.now()).toISOString(),
    },
    {
        id: '3u1reuv4',
        size: 23442,
        type: '3dt',
        name: 'Cesium OSM Buildings',
        publisher: 'Abe45@gmail.com',
        addedDate: new Date(Math.random() * Date.now()).toISOString(),
    },
    {
        id: 'derv1ws0',
        size: 83753,
        type: 'clip',
        name: 'Bing Maps Road',
        publisher: 'Monserrat44@gmail.com',
        addedDate: new Date(Math.random() * Date.now()).toISOString(),
    },
    {
        id: '5kma53ae',
        size: 87437564,
        type: '3dt',
        name: 'Bing Maps Aerial with Label',
        publisher: 'Silas22@gmail.com',
        addedDate: new Date(Math.random() * Date.now()).toISOString(),
    },
    {
        id: 'bhqecj4p',
        size: 721,
        type: 'clip',
        name: 'Cesium World Terrain',
        publisher: 'carmella@hotmail.com',
        addedDate: new Date(Math.random() * Date.now()).toISOString(),
    },
];

const columns = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'id',
        header: 'Id',
        cell: ({ row }) => <div>{row.getValue('id')}</div>,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
    },
    {
        accessorKey: 'type',
        header: 'Type',
        cell: ({ row }) => (
            <Badge className="uppercase" variant={row.getValue('type') === 'clip' ? 'secondary' : 'default'}>
                {row.getValue('type')}
            </Badge>
        ),
    },
    {
        accessorKey: 'addedDate',
        header: () => <div className="text-right">Date added</div>,
        cell: ({ row }) => {
            const date = row.getValue('addedDate');

            // Format the date
            const formatted = new Date(date).toLocaleDateString();

            return <div className="text-right font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: 'size',
        header: () => <div className="text-right">Size</div>,
        cell: ({ row }) => {
            const size = parseFloat(row.getValue('size'));

            // Format the size
            const formatted = humanFileSize(size);

            return <div className="text-right font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: 'publisher',
        header: () => <div className="text-right">Publisher</div>,
        cell: ({ row }) => <div className="text-right font-medium">{row.getValue('publisher')}</div>,
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: () => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Update asset</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                            Delete asset
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export function AssetsTable() {
    const [sorting, setSorting] = React.useState([]);
    const [columnFilters, setColumnFilters] = React.useState([]);
    const [columnVisibility, setColumnVisibility] = React.useState({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className="w-full">
            <div className="flex flex-col gap-2 md:flex-row items-center justify-between py-4">
                <Input
                    placeholder="Search for..."
                    value={table.getColumn('name')?.getFilterValue() ?? ''}
                    onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                    endIcon={<SearchIcon />}
                />
                <div className="w-full md:w-auto flex flex-col md:flex-row gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full">
                                Columns <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    );
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button className="w-full">
                        Add Data
                        <Plus className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length}{' '}
                    row(s) selected.
                </div>
                <div className="space-x-2">
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
            </div>
        </div>
    );
}
