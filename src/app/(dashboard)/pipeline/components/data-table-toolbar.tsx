import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { loanTypes } from "../data/data"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"

      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <Input
          placeholder="Filter loans..."
          value={(table.getColumn("propertyAddress")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("propertyAddress")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <div className="flex gap-x-2">
          {table.getColumn("status") && (
            <DataTableFacetedFilter
              column={table.getColumn("status")}
              title="Status"
              options={[
                { label: "Pending", value: "pending" },
                { label: "Approved", value: "approved" },
                { label: "Funded", value: "funded" },
                { label: "Declined", value: "declined" },
                { label: "In Review", value: "in_review" },
              ]}
            />
          )}
          {table.getColumn("loanType") && (
            <DataTableFacetedFilter
              column={table.getColumn("loanType")}
              title="Loan Type"
              options={loanTypes.map((t) => ({ ...t }))}
            />
          )}