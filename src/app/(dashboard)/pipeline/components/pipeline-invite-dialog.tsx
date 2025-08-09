"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { IconMailPlus, IconSend } from "@tabler/icons-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
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
import { Textarea } from "@/components/ui/textarea"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const formSchema = z.object({
  file: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, {
      message: "Please upload a file",
    })
    .refine(
      (files) => ["text/csv", "application/vnd.ms-excel"].includes(files?.[0]?.type),
      "Please upload CSV or Excel format."
    ),
  desc: z.string().optional(),
})
type LoanImportForm = z.infer<typeof formSchema>

export function PipelineInviteDialog({ open, onOpenChange }: Props) {
  const form = useForm<LoanImportForm>({
    resolver: zodResolver(formSchema),
    defaultValues: { desc: "" },
  })

  const fileRef = form.register("file")

  const onSubmit = (values: LoanImportForm) => {
    form.reset()
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify({
            fileName: values.file[0]?.name,
            fileSize: values.file[0]?.size,
            description: values.desc
          }, null, 2)}</code>
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-left">
          <DialogTitle className="flex items-center gap-2">
            <IconMailPlus /> Import Loans
          </DialogTitle>
          <DialogDescription>
            Import loan data from a CSV or Excel file to add multiple loans to your pipeline.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="loan-import-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="file"
              render={() => (
                <FormItem>
                  <FormLabel>File</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      {...fileRef}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Description (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      placeholder="Add notes about this import batch (optional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter className="gap-y-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="loan-import-form">
            Import <IconSend />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}