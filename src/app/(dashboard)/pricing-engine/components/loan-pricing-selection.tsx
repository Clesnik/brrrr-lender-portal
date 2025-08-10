"use client"

import { useState } from "react"
import { ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

type LoanPricingType = "max_leverage" | "custom_pricing"
type BridgeType = "bridge" | "bridge_rehab" | "ground_up"

interface Props {
  onBack: () => void
  onNext: (loanPricingType: LoanPricingType) => void
  bridgeType: BridgeType | null
}

export default function LoanPricingSelection({ onBack, onNext, bridgeType }: Props) {
  const [selectedType, setSelectedType] = useState<LoanPricingType | null>(null)
  const [loanAmount, setLoanAmount] = useState<string>("")
  const [ltv, setLtv] = useState<string>("")
  const [rehabHoldback, setRehabHoldback] = useState<string>("")
  const [initialLtv, setInitialLtv] = useState<string>("")
  const [percentageOfBudget, setPercentageOfBudget] = useState<string>("")
  const [totalLoanAmount, setTotalLoanAmount] = useState<string>("")
  const [ltc, setLtc] = useState<string>("")

  const isFormValid = selectedType && (
    selectedType === "max_leverage" || 
    (selectedType === "custom_pricing" && loanAmount && ltv)
  ) && 
  // Always require Total Loan Amount and LTC for Bridge loans
  totalLoanAmount && ltc &&
  // Require Rehab Holdback, Initial LTV, and Percentage of Budget only for Bridge + Rehab or Ground Up
  (bridgeType === "bridge" || (rehabHoldback && initialLtv && percentageOfBudget))

  const formatDisplayValue = (value: string) => {
    if (!value) return ''
    
    // If it ends with a decimal point, format the number part and keep the decimal
    if (value.endsWith('.')) {
      const numberPart = value.slice(0, -1)
      if (numberPart === '') return '.'
      const number = parseFloat(numberPart)
      if (isNaN(number)) return '.'
      return number.toLocaleString('en-US') + '.'
    }
    
    // Handle decimal numbers
    const parts = value.split('.')
    if (parts.length === 2) {
      const beforeDecimal = parts[0] || '0'
      const afterDecimal = parts[1].substring(0, 2) // Limit to 2 decimal places
      
      const number = parseFloat(beforeDecimal)
      if (isNaN(number)) return ''
      
      const formatted = number.toLocaleString('en-US')
      return formatted + '.' + afterDecimal
    }
    
    // Handle whole numbers
    const number = parseFloat(value)
    if (isNaN(number)) return ''
    
    return number.toLocaleString('en-US')
  }

  const handleCurrencyInput = (value: string) => {
    // Remove commas and allow only numbers and decimal points
    const cleanValue = value.replace(/,/g, '').replace(/[^0-9.]/g, '')
    
    // Handle decimal input with 2 decimal place limit
    const parts = cleanValue.split('.')
    if (parts.length > 2) {
      // Multiple decimal points - keep only the first one
      const beforeDecimal = parts[0]
      const afterDecimal = parts.slice(1).join('').substring(0, 2)
      setLoanAmount(beforeDecimal + '.' + afterDecimal)
    } else if (parts.length === 2) {
      // Single decimal point - limit to 2 decimal places
      const beforeDecimal = parts[0] || ''
      const afterDecimal = parts[1].substring(0, 2)
      setLoanAmount(beforeDecimal + '.' + afterDecimal)
    } else {
      // No decimal point
      setLoanAmount(cleanValue)
    }
  }

  const handleRehabHoldbackInput = (value: string) => {
    // Remove commas and allow only numbers and decimal points
    const cleanValue = value.replace(/,/g, '').replace(/[^0-9.]/g, '')
    
    // Handle decimal input with 2 decimal place limit
    const parts = cleanValue.split('.')
    if (parts.length > 2) {
      // Multiple decimal points - keep only the first one
      const beforeDecimal = parts[0]
      const afterDecimal = parts.slice(1).join('').substring(0, 2)
      setRehabHoldback(beforeDecimal + '.' + afterDecimal)
    } else if (parts.length === 2) {
      // Single decimal point - limit to 2 decimal places
      const beforeDecimal = parts[0] || ''
      const afterDecimal = parts[1].substring(0, 2)
      setRehabHoldback(beforeDecimal + '.' + afterDecimal)
    } else {
      // No decimal point
      setRehabHoldback(cleanValue)
    }
  }

  const handleTotalLoanAmountInput = (value: string) => {
    // Remove commas and allow only numbers and decimal points
    const cleanValue = value.replace(/,/g, '').replace(/[^0-9.]/g, '')
    
    // Handle decimal input with 2 decimal place limit
    const parts = cleanValue.split('.')
    if (parts.length > 2) {
      // Multiple decimal points - keep only the first one
      const beforeDecimal = parts[0]
      const afterDecimal = parts.slice(1).join('').substring(0, 2)
      setTotalLoanAmount(beforeDecimal + '.' + afterDecimal)
    } else if (parts.length === 2) {
      // Single decimal point - limit to 2 decimal places
      const beforeDecimal = parts[0] || ''
      const afterDecimal = parts[1].substring(0, 2)
      setTotalLoanAmount(beforeDecimal + '.' + afterDecimal)
    } else {
      // No decimal point
      setTotalLoanAmount(cleanValue)
    }
  }

  const handleCalculate = () => {
    if (isFormValid) {
      onNext(selectedType)
    }
  }

  const pricingOptions = [
    { value: "max_leverage" as const, label: "Yes - Provide maximum leverage" },
    { value: "custom_pricing" as const, label: "No - Custom pricing" },
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] p-8">
      <div className="w-full max-w-4xl space-y-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center space-x-8 mb-12">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full">
              <Check className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium">Rehab Details</span>
          </div>
          <div className="w-16 h-0.5 bg-blue-600"></div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-medium">
              12
            </div>
            <span className="text-sm font-medium">Loan Pricing</span>
          </div>
          <div className="w-16 h-0.5 bg-gray-300"></div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-500 rounded-full font-medium">
              13
            </div>
            <span className="text-sm text-gray-500">Bridge Terms Display</span>
          </div>
        </div>

        {/* Step indicator */}
        <div className="text-center">
          <p className="text-muted-foreground text-sm">Step 12 of 13</p>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between mb-8">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Button 
            disabled={!isFormValid}
            onClick={handleCalculate}
            className="flex items-center gap-2 bg-[#24356C] hover:bg-[#1e2d5a]"
          >
            Calculate
          </Button>
        </div>

        {/* Main content */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Loan Pricing</h1>
          <p className="text-muted-foreground text-lg">
            Are you looking for maximum leverage?
          </p>
        </div>

        <RadioGroup
          value={selectedType || ""}
          onValueChange={(value) => setSelectedType(value as LoanPricingType)}
          className="grid grid-cols-1 gap-4 mt-12 max-w-2xl mx-auto"
        >
          {pricingOptions.map((option) => (
            <div key={option.value} className="space-y-2">
              <RadioGroupItem value={option.value} id={option.value} className="peer sr-only" />
              <Label
                htmlFor={option.value}
                className="cursor-pointer block"
              >
                <Card className={`transition-all hover:shadow-md ${
                  selectedType === option.value 
                    ? "border-2 border-[#24356C]" 
                    : "border"
                }`}>
                  <CardHeader className="py-6">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-medium">{option.label}</CardTitle>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedType === option.value 
                          ? "border-[#24356C] bg-[#24356C]" 
                          : "border-gray-300"
                      }`}>
                        <div className={`w-2 h-2 rounded-full bg-white ${
                          selectedType === option.value ? "opacity-100" : "opacity-0"
                        }`}></div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Label>
            </div>
          ))}
        </RadioGroup>

        {/* Input Fields - Only show when "No - Custom pricing" is selected */}
        {selectedType === "custom_pricing" && (
          <div className="max-w-2xl mx-auto mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Row 1: Initial Loan Amount and Initial LTV */}
              <div className="space-y-2">
                <Label htmlFor="loanAmount">Initial Loan Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="loanAmount"
                    placeholder="0.00"
                    value={formatDisplayValue(loanAmount)}
                    onChange={(e) => handleCurrencyInput(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ltv">Initial LTV</Label>
                <Input
                  id="ltv"
                  type="number"
                  placeholder="0"
                  value={ltv}
                  onChange={(e) => setLtv(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Row 2: Rehab Holdback and Percentage of Budget (only for Bridge + Rehab or Ground Up) */}
              {(bridgeType === "bridge_rehab" || bridgeType === "ground_up") && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="rehabHoldback">Rehab Holdback</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        id="rehabHoldback"
                        placeholder="0.00"
                        value={formatDisplayValue(rehabHoldback)}
                        onChange={(e) => handleRehabHoldbackInput(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="percentageOfBudget">Percentage of Budget</Label>
                    <Input
                      id="percentageOfBudget"
                      type="number"
                      placeholder="0"
                      value={percentageOfBudget}
                      onChange={(e) => setPercentageOfBudget(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </>
              )}

              {/* Row 3: Total Loan Amount and LTC (always for Bridge loans) */}
              <div className="space-y-2">
                <Label htmlFor="totalLoanAmount">Total Loan Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="totalLoanAmount"
                    placeholder="0.00"
                    value={formatDisplayValue(totalLoanAmount)}
                    onChange={(e) => handleTotalLoanAmountInput(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ltc">LTC</Label>
                <Input
                  id="ltc"
                  type="number"
                  placeholder="0"
                  value={ltc}
                  onChange={(e) => setLtc(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center pt-8">
          <Button 
            size="lg" 
            disabled={!isFormValid}
            onClick={handleCalculate}
            className="px-12 bg-[#24356C] hover:bg-[#1e2d5a]"
          >
            Calculate
          </Button>
        </div>
      </div>
    </div>
  )
}