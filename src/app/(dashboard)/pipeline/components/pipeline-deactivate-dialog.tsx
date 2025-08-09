"use client"

import { useState } from "react"
import { IconAlertTriangle } from "@tabler/icons-react"
import { toast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ConfirmDialog } from "@/components/confirm-dialog"
import { Loan } from "../data/schema"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Loan
}

export function PipelineDeactivateDialog({
  open,
  onOpenChange,
  currentRow,
}: Props) {
  const [value, setValue] = useState("")

  const handleRemove = () => {
    if (value.trim() !== currentRow.propertyAddress) return

    onOpenChange(false)
    toast({
      title: "The following loan has been removed:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(currentRow, null, 2)}
          </code>
        </pre>
      ),
    })
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleRemove}
      disabled={value.trim() !== currentRow.propertyAddress}
      title={
        <span className="text-destructive">
          <IconAlertTriangle
            className="stroke-destructive mr-1 inline-block"
            size={18}
          />{" "}
          Remove Loan
        </span>
      }
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            Are you sure you want to remove the loan for property{" "}
            <span className="font-bold">{currentRow.propertyAddress}</span>?
            <br />
            This action will remove the loan for borrower{" "}
            <span className="font-bold">
              {currentRow.borrower}
            </span>{" "}
            from the pipeline. Please proceed with caution.
          </p>

          <Label className="my-2">
            Property Address:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter the property address to confirm removal."
            />
          </Label>

          <Alert variant="destructive">
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be careful, this operation cannot be rolled back.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText="Remove"
      destructive
    />
  )
}