"use client"

import { useState } from "react"
import LoanTypeSelection from "./components/loan-type-selection"
import BorrowerTypeSelection from "./components/borrower-type-selection"
import CitizenshipSelection from "./components/citizenship-selection"
import FicoScoreSelection from "./components/fico-score-selection"
import PropertyAddressSelection from "./components/property-address-selection"
import PropertyTypeSelection from "./components/property-type-selection"
import CondoWarrantabilitySelection from "./components/condo-warrantability-selection"
import BridgeTypeSelection from "./components/bridge-type-selection"
import SquareFootageSelection from "./components/square-footage-selection"

type Step = "loan-type" | "borrower-type" | "citizenship" | "fico-score" | "property-address" | "property-type" | "condo-warrantability" | "bridge-type" | "square-footage"
type LoanType = "dscr" | "bridge"
type BorrowerType = "entity" | "individual"
type CitizenshipType = "us_citizen" | "permanent_resident" | "non_permanent_resident" | "foreign_national"
type FicoScoreRange = "350-659" | "660-679" | "680-699" | "700-719" | "720-739" | "740-759" | "760-779" | "780-850"
type PropertyType = "single_family" | "townhome_pud" | "condominium" | "multifamily_2_4" | "multifamily_5_8"
type PropertyType = "single_family" | "townhome_pud" | "condominium" | "multifamily_2_4" | "multifamily_5_8"
type WarrantabilityType = "warrantable" | "non_warrantable"
type BridgeType = "bridge" | "bridge_rehab" | "ground_up"
type SquareFootageAnswer = "yes" | "no"

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
  const [selectedBridgeType, setSelectedBridgeType] = useState<BridgeType | null>(null)
  const [selectedSquareFootage, setSelectedSquareFootage] = useState<SquareFootageAnswer | null>(null)

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
      // For other property types, check loan type to determine next step
      if (selectedLoanType === "dscr") {
        setCurrentStep("square-footage")
      } else if (selectedLoanType === "bridge") {
        setCurrentStep("bridge-type")
      }
    }
  }

  const handleWarrantabilityNext = (warrantabilityType: WarrantabilityType) => {
    setSelectedWarrantability(warrantabilityType)
    // After condo warrantability, check loan type to determine next step
    if (selectedLoanType === "dscr") {
      setCurrentStep("square-footage")
    } else if (selectedLoanType === "bridge") {
      setCurrentStep("bridge-type")
    }
  }

  const handleBridgeTypeNext = (bridgeType: BridgeType) => {
    setSelectedBridgeType(bridgeType)
    // Navigate to next step after bridge type
    console.log("Selected:", {
      loanType: selectedLoanType,
      borrowerType: selectedBorrowerType,
      citizenshipType: selectedCitizenshipType,
      ficoScore: selectedFicoScore,
      propertyAddress: selectedPropertyAddress,
      propertyType: selectedPropertyType,
      warrantability: selectedWarrantability,
      bridgeType
    })
  }

  const handleSquareFootageNext = (squareFootage: SquareFootageAnswer) => {
    setSelectedSquareFootage(squareFootage)
    // Navigate to next step after square footage
    console.log("Selected:", {
      loanType: selectedLoanType,
      borrowerType: selectedBorrowerType,
      citizenshipType: selectedCitizenshipType,
      ficoScore: selectedFicoScore,
      propertyAddress: selectedPropertyAddress,
      propertyType: selectedPropertyType,
      warrantability: selectedWarrantability,
      squareFootage
    })
  }

  const handleBack = () => {
    if (currentStep === "square-footage") {
      // Go back based on whether we came from condo warrantability or property type
      if (selectedPropertyType === "condominium") {
        setCurrentStep("condo-warrantability")
      } else {
        setCurrentStep("property-type")
      }
    } else if (currentStep === "bridge-type") {
      // Go back based on whether we came from condo warrantability or property type
      if (selectedPropertyType === "condominium") {
        setCurrentStep("condo-warrantability")
      } else {
        setCurrentStep("property-type")
      }
    } else if (currentStep === "condo-warrantability") {
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

  if (currentStep === "bridge-type") {
    return <BridgeTypeSelection onBack={handleBack} onNext={handleBridgeTypeNext} />
  }

  if (currentStep === "square-footage") {
    return <SquareFootageSelection onBack={handleBack} onNext={handleSquareFootageNext} propertyType={selectedPropertyType!} />
  }

  return null
}