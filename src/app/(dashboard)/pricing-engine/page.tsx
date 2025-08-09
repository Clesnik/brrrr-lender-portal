"use client"

import { useState } from "react"
import LoanTypeSelection from "./components/loan-type-selection"
import BorrowerTypeSelection from "./components/borrower-type-selection"
import CitizenshipSelection from "./components/citizenship-selection"
import FicoScoreSelection from "./components/fico-score-selection"

type Step = "loan-type" | "borrower-type" | "citizenship" | "fico-score"
type LoanType = "dscr" | "bridge"
type BorrowerType = "entity" | "individual"
type CitizenshipType = "us_citizen" | "permanent_resident" | "non_permanent_resident" | "foreign_national"
type FicoScoreRange = "350-659" | "660-679" | "680-699" | "700-719" | "720-739" | "740-759" | "760-779" | "780-850"

export default function PricingEnginePage() {
  const [currentStep, setCurrentStep] = useState<Step>("loan-type")
  const [selectedLoanType, setSelectedLoanType] = useState<LoanType | null>(null)
  const [selectedBorrowerType, setSelectedBorrowerType] = useState<BorrowerType | null>(null)
  const [selectedCitizenshipType, setSelectedCitizenshipType] = useState<CitizenshipType | null>(null)
  const [selectedFicoScore, setSelectedFicoScore] = useState<FicoScoreRange | null>(null)

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
    setCurrentStep("fico-score")
  }

  const handleFicoScoreNext = (ficoScore: FicoScoreRange) => {
    setSelectedFicoScore(ficoScore)
    // Navigate to next step (Property Address)
    console.log("Selected:", { 
      loanType: selectedLoanType, 
      borrowerType: selectedBorrowerType, 
      citizenshipType, 
      ficoScore 
    })
  }

  const handleBack = () => {
    if (currentStep === "fico-score") {
      setCurrentStep("citizenship")
    } else if (currentStep === "citizenship") {
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

  if (currentStep === "fico-score") {
    return <FicoScoreSelection onBack={handleBack} onNext={handleFicoScoreNext} />
  }

  return null
}