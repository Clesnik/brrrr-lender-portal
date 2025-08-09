import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"
import { Edit2, Eye, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Loan } from "../data/schema"
import { PipelineActionDialog } from "./pipeline-action-dialog"
import { PipelineDeactivateDialog } from "./pipeline-deactivate-dialog"

interface Props {
  row: Row<Loan>
}

export function DataTableRowActions({ row }: Props) {
  const [open, setOpen] = useState<"edit" | "deactivate" | null>(null)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem asChild>
            <Link href={`/pipeline/${row.original.id}`}>
              <Eye className="mr-2 h-4 w-4" />
              View Detail
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen("edit")}>
            <Edit2 className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setOpen("deactivate")}
            className="text-red-500"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <PipelineActionDialog
        key={`loan-edit-${row.original.id}`}
        open={open === "edit"}
        onOpenChange={() => setOpen("edit")}
        currentRow={row.original}
      />

      <PipelineDeactivateDialog
        key={`loan-deactivate-${row.original.id}`}
        open={open === "deactivate"}
        onOpenChange={() => setOpen("deactivate")}
        currentRow={row.original}
      />
    </>
  )
}