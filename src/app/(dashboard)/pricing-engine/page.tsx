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
import TransactionTypeSelection from "./components/transaction-type-selection"
import WholesalerFeeSelection from "./components/wholesaler-fee-selection"
import OccupancySelection from "./components/occupancy-selection"
import IncomeExpensesSelection from "./components/income-expenses-selection"
import TransactionDetailsSelection from "./components/transaction-details-selection"
import LoanStructureSelection from "./components/loan-structure-selection"
import ExperienceSelection from "./components/experience-selection"
import RehabDetailsSelection from "./components/rehab-details-selection"
import LoanPricingSelection from "./components/loan-pricing-selection"

type Step = "loan-type" | "borrower-type" | "citizenship" | "fico-score" | "property-address" | "property-type" | "condo-warrantability" | "bridge-type" | "square-footage" | "transaction-type" | "occupancy" | "wholesaler-fee" | "income-expenses" | "transaction-details" | "loan-structure" | "experience"
type Step = "loan-type" | "borrower-type" | "citizenship" | "fico-score" | "property-address" | "property-type" | "condo-warrantability" | "bridge-type" | "square-footage" | "transaction-type" | "occupancy" | "wholesaler-fee" | "income-expenses" | "transaction-details" | "loan-structure" | "experience" | "rehab-details" | "loan-pricing"
type LoanType = "dscr" | "bridge"
type BorrowerType = "entity" | "individual"
type CitizenshipType = "us_citizen" | "permanent_resident" | "non_permanent_resident" | "foreign_national"
type FicoScoreRange = "350-659" | "660-679" | "680-699" | "700-719" | "720-739" | "740-759" | "760-779" | "780-850"
type PropertyType = "single_family" | "townhome_pud" | "condominium" | "multifamily_2_4" | "multifamily_5_8"
type WarrantabilityType = "warrantable" | "non_warrantable"
type BridgeType = "bridge" | "bridge_rehab" | "ground_up"
type SquareFootageAnswer = "yes" | "no"
type TransactionType = "purchase" | "delayed_purchase" | "refinance_cash_out" | "refinance_rate_term"
type WholesalerFeeAnswer = "yes" | "no"

interface OccupancyData {
  numberOfUnits: string
  numberOfVacantUnits: string
  isShortTermRental: string
  isSection8: string
}

interface IncomeExpensesData {
  grossRent: string
  marketRent: string
  propertyTaxes: string
  homeownersInsurance: string
  floodInsurance: string
  hoa: string
  managementFee: string
}

interface TransactionDetailsData {
  purchasePrice: string
  asIsValue: string
  rehabCompleted: string
  payoffAmount: string
}

interface LoanStructureData {
  loanStructure: string
  prepaymentPenalty: string
  maxLeverage: string
}

interface ExperienceData {
  numberOfFlips: string
  numberOfGroundUps: string
  numberOfRentalsOwned: string
}

interface RehabDetailsData {
  expandingSquareFootage: "yes" | "no"
  changingUse: "yes" | "no"
  constructionBudget: string
  afterRepairValue: string
}

type LoanPricingType = "max_leverage" | "custom_pricing"

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
  const [selectedTransactionType, setSelectedTransactionType] = useState<TransactionType | null>(null)
  const [selectedWholesalerFee, setSelectedWholesalerFee] = useState<WholesalerFeeAnswer | null>(null)
  const [selectedOccupancyData, setSelectedOccupancyData] = useState<OccupancyData | null>(null)
  const [selectedIncomeExpensesData, setSelectedIncomeExpensesData] = useState<IncomeExpensesData | null>(null)
  const [selectedTransactionDetailsData, setSelectedTransactionDetailsData] = useState<TransactionDetailsData | null>(null)
  const [selectedLoanStructureData, setSelectedLoanStructureData] = useState<LoanStructureData | null>(null)
  const [selectedExperienceData, setSelectedExperienceData] = useState<ExperienceData | null>(null)
  const [selectedRehabDetailsData, setSelectedRehabDetailsData] = useState<RehabDetailsData | null>(null)
  const [selectedLoanPricingData, setSelectedLoanPricingData] = useState<LoanPricingType | null>(null)

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
    setCurrentStep("transaction-type")
  }

  const handleSquareFootageNext = (squareFootage: SquareFootageAnswer) => {
    setSelectedSquareFootage(squareFootage)
    setCurrentStep("transaction-type")
  }

  const handleTransactionTypeNext = (transactionType: TransactionType) => {
    setSelectedTransactionType(transactionType)
    // If Bridge loan, go to Transaction Details
    if (selectedLoanType === "bridge") {
      // For Bridge loans with Purchase, go to Wholesaler Fee first
      if (transactionType === "purchase") {
        setCurrentStep("wholesaler-fee")
      } else {
        setCurrentStep("transaction-details")
      }
    } else {
      // For DSCR loans, go to Occupancy step
      setCurrentStep("occupancy")
    }
  }

  const handleOccupancyNext = (occupancyData: OccupancyData) => {
    setSelectedOccupancyData(occupancyData)
    // If Purchase transaction type, go to Wholesaler Fee step
    if (selectedTransactionType === "purchase") {
      setCurrentStep("wholesaler-fee")
    } else {
      // For other transaction types, go to Income & Expenses
      setCurrentStep("income-expenses")
    }
  }

  const handleWholesalerFeeNext = (wholesalerFee: WholesalerFeeAnswer) => {
    setSelectedWholesalerFee(wholesalerFee)
    // After wholesaler fee, check loan type
    if (selectedLoanType === "dscr") {
      // For DSCR loans, go to Income & Expenses
      setCurrentStep("income-expenses")
    } else {
      // For Bridge loans, go to Transaction Details
      setCurrentStep("transaction-details")
    }
  }

  const handleIncomeExpensesNext = (incomeExpensesData: IncomeExpensesData) => {
    setSelectedIncomeExpensesData(incomeExpensesData)
    // For DSCR loans, go to Transaction Details after Income & Expenses
    setCurrentStep("transaction-details")
  }

  const handleTransactionDetailsNext = (transactionDetailsData: TransactionDetailsData) => {
    setSelectedTransactionDetailsData(transactionDetailsData)
    // Navigate based on loan type
    if (selectedLoanType === "dscr") {
      setCurrentStep("loan-structure")
    } else if (selectedLoanType === "bridge") {
      setCurrentStep("experience")
    }
  }

  const handleLoanStructureNext = (loanStructureData: LoanStructureData) => {
    setSelectedLoanStructureData(loanStructureData)
    // Navigate to next step after loan structure
    console.log("DSCR Loan Complete:", {
      loanType: selectedLoanType,
      borrowerType: selectedBorrowerType,
      citizenshipType: selectedCitizenshipType,
      ficoScore: selectedFicoScore,
      propertyAddress: selectedPropertyAddress,
      propertyType: selectedPropertyType,
      warrantability: selectedWarrantability,
      squareFootage: selectedSquareFootage,
      transactionType: selectedTransactionType,
      occupancyData: selectedOccupancyData,
      wholesalerFee: selectedWholesalerFee,
      incomeExpensesData: selectedIncomeExpensesData,
      transactionDetailsData,
      loanStructureData
    })
  }

  const handleExperienceNext = (experienceData: ExperienceData) => {
    setSelectedExperienceData(experienceData)
    // Navigate based on bridge type
    if (selectedBridgeType === "bridge_rehab" || selectedBridgeType === "ground_up") {
      setCurrentStep("rehab-details")
    } else {
      setCurrentStep("loan-pricing")
    }
  }

  const handleRehabDetailsNext = (rehabDetailsData: RehabDetailsData) => {
    setSelectedRehabDetailsData(rehabDetailsData)
    setCurrentStep("loan-pricing")
  }

  const handleLoanPricingNext = (loanPricingType: LoanPricingType) => {
    setSelectedLoanPricingData(loanPricingType)
    // Bridge loan flow complete
    console.log("Bridge Loan Complete:", {
      loanType: selectedLoanType,
      borrowerType: selectedBorrowerType,
      citizenshipType: selectedCitizenshipType,
      ficoScore: selectedFicoScore,
      propertyAddress: selectedPropertyAddress,
      propertyType: selectedPropertyType,
      warrantability: selectedWarrantability,
      bridgeType: selectedBridgeType,
      squareFootage: selectedSquareFootage,
      transactionType: selectedTransactionType,
      wholesalerFee: selectedWholesalerFee,
      transactionDetailsData: selectedTransactionDetailsData,
      experienceData: selectedExperienceData,
      rehabDetailsData: selectedRehabDetailsData,
      loanPricingData: loanPricingType
    })
  }

  const handleBack = () => {
    if (currentStep === "loan-pricing") {
      // Go back based on bridge type
      if (selectedBridgeType === "bridge_rehab" || selectedBridgeType === "ground_up") {
        setCurrentStep("rehab-details")
      } else {
        setCurrentStep("experience")
      }
    } else if (currentStep === "rehab-details") {
      setCurrentStep("experience")
    } else if (currentStep === "loan-structure") {
    }
    if (currentStep === "loan-structure") {
      setCurrentStep("transaction-details")
    } else if (currentStep === "experience") {
      setCurrentStep("transaction-details")
    } else if (currentStep === "transaction-details") {
      // Go back based on loan type and transaction type
      if (selectedLoanType === "dscr") {
        setCurrentStep("income-expenses")
      } else if (selectedLoanType === "bridge") {
        // For Bridge loans, check if we came from wholesaler fee or transaction type
        if (selectedTransactionType === "purchase") {
          setCurrentStep("wholesaler-fee")
        } else {
          setCurrentStep("transaction-type")
        }
      }
    } else if (currentStep === "income-expenses") {
    }
    if (currentStep === "income-expenses") {
      // Go back based on whether we came from wholesaler fee or occupancy
      if (selectedTransactionType === "purchase") {
        setCurrentStep("wholesaler-fee")
      } else {
        setCurrentStep("occupancy")
      }
    } else if (currentStep === "wholesaler-fee") {
      // Go back based on loan type
      if (selectedLoanType === "dscr") {
        setCurrentStep("occupancy")
      } else if (selectedLoanType === "bridge") {
        setCurrentStep("transaction-type")
      }
    } else if (currentStep === "occupancy") {
      setCurrentStep("transaction-type")
    } else if (currentStep === "transaction-type") {
      // Go back based on loan type
      if (selectedLoanType === "bridge") {
        setCurrentStep("bridge-type")
      } else {
        setCurrentStep("square-footage")
      }
    } else if (currentStep === "square-footage") {
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

  if (currentStep === "transaction-type") {
    return <TransactionTypeSelection onBack={handleBack} onNext={handleTransactionTypeNext} />
  }

  if (currentStep === "occupancy") {
    return <OccupancySelection onBack={handleBack} onNext={handleOccupancyNext} />
  }

  if (currentStep === "wholesaler-fee") {
    return <WholesalerFeeSelection onBack={handleBack} onNext={handleWholesalerFeeNext} />
  }

  if (currentStep === "income-expenses") {
    return <IncomeExpensesSelection onBack={handleBack} onNext={handleIncomeExpensesNext} />
  }

  if (currentStep === "transaction-details") {
    return <TransactionDetailsSelection onBack={handleBack} onNext={handleTransactionDetailsNext} />
  }

  if (currentStep === "loan-structure") {
    return <LoanStructureSelection onBack={handleBack} onNext={handleLoanStructureNext} />
  }

  if (currentStep === "experience") {
    return <ExperienceSelection onBack={handleBack} onNext={handleExperienceNext} />
  }

  if (currentStep === "rehab-details") {
    return <RehabDetailsSelection onBack={handleBack} onNext={handleRehabDetailsNext} />
  }

  if (currentStep === "loan-pricing") {
    return <LoanPricingSelection onBack={handleBack} onNext={handleLoanPricingNext} />
  }

  return null
}