import { z } from "zod"

const loanStatusSchema = z.union([
  z.literal("pending"),
  z.literal("approved"),
  z.literal("funded"),
  z.literal("declined"),
  z.literal("in_review"),
])
export type LoanStatus = z.infer<typeof loanStatusSchema>

const loanTypeSchema = z.union([
  z.literal("conventional"),
  z.literal("fha"),
  z.literal("va"),
  z.literal("jumbo"),
  z.literal("usda"),
])
export type LoanType = z.infer<typeof loanTypeSchema>

const loanSchema = z.object({
  id: z.string(),
  propertyAddress: z.string(),
  borrower: z.string(),
  guarantor: z.string().optional(),
  dateEntered: z.coerce.date(),
  loanAmount: z.number(),
  loanType: loanTypeSchema,
  status: loanStatusSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type Loan = z.infer<typeof loanSchema>

export const loanListSchema = z.array(loanSchema)