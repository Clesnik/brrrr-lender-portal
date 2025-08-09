"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import SelectDropdown from "@/components/select-dropdown"
import { loanTypes } from "../data/data"
import { Loan } from "../data/schema"

interface Props {
  currentRow?: Loan
  open: boolean
  onOpenChange: (open: boolean) => void
}

const formSchema = z.object({
  propertyAddress: z.string().min(1, { message: "Property Address is required." }),
  borrower: z.string().min(1, { message: "Borrower is required." }),
  guarantor: z.string().optional(),
  loanAmount: z.number().min(1, { message: "Loan Amount is required." }),
  loanType: z.string().min(1, { message: "Loan Type is required." }),
})
type LoanForm = z.infer<typeof formSchema>

export function PipelineActionDialog({ currentRow, open, onOpenChange }: Props) {
  const isEdit = !!currentRow
  const form = useForm<LoanForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          propertyAddress: currentRow.propertyAddress,
          borrower: currentRow.borrower,
          guarantor: currentRow.guarantor || "",
          loanAmount: currentRow.loanAmount,
          loanType: currentRow.loanType,
        }
      : {
          propertyAddress: "",
          borrower: "",
          guarantor: "",
          loanAmount: 0,
          loanType: "",
        },
  })

  const onSubmit = (values: LoanForm) => {
    form.reset()
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    })
    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Loan" : "Add New Loan"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Update the loan here. " : "Create new loan here. "}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="loan-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="propertyAddress"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center gap-x-4 space-y-0 gap-y-1">
                  <FormLabel className="col-span-2 text-right">
                    Property Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123 Main St, City, State"
                      className="col-span-4"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-span-4 col-start-3" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="borrower"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center gap-x-4 space-y-0 gap-y-1">
                  <FormLabel className="col-span-2 text-right">
                    Borrower
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      className="col-span-4"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-span-4 col-start-3" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="guarantor"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center gap-x-4 space-y-0 gap-y-1">
                  <FormLabel className="col-span-2 text-right">
                    Guarantor
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Jane Smith (optional)"
                      className="col-span-4"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-span-4 col-start-3" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="loanAmount"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center gap-x-4 space-y-0 gap-y-1">
                  <FormLabel className="col-span-2 text-right">
                    Loan Amount
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="500000"
                      className="col-span-4"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage className="col-span-4 col-start-3" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="loanType"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center gap-x-4 space-y-0 gap-y-1">
                  <FormLabel className="col-span-2 text-right">Loan Type</FormLabel>
                  <SelectDropdown
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    placeholder="Select a loan type"
                    className="col-span-4"
                    items={loanTypes.map(({ label, value }) => ({
                      label,
                      value,
                    }))}
                  />
                  <FormMessage className="col-span-4 col-start-3" />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit" form="loan-form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}