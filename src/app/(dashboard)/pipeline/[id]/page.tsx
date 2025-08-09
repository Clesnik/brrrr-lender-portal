import Link from "next/link"
import { redirect } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { loanListSchema } from "../data/schema"
import { getLoans } from "../data/loans"
import { LoanDetailForm } from "./components/loan-detail-form"

interface Props {
  params: Promise<{ id: string }>
}

export default async function LoanDetailPage({ params }: Props) {
  const id = (await params).id

  const loans = getLoans()
  const loanList = loanListSchema.parse(loans)
  const loan = loanList.find((loan) => loan.id === id)

  if (!loan) {
    return redirect(`/pipeline`)
  }

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/pipeline">Pipeline</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Details</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-4 space-y-1">
        <div className="flex flex-wrap gap-2">
          <h1 className="text-lg font-bold">
            Loan Details: {loan.borrower}
          </h1>
          <Badge variant="outline" className="text-muted-foreground">
            {loan.id}
          </Badge>
        </div>
        <p className="text-muted-foreground">
          Comprehensive loan information, including property details, borrower info, and loan status.
        </p>
      </div>

      <div className="mt-4">
        <LoanDetailForm loan={loan} />
      </div>
    </div>
  )
}