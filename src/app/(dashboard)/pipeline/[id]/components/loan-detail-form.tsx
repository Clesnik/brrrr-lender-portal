"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { IconTerminal } from "@tabler/icons-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import useDialogState from "@/hooks/use-dialog-state"
import { toast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { ConfirmDialog } from "@/components/confirm-dialog"
import { PipelineDeactivateDialog } from "../../components/pipeline-deactivate-dialog"
import { Loan } from "../../data/schema"

interface Props {
  loan: Loan
}

const loanDetailSchema = z.object({
  propertyAddress: z.string().min(1, { message: "Property Address is required." }),
  borrower: z.string().min(1, { message: "Borrower is required." }),
  guarantor: z.string().optional(),
  loanAmount: z.number().min(1, { message: "Loan Amount is required." }),
  loanType: z.string().min(1, { message: "Loan Type is required." }),
})
type LoanDetailForm = z.infer<typeof loanDetailSchema>

export function LoanDetailForm({ loan }: Props) {
  const router = useRouter()
  const [isEdit, setIsEdit] = useState(false)
  const [open, setOpen] = useDialogState<"reset" | "deactivate">(null)

  const form = useForm<LoanDetailForm>({
    resolver: zodResolver(loanDetailSchema),
    defaultValues: {
      propertyAddress: loan.propertyAddress ?? "",
      borrower: loan.borrower ?? "",
      guarantor: loan.guarantor ?? "",
      loanAmount: loan.loanAmount ?? 0,
      loanType: loan.loanType ?? "",
    },
  })

  const onSubmit = (values: LoanDetailForm) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    })
    setIsEdit(false)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="flex flex-col items-start gap-4 lg:flex-row">
      <Card className="w-full lg:max-w-2xl lg:flex-auto lg:basis-9/12">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Overview
            <Badge>Status: {loan.status.replace("_", " ")}</Badge>
          </CardTitle>
          <CardDescription>
            Loan details, including property address, borrower info, loan amount, and type.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              id="loan-edit-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-2 gap-x-4 gap-y-6"
            >
              <FormField
                control={form.control}
                name="propertyAddress"
                render={({ field }) => (
                  <FormItem className="col-span-2 space-y-1">
                    <FormLabel>Property Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Property address"
                        {...field}
                        readOnly={!isEdit}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="borrower"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Borrower</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Borrower name"
                        {...field}
                        readOnly={!isEdit}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="guarantor"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Guarantor</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Guarantor name (optional)"
                        {...field}
                        readOnly={!isEdit}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="loanAmount"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Loan Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Loan amount"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        readOnly={!isEdit}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="loanType"
                render={({ field }) => (
                  <FormItem className="col-span-2 space-y-1">
                    <FormLabel>Loan Type</FormLabel>
                    <FormDescription>
                      The type of loan being processed.
                    </FormDescription>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col"
                        disabled={!isEdit}
                      >
                        <FormItem className="flex items-center space-y-0 space-x-3">
                          <FormControl>
                            <RadioGroupItem value="conventional" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Conventional{" "}
                            <span className="text-muted-foreground text-sm">
                              (Standard mortgage loan)
                            </span>
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-y-0 space-x-3">
                          <FormControl>
                            <RadioGroupItem value="fha" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            FHA{" "}
                            <span className="text-muted-foreground text-sm">
                              (Federal Housing Administration loan)
                            </span>
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-y-0 space-x-3">
                          <FormControl>
                            <RadioGroupItem value="va" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            VA{" "}
                            <span className="text-muted-foreground text-sm">
                              (Veterans Affairs loan)
                            </span>
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-y-0 space-x-3">
                          <FormControl>
                            <RadioGroupItem value="jumbo" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Jumbo{" "}
                            <span className="text-muted-foreground text-sm">
                              (High-value loan exceeding conforming limits)
                            </span>
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-y-0 space-x-3">
                          <FormControl>
                            <RadioGroupItem value="usda" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            USDA{" "}
                            <span className="text-muted-foreground text-sm">
                              (Rural development loan)
                            </span>
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Alert className="col-span-2">
                <IconTerminal className="h-4 w-4" />
                <AlertTitle>Last updated</AlertTitle>
                <AlertDescription>
                  {loan.updatedAt.toLocaleDateString()} | {loan.updatedAt.toLocaleTimeString()}
                </AlertDescription>
              </Alert>
            </form>
          </Form>
        </CardContent>
        {isEdit && (
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEdit(false)}>
              Cancel
            </Button>
            <Button type="submit" form="loan-edit-form">
              Save Changes
            </Button>
          </CardFooter>
        )}
      </Card>

      <Card className="w-full lg:w-auto lg:max-w-md lg:flex-initial lg:basis-3/12">
        <CardHeader>
          <CardTitle>Actions</CardTitle>
          <CardDescription>
            Manage loan actions including edit, status updates, and removal.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex flex-col space-y-1 text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                <span>Update Loan Info</span>
                <span className="text-muted-foreground text-xs leading-snug font-normal">
                  Update the loan info by turning the switch on.
                </span>
              </div>
              <Switch
                checked={isEdit}
                onCheckedChange={() => setIsEdit((prev) => !prev)}
                className="scale-125"
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between space-x-4">
              <div className="flex flex-col space-y-1 text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                <span>Loan Amount</span>
                <span className="text-muted-foreground text-xs leading-snug font-normal">
                  {formatCurrency(loan.loanAmount)}
                </span>
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between space-x-4">
              <div className="flex flex-col space-y-1 text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                <span>Remove Loan</span>
                <span className="text-muted-foreground text-xs leading-snug font-normal">
                  Removes the loan from the pipeline permanently.
                </span>
              </div>
              <Button
                variant="destructive"
                onClick={() => setOpen("deactivate")}
              >
                Remove
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <PipelineDeactivateDialog
        key={`loan-deactivate-${loan.id}`}
        open={open === "deactivate"}
        onOpenChange={() => setOpen("deactivate")}
        currentRow={loan}
      />
    </div>
  )
}