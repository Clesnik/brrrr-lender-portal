"use client"

import { useState } from "react"
import LoanTypeSelection from "./components/loan-type-selection"
import BorrowerTypeSelection from "./components/borrower-type-selection"
import CitizenshipSelection from "./components/citizenship-selection"

type Step = "loan-type" | "borrower-type" | "citizenship"
type LoanType = "dscr" | "bridge"
type BorrowerType = "entity" | "individual"
type CitizenshipType = "us_citizen" | "permanent_resident" | "non_permanent_resident" | "foreign_national"

export default function PricingEnginePage() {
  const [currentStep, setCurrentStep] = useState<Step>("loan-type")
  const [selectedLoanType, setSelectedLoanType] = useState<LoanType | null>(null)
  const [selectedBorrowerType, setSelectedBorrowerType] = useState<BorrowerType | null>(null)
  const [selectedCitizenshipType, setSelectedCitizenshipType] = useState<CitizenshipType | null>(null)

  const handleLoanTypeNext = (loanType: LoanType) => {
    setSelectedLoanType(loanType)
    setCurrentStep("borrower-type")
  }

  const handleBorrowerTypeNext = (borrowerType: BorrowerType) => {
    setSelectedBorrowerType(borrowerType)
    setCurrentStep("citizenship")
  }

  const handleCitizenshipNext = (citizenshipType: CitizenshipType) => {
    setSelectedCitizenshipType(citizenshipType)
    // Navigate to next step (FICO Score)
    console.log("Selected:", { loanType: selectedLoanType, borrowerType: selectedBorrowerType, citizenshipType })
  }

  const handleBack = () => {
    if (currentStep === "citizenship") {
      setCurrentStep("borrower-type")
    } else if (currentStep === "borrower-type") {
      setCurrentStep("loan-type")
    }
  }

  if (currentStep === "loan-type") {
    return <LoanTypeSelection onNext={handleLoanTypeNext} />
  }

  if (currentStep === "borrower-type") {
    return <BorrowerTypeSelection onBack={handleBack} onNext={handleBorrowerTypeNext} />
  }

  if (currentStep === "citizenship") {
    return <CitizenshipSelection onBack={handleBack} onNext={handleCitizenshipNext} />
  }

  return null
}