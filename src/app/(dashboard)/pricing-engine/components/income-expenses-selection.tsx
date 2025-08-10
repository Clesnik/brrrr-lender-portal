"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface IncomeExpensesData {
  grossRent: string
  marketRent: string
  propertyTaxes: string
  homeownersInsurance: string
  floodInsurance: string
  hoa: string
  managementFee: string
}

interface Props {
  onBack: () => void
  onNext: (incomeExpensesData: IncomeExpensesData) => void
}

export default function IncomeExpensesSelection({ onBack, onNext }: Props) {
  const [incomeExpensesData, setIncomeExpensesData] = useState<IncomeExpensesData>({
    grossRent: "",
    marketRent: "",
    propertyTaxes: "",
    homeownersInsurance: "",
    floodInsurance: "",
    hoa: "",
    managementFee: "",
  })

  const isFormValid = 
    incomeExpensesData.grossRent && 
    incomeExpensesData.marketRent && 
    incomeExpensesData.propertyTaxes && 
    incomeExpensesData.homeownersInsurance

  const handleContinue = () => {
    if (isFormValid) {
      onNext(incomeExpensesData)
    }
  }

  const updateField = (field: keyof IncomeExpensesData, value: string) => {
    setIncomeExpensesData(prev => ({ ...prev, [field]: value }))
  }

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

  const handleCurrencyInput = (field: keyof IncomeExpensesData, value: string) => {
    // Remove commas and allow only numbers and decimal points
    const cleanValue = value.replace(/,/g, '').replace(/[^0-9.]/g, '')
    
    // Handle decimal input with 2 decimal place limit
    const parts = cleanValue.split('.')
    if (parts.length > 2) {
      // Multiple decimal points - keep only the first one
      const beforeDecimal = parts[0]
      const afterDecimal = parts.slice(1).join('').substring(0, 2)
      updateField(field, beforeDecimal + '.' + afterDecimal)
    } else if (parts.length === 2) {
      // Single decimal point - limit to 2 decimal places
      const beforeDecimal = parts[0] || ''
      const afterDecimal = parts[1].substring(0, 2)
      updateField(field, beforeDecimal + '.' + afterDecimal)
    } else {
      // No decimal point
      updateField(field, cleanValue)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] p-8">
      <div className="w-full max-w-4xl space-y-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center space-x-8 mb-12">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full">
              <Check className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium">Wholesaler Fee</span>
          </div>
          <div className="w-16 h-0.5 bg-blue-600"></div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-medium">
              11
            </div>
            <span className="text-sm font-medium">Income & Expenses</span>
          </div>
          <div className="w-16 h-0.5 bg-gray-300"></div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-500 rounded-full font-medium">
              12
            </div>
            <span className="text-sm text-gray-500">Transaction Details</span>
          </div>
        </div>

        {/* Step indicator */}
        <div className="text-center">
          <p className="text-muted-foreground text-sm">Step 11 of 14</p>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between mb-8">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Button 
            disabled={!isFormValid}
            onClick={handleContinue}
            className="flex items-center gap-2"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Main content */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Income & Expenses</h1>
        </div>

        {/* Form */}
        <div className="max-w-4xl mx-auto space-y-12 mt-12">
          {/* Monthly Property Income */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Monthly Property Income</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="grossRent">Gross Rent</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="grossRent"
                    placeholder="0.00"
                    value={formatDisplayValue(incomeExpensesData.grossRent)}
                    onChange={(e) => handleCurrencyInput("grossRent", e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="marketRent">Market Rent</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="marketRent"
                    placeholder="0.00"
                    value={formatDisplayValue(incomeExpensesData.marketRent)}
                    onChange={(e) => handleCurrencyInput("marketRent", e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Annual Property Expenses */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Annual Property Expenses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="propertyTaxes">Property Taxes</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="propertyTaxes"
                    placeholder="0.00"
                    value={formatDisplayValue(incomeExpensesData.propertyTaxes)}
                    onChange={(e) => handleCurrencyInput("propertyTaxes", e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="homeownersInsurance">Homeowner's Insurance</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="homeownersInsurance"
                    placeholder="0.00"
                    value={formatDisplayValue(incomeExpensesData.homeownersInsurance)}
                    onChange={(e) => handleCurrencyInput("homeownersInsurance", e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="floodInsurance">Flood Insurance</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="floodInsurance"
                    placeholder="0.00"
                    value={formatDisplayValue(incomeExpensesData.floodInsurance)}
                    onChange={(e) => handleCurrencyInput("floodInsurance", e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hoa">HOA</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="hoa"
                    placeholder="0.00"
                    value={formatDisplayValue(incomeExpensesData.hoa)}
                    onChange={(e) => handleCurrencyInput("hoa", e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
            </div>

            <div className="max-w-md mx-auto">
              <div className="space-y-2">
                <Label htmlFor="managementFee">Management Fee</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="managementFee"
                    placeholder="0.00"
                    value={formatDisplayValue(incomeExpensesData.managementFee)}
                    onChange={(e) => handleCurrencyInput("managementFee", e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-8">
            <Button 
              size="lg" 
              disabled={!isFormValid}
              onClick={handleContinue}
              className="px-12 bg-[#24356C] hover:bg-[#1e2d5a]"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}