import { faker } from "@faker-js/faker"
import { Loan } from "./schema"

const generateLoans = () => {
  return Array.from({ length: 30 }, () => {
    const borrowerFirstName = faker.person.firstName()
    const borrowerLastName = faker.person.lastName()
    const guarantorFirstName = faker.person.firstName()
    const guarantorLastName = faker.person.lastName()
    const dateEntered = faker.date.past({ years: 1 })
    const createdAt = dateEntered
    
    return {
      id: faker.string.uuid(),
      propertyAddress: faker.location.streetAddress({ useFullAddress: true }),
      borrower: `${borrowerFirstName} ${borrowerLastName}`,
      guarantor: faker.datatype.boolean() ? `${guarantorFirstName} ${guarantorLastName}` : undefined,
      dateEntered,
      loanAmount: faker.number.int({ min: 100000, max: 2000000 }),
      loanType: faker.helpers.arrayElement([
        "conventional",
        "fha", 
        "va",
        "jumbo",
        "usda",
      ]),
      status: faker.helpers.arrayElement([
        "pending",
        "approved",
        "funded", 
        "declined",
        "in_review",
      ]),
      createdAt,
      updatedAt: faker.date.recent(),
    }
  })
}

// Singleton data
let loans: Loan[] | null = null

export const getLoans = () => {
  if (!loans) {
    loans = generateLoans() // Generate data once
  }
  return loans
}