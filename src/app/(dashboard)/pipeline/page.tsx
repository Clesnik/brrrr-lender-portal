import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { PipelinePrimaryActions } from "./components/pipeline-primary-actions"
import { columns } from "./components/pipeline-columns"
import { PipelineStats } from "./components/pipeline-stats"
import { PipelineTable } from "./components/pipeline-table"
import { loanListSchema } from "./data/schema"
import { getLoans } from "./data/loans"

export default async function PipelinePage() {
  const loans = getLoans()
  const loanList = loanListSchema.parse(loans)
  return (
    <>
      <div className="mb-4 flex flex-col gap-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Pipeline</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="flex-none text-xl font-bold tracking-tight">
            Loan Pipeline
          </h2>
          <PipelinePrimaryActions />
        </div>
        <PipelineStats />
      </div>
      <div className="flex-1">
        <PipelineTable data={loanList} columns={columns} />
      </div>
    </>
  )
}