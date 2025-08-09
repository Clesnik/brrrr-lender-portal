import Link from "next/link"
import { IconCalculator, IconPipeline } from "@tabler/icons-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PipelinePrimaryActions } from "./components/pipeline-primary-actions"
import { columns } from "./components/pipeline-columns"
import { PipelineStats } from "./components/pipeline-stats"
import { PipelineTable } from "./components/pipeline-table"
import { loanListSchema } from "./data/schema"
import { getLoans } from "./data/loans"
import LoanTypeSelection from "./components/pricing-engine/loan-type-selection"

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
      </div>
      <Tabs defaultValue="pipeline" className="flex-1 flex flex-col">
        <TabsList className="w-fit">
          <TabsTrigger value="pipeline" className="flex items-center gap-2">
            <IconPipeline size={16} />
            Pipeline
          </TabsTrigger>
          <TabsTrigger value="pricing-engine" className="flex items-center gap-2">
            <IconCalculator size={16} />
            Pricing Engine
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pipeline" className="flex-1 flex flex-col space-y-4">
          <PipelineStats />
          <div className="flex-1">
            <PipelineTable data={loanList} columns={columns} />
          </div>
        </TabsContent>
        
        <TabsContent value="pricing-engine" className="flex-1">
          <LoanTypeSelection />
        </TabsContent>
      </Tabs>
    </>
  )
}