import {
  IconCash,
  IconShield,
  IconUserCheck,
  IconUserScan,
  IconUsersGroup,
  IconUserShield,
  IconUsersPlus,
  TablerIcon,
} from "@tabler/icons-react"
import { LoanStatus } from "./schema"

export const callTypes = new Map<LoanStatus, string>([
  ["approved", "bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200"],
  ["pending", "bg-yellow-100/30 text-yellow-900 dark:text-yellow-200 border-yellow-200"],
  ["funded", "bg-green-100/30 text-green-900 dark:text-green-200 border-green-200"],
  ["declined", "bg-red-100/30 text-red-900 dark:text-red-200 border-red-200"],
  ["in_review", "bg-blue-100/30 text-blue-900 dark:text-blue-200 border-blue-200"],
])

export const loanTypes = [
  {
    label: "Conventional",
    value: "conventional",
    icon: IconShield,
  },
  {
    label: "FHA",
    value: "fha",
    icon: IconUserShield,
  },
  {
    label: "VA",
    value: "va",
    icon: IconUsersGroup,
  },
  {
    label: "Jumbo",
    value: "jumbo",
    icon: IconCash,
  },
  {
    label: "USDA",
    value: "usda",
    icon: IconUserCheck,
  },
] as const

/* ========== Pipeline Stats ========== */

export interface PipelineStatProps {
  title: string
  desc: string
  stat: string
  statDesc: string
  icon: TablerIcon
}

export const pipelineStats: PipelineStatProps[] = [
  {
    title: "Total Loans",
    desc: "Total number of loans in pipeline",
    stat: "1,247",
    statDesc: "+12% than last month",
    icon: IconUsersGroup,
  },
  {
    title: "New Applications",
    desc: "Total number of new loan applications this month",
    stat: "+89",
    statDesc: "+18% vs last month",
    icon: IconUsersPlus,
  },
  {
    title: "Pending Review",
    desc: "Total number of loans pending review",
    stat: "156",
    statDesc: "8% of total loans",
    icon: IconUserScan,
  },
  {
    title: "Funded This Month",
    desc: "Number of loans funded in the last 30 days",
    stat: "342",
    statDesc: "27% of all loans",
    icon: IconUserCheck,
  },
]