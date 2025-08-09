"use client"

import { format } from "date-fns"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import LongText from "@/components/long-text"
import { callTypes, loanTypes } from "../data/data"
import { Loan } from "../data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

export const columns: ColumnDef<Loan>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    meta: {
      className: cn(
        "sticky md:table-cell left-0 z-10 rounded-tl",
        "bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted pr-2! md:pr-0"
      ),
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "propertyAddress",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property Address" />
    ),
    cell: ({ row }) => (
      <Button variant="link" className="underline" asChild>
        <Link href={`/pipeline/${row.original.id}`}>
          <LongText className="max-w-48">{row.getValue("propertyAddress")}</LongText>
        </Link>
      </Button>
    ),
    meta: { className: "w-48" },
  },
  {
    accessorKey: "borrower",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Borrower" />
    ),
    cell: ({ row }) => (
      <div className="w-fit text-nowrap">{row.getValue("borrower")}</div>
    ),
  },
  {
    accessorKey: "guarantor",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Guarantor" />
    ),
    cell: ({ row }) => (
      <div className="w-fit text-nowrap">
        {row.getValue("guarantor") || "N/A"}
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "dateEntered",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Entered" />
    ),
    cell: ({ row }) => (
      <div className="w-fit text-nowrap">
        {format(row.getValue("dateEntered"), "dd MMM, yyyy")}
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "loanAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Loan Amount" />
    ),
    cell: ({ row }) => {
      const amount = row.getValue("loanAmount") as number
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount)
      
      return <div className="w-fit text-nowrap font-medium">{formatted}</div>
    },
    enableSorting: false,
  },
  {
    accessorKey: "loanType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Loan Type" />
    ),
    cell: ({ row }) => {
      const { loanType } = row.original
      const type = loanTypes.find(({ value }) => value === loanType)

      if (!type) {
        return null
      }

      return (
        <div className="flex items-center gap-x-2">
          {type.icon && (
            <type.icon size={16} className="text-muted-foreground" />
          )}
          <span className="text-sm capitalize">{type.label}</span>
        </div>
      )
    },
    filterFn: "weakEquals",
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const { status } = row.original
      const badgeColor = callTypes.get(status)
      return (
        <div className="flex space-x-2">
          <Badge variant="outline" className={cn("capitalize", badgeColor)}>
            {row.getValue("status").replace("_", " ")}
          </Badge>
        </div>
      )
    },
    filterFn: "weakEquals",
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: DataTableRowActions,
  },
]