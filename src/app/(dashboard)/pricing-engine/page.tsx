"use client"

import { useState } from "react"
import LoanTypeSelection from "./components/loan-type-selection"
import BorrowerTypeSelection from "./components/borrower-type-selection"
import CitizenshipSelection from "./components/citizenship-selection"
import FicoScoreSelection from "./components/fico-score-selection"
import PropertyAddressSelection from "./components/property-address-selection"
import PropertyTypeSelection from "./components/property-type-selection"
import CondoWarrantabilitySelection from "./components/condo-warrantability-selection"

type Step = "loan-type" | "borrower-type" | "citizenship" | "fico-score" | "property-address"
type LoanType = "dscr" | "bridge"
type BorrowerType = "entity" | "individual"
type CitizenshipType = "us_citizen" | "permanent_resident" | "non_permanent_resident" | "foreign_national"
type FicoScoreRange = "350-659" | "660-679" | "680-699" | "700-719" | "720-739" | "740-759" | "760-779" | "780-850"
type Step = "loan-type" | "borrower-type" | "citizenship" | "fico-score" | "property-address" | "property-type" | "condo-warrantability"
type WarrantabilityType = "warrantable" | "non_warrantable"

interface PropertyAddress {
  streetAddress: string
  aptUnit: string
  city: string
  state: string
  zipCode: string
}

export default function PricingEnginePage() {
  const [currentStep, setCurrentStep] = useState<Step>("loan-type")
  const [selectedLoanType, setSelectedLoanType] = useState<LoanType | null>(null)
  const [selectedBorrowerType, setSelectedBorrowerType] = useState<BorrowerType | null>(null)
  const [selectedCitizenshipType, setSelectedCitizenshipType] = useState<CitizenshipType | null>(null)
  const [selectedFicoScore, setSelectedFicoScore] = useState<FicoScoreRange | null>(null)
  const [selectedPropertyAddress, setSelectedPropertyAddress] = useState<PropertyAddress | null>(null)
  const [selectedPropertyType, setSelectedPropertyType] = useState<PropertyType | null>(null)
  const [selectedWarrantability, setSelectedWarrantability] = useState<WarrantabilityType | null>(null)

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
    setCurrentStep("property-address")
  }

  const handlePropertyAddressNext = (propertyAddress: PropertyAddress) => {
    setSelectedPropertyAddress(propertyAddress)
    setCurrentStep("property-type")
  }

  const handlePropertyTypeNext = (propertyType: PropertyType) => {
    setSelectedPropertyType(propertyType)
    // If condominium is selected, go to condo warrantability step
    if (propertyType === "condominium") {
      setCurrentStep("condo-warrantability")
    } else {
      // For other property types, skip to next step (Square Footage)
      console.log("Selected:", {
        loanType: selectedLoanType,
        borrowerType: selectedBorrowerType,
        citizenshipType: selectedCitizenshipType,
        ficoScore: selectedFicoScore,
        propertyAddress: selectedPropertyAddress,
        propertyType
      })
    }
  }

  const handleWarrantabilityNext = (warrantabilityType: WarrantabilityType) => {
    setSelectedWarrantability(warrantabilityType)
    // Navigate to next step (Square Footage)
    console.log("Selected:", {
      loanType: selectedLoanType,
      borrowerType: selectedBorrowerType,
      citizenshipType: selectedCitizenshipType,
      ficoScore: selectedFicoScore,
      propertyAddress: selectedPropertyAddress,
      propertyType: selectedPropertyType,
      warrantability: warrantabilityType
    })
  }

  const handleBack = () => {
    if (currentStep === "condo-warrantability") {
      setCurrentStep("property-type")
    } else if (currentStep === "property-type") {
      setCurrentStep("property-address")
    } else if (currentStep === "property-address") {
      setCurrentStep("fico-score")
    } else if (currentStep === "fico-score") {
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

  if (currentStep === "property-address") {
    return <PropertyAddressSelection onBack={handleBack} onNext={handlePropertyAddressNext} />
  }

  if (currentStep === "property-type") {
    return <PropertyTypeSelection onBack={handleBack} onNext={handlePropertyTypeNext} />
  }

  if (currentStep === "condo-warrantability") {
    return <CondoWarrantabilitySelection onBack={handleBack} onNext={handleWarrantabilityNext} />
  }

  return null
}