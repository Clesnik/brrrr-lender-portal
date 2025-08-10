"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface TransactionDetailsData {
  purchasePrice: string
  asIsValue: string
  rehabCompleted: string
  payoffAmount: string
}

interface Props {
  onBack: () => void
  onNext: (transactionDetailsData: TransactionDetailsData) => void
  transactionType: "purchase" | "delayed_purchase" | "refinance_cash_out" | "refinance_rate_term" | null
}

export default function TransactionDetailsSelection({ onBack, onNext, transactionType }: Props) {
  const [transactionDetailsData, setTransactionDetailsData] = useState<TransactionDetailsData>({
    purchasePrice: "",
    asIsValue: "",
    rehabCompleted: "",
    payoffAmount: "",
  })

  const isFormValid = 
    transactionDetailsData.purchasePrice && 
    transactionDetailsData.asIsValue &&
    (transactionType === "purchase" || 
     (transactionDetailsData.rehabCompleted && transactionDetailsData.payoffAmount))

  const handleContinue = () => {
    if (isFormValid) {
      onNext(transactionDetailsData)
    }
  }

  const updateField = (field: keyof TransactionDetailsData, value: string) => {
    setTransactionDetailsData(prev => ({ ...prev, [field]: value }))
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

  const handleCurrencyInput = (field: keyof TransactionDetailsData, value: string) => {
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
              12
            </div>
            <span className="text-sm font-medium">Transaction Details</span>
          </div>
          <div className="w-16 h-0.5 bg-gray-300"></div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-500 rounded-full font-medium">
              13
            </div>
            <span className="text-sm text-gray-500">Experience</span>
          </div>
        </div>

        {/* Step indicator */}
        <div className="text-center">
          <p className="text-muted-foreground text-sm">Step 12 of 14</p>
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
            className="flex items-center gap-2 bg-[#24356C] hover:bg-[#1e2d5a]"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Main content */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Transaction Details</h1>
          <p className="text-muted-foreground text-lg">
            Enter the purchase price and current value of the property
          </p>
        </div>

        {/* Form */}
        <div className="max-w-4xl mx-auto space-y-12 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <Label htmlFor="purchasePrice">Purchase Price</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="purchasePrice"
                  placeholder="0.00"
                  value={formatDisplayValue(transactionDetailsData.purchasePrice)}
                  onChange={(e) => handleCurrencyInput("purchasePrice", e.target.value)}
                  className="pl-8 text-lg h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="asIsValue">As-Is Value</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="asIsValue"
                  placeholder="0.00"
                  value={formatDisplayValue(transactionDetailsData.asIsValue)}
                  onChange={(e) => handleCurrencyInput("asIsValue", e.target.value)}
                  className="pl-8 text-lg h-12"
                />
              </div>
            </div>

            {transactionType !== "purchase" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="rehabCompleted">Rehab Completed</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="rehabCompleted"
                      placeholder="0.00"
                      value={formatDisplayValue(transactionDetailsData.rehabCompleted)}
                      onChange={(e) => handleCurrencyInput("rehabCompleted", e.target.value)}
                      className="pl-8 text-lg h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payoffAmount">Payoff Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="payoffAmount"
                      placeholder="0.00"
                      value={formatDisplayValue(transactionDetailsData.payoffAmount)}
                      onChange={(e) => handleCurrencyInput("payoffAmount", e.target.value)}
                      className="pl-8 text-lg h-12"
                    />
                  </div>
                </div>
              </>
            )}
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