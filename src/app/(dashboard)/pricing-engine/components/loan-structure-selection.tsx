"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

type LoanStructureType = "30_year_fixed" | "10_1_arm_io"
type PrepaymentPenaltyType = "5_year_step_down" | "4_year_step_down" | "3_year_step_down" | "2_year_step_down" | "1_year" | "none"
type MaxLeverageType = "yes" | "no"

interface LoanStructureData {
  loanStructure: LoanStructureType
  prepaymentPenalty: PrepaymentPenaltyType
  maxLeverage: MaxLeverageType
}

interface Props {
  onBack: () => void
  onNext: (loanStructureData: LoanStructureData) => void
}

export default function LoanStructureSelection({ onBack, onNext }: Props) {
  const [loanStructureData, setLoanStructureData] = useState<LoanStructureData>({
    loanStructure: "30_year_fixed",
    prepaymentPenalty: "none",
    maxLeverage: "no",
  })

  const handleContinue = () => {
    onNext(loanStructureData)
  }

  const updateField = <K extends keyof LoanStructureData>(field: K, value: LoanStructureData[K]) => {
    setLoanStructureData(prev => ({ ...prev, [field]: value }))
  }

  const loanStructureOptions = [
    { value: "30_year_fixed" as const, label: "30 Year Fixed Rate" },
    { value: "10_1_arm_io" as const, label: "10/1 ARM IO" },
  ]

  const prepaymentPenaltyOptions = [
    { value: "5_year_step_down" as const, label: "5 Year Step Down" },
    { value: "4_year_step_down" as const, label: "4 Year Step Down" },
    { value: "3_year_step_down" as const, label: "3 Year Step Down" },
    { value: "2_year_step_down" as const, label: "2 Year Step Down" },
    { value: "1_year" as const, label: "1 Year" },
    { value: "none" as const, label: "None" },
  ]

  const maxLeverageOptions = [
    { value: "yes" as const, label: "Yes - Provide maximum leverage" },
    { value: "no" as const, label: "No - Custom pricing" },
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
            <span className="text-sm font-medium">Transaction Details</span>
          </div>
          <div className="w-16 h-0.5 bg-blue-600"></div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-medium">
              13
            </div>
            <span className="text-sm font-medium">Loan Structure</span>
          </div>
          <div className="w-16 h-0.5 bg-gray-300"></div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-500 rounded-full font-medium">
              14
            </div>
            <span className="text-sm text-gray-500">Loan Terms</span>
          </div>
        </div>

        {/* Step indicator */}
        <div className="text-center">
          <p className="text-muted-foreground text-sm">Step 13 of 14</p>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between mb-8">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Button 
            onClick={handleContinue}
            className="flex items-center gap-2"
          >
            Calculate
          </Button>
        </div>

        {/* Main content */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Loan Structure</h1>
          <p className="text-muted-foreground text-lg">
            Select the loan structure that best matches your loan purpose
          </p>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto space-y-12 mt-12">
          {/* Loan Structure */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Loan Structure</h2>
            <RadioGroup
              value={loanStructureData.loanStructure}
              onValueChange={(value) => updateField("loanStructure", value as LoanStructureType)}
              className="space-y-3"
            >
              {loanStructureOptions.map((option) => (
                <div key={option.value} className="space-y-2">
                  <RadioGroupItem value={option.value} id={option.value} className="peer sr-only" />
                  <Label
                    htmlFor={option.value}
                    className="cursor-pointer block"
                  >
                    <Card className={`transition-all hover:shadow-md ${
                      loanStructureData.loanStructure === option.value 
                        ? "border-2 border-[#24356C]" 
                        : "border"
                    }`}>
                      <CardHeader className="py-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg font-medium">{option.label}</CardTitle>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            loanStructureData.loanStructure === option.value 
                              ? "border-[#24356C] bg-[#24356C]" 
                              : "border-gray-300"
                          }`}>
                            <div className={`w-2 h-2 rounded-full bg-white ${
                              loanStructureData.loanStructure === option.value ? "opacity-100" : "opacity-0"
                            }`}></div>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Prepayment Penalty */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Prepayment Penalty</h2>
            <RadioGroup
              value={loanStructureData.prepaymentPenalty}
              onValueChange={(value) => updateField("prepaymentPenalty", value as PrepaymentPenaltyType)}
              className="space-y-3"
            >
              {prepaymentPenaltyOptions.map((option) => (
                <div key={option.value} className="space-y-2">
                  <RadioGroupItem value={option.value} id={option.value} className="peer sr-only" />
                  <Label
                    htmlFor={option.value}
                    className="cursor-pointer block"
                  >
                    <Card className={`transition-all hover:shadow-md ${
                      loanStructureData.prepaymentPenalty === option.value 
                        ? "border-2 border-[#24356C]" 
                        : "border"
                    }`}>
                      <CardHeader className="py-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg font-medium">{option.label}</CardTitle>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            loanStructureData.prepaymentPenalty === option.value 
                              ? "border-[#24356C] bg-[#24356C]" 
                              : "border-gray-300"
                          }`}>
                            <div className={`w-2 h-2 rounded-full bg-white ${
                              loanStructureData.prepaymentPenalty === option.value ? "opacity-100" : "opacity-0"
                            }`}></div>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Max Leverage */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Are you looking for max leverage?</h2>
            <RadioGroup
              value={loanStructureData.maxLeverage}
              onValueChange={(value) => updateField("maxLeverage", value as MaxLeverageType)}
              className="space-y-3"
            >
              {maxLeverageOptions.map((option) => (
                <div key={option.value} className="space-y-2">
                  <RadioGroupItem value={option.value} id={option.value} className="peer sr-only" />
                  <Label
                    htmlFor={option.value}
                    className="cursor-pointer block"
                  >
                    <Card className={`transition-all hover:shadow-md ${
                      loanStructureData.maxLeverage === option.value 
                        ? "border-2 border-[#24356C]" 
                        : "border"
                    }`}>
                      <CardHeader className="py-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg font-medium">{option.label}</CardTitle>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            loanStructureData.maxLeverage === option.value 
                              ? "border-[#24356C] bg-[#24356C]" 
                              : "border-gray-300"
                          }`}>
                            <div className={`w-2 h-2 rounded-full bg-white ${
                              loanStructureData.maxLeverage === option.value ? "opacity-100" : "opacity-0"
                            }`}></div>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex justify-center pt-8">
            <Button 
              size="lg" 
              onClick={handleContinue}
              className="px-12 bg-blue-600 hover:bg-blue-700"
            >
              Calculate
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}