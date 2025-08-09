"use client"

import { IconMailPlus, IconUserPlus } from "@tabler/icons-react"
import useDialogState from "@/hooks/use-dialog-state"
import { Button } from "@/components/ui/button"
import { PipelineActionDialog } from "./pipeline-action-dialog"
import { PipelineInviteDialog } from "./pipeline-invite-dialog"

export function PipelinePrimaryActions() {
  const [open, setOpen] = useDialogState<"invite" | "add">(null)
  return (
    <>
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          className="space-x-1"
          onClick={() => setOpen("invite")}
        >
          <span>Import Loan</span> <IconMailPlus size={18} />
        </Button>
        <Button className="space-x-1" onClick={() => setOpen("add")}>
          <span>Add Loan</span> <IconUserPlus size={18} />
        </Button>
      </div>

      <PipelineActionDialog
        key="loan-add"
        open={open === "add"}
        onOpenChange={() => setOpen("add")}
      />

      <PipelineInviteDialog
        key="loan-invite"
        open={open === "invite"}
        onOpenChange={() => setOpen("invite")}
      />
    </>
  )
}