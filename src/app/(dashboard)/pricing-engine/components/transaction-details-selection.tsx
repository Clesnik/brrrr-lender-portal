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
}

export default function TransactionDetailsSelection({ onBack, onNext }: Props) {
  const [transactionDetailsData, setTransactionDetailsData] = useState<TransactionDetailsData>({
    purchasePrice: "",
    asIsValue: "",
    rehabCompleted: "",
    payoffAmount: "",
  })

  const isFormValid = 
    transactionDetailsData.purchasePrice && 
    transactionDetailsData.asIsValue

  const handleContinue = () => {
    if (isFormValid) {
      onNext(transactionDetailsData)
    }
  }

  const updateField = (field: keyof TransactionDetailsData, value: string) => {
    setTransactionDetailsData(prev => ({ ...prev, [field]: value }))
  }

  const formatCurrency = (value: string) => {
    // Remove non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, '')
    if (numericValue === '') return ''
    
    const number = parseFloat(numericValue)
    if (isNaN(number)) return ''
    
    return number.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  const handleCurrencyInput = (field: keyof TransactionDetailsData, value: string) => {
    // Store the raw numeric value
    const numericValue = value.replace(/[^0-9.]/g, '')
    updateField(field, numericValue)
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
            className="flex items-center gap-2"
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
                  value={formatCurrency(transactionDetailsData.purchasePrice)}
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
                  value={formatCurrency(transactionDetailsData.asIsValue)}
                  onChange={(e) => handleCurrencyInput("asIsValue", e.target.value)}
                  className="pl-8 text-lg h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rehabCompleted">Rehab Completed</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="rehabCompleted"
                  placeholder="0.00"
                  value={formatCurrency(transactionDetailsData.rehabCompleted)}
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
                  value={formatCurrency(transactionDetailsData.payoffAmount)}
                  onChange={(e) => handleCurrencyInput("payoffAmount", e.target.value)}
                  className="pl-8 text-lg h-12"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-8">
            <Button 
              size="lg" 
              disabled={!isFormValid}
              onClick={handleContinue}
              className="px-12 bg-blue-600 hover:bg-blue-700"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}