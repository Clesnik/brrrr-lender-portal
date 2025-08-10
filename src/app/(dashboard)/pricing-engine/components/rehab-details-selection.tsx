"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type RehabDetailsData = {
  expandingSquareFootage: "yes" | "no"
  changingUse: "yes" | "no"
  constructionBudget: string
  afterRepairValue: string
}

interface Props {
  onBack: () => void
  onNext: (rehabDetailsData: RehabDetailsData) => void
}

export default function RehabDetailsSelection({ onBack, onNext }: Props) {
  const [rehabDetailsData, setRehabDetailsData] = useState<RehabDetailsData>({
    expandingSquareFootage: "no",
    changingUse: "no",
    constructionBudget: "",
    afterRepairValue: "",
  })

  const isFormValid = 
    rehabDetailsData.expandingSquareFootage && 
    rehabDetailsData.changingUse &&
    rehabDetailsData.constructionBudget &&
    rehabDetailsData.afterRepairValue

  const handleContinue = () => {
    if (isFormValid) {
      onNext(rehabDetailsData)
    }
  }

  const updateStringField = (field: "constructionBudget" | "afterRepairValue", value: string) => {
    setRehabDetailsData(prev => ({ ...prev, [field]: value }))
  }

  const updateBooleanLikeField = (field: "expandingSquareFootage" | "changingUse", value: "yes" | "no") => {
    setRehabDetailsData(prev => ({ ...prev, [field]: value }))
  }

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, '')
    if (numericValue === '') return ''
    
    const number = parseFloat(numericValue)
    if (isNaN(number)) return ''
    
    return number.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  const handleCurrencyInput = (field: "constructionBudget" | "afterRepairValue", value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, '')
    updateStringField(field, numericValue)
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
            <span className="text-sm font-medium">Experience</span>
          </div>
          <div className="w-16 h-0.5 bg-blue-600"></div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-medium">
              11
            </div>
            <span className="text-sm font-medium">Rehab Details</span>
          </div>
          <div className="w-16 h-0.5 bg-gray-300"></div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-500 rounded-full font-medium">
              12
            </div>
            <span className="text-sm text-gray-500">Loan Pricing</span>
          </div>
        </div>

        {/* Step indicator */}
        <div className="text-center">
          <p className="text-muted-foreground text-sm">Step 11 of 13</p>
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
            className="px-12 bg-[#24356C] hover:bg-[#1e2d5a]"
            Next
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Main content */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Rehab Details</h1>
          <p className="text-muted-foreground text-lg">
            Provide details about your rehabilitation project
          </p>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto space-y-8 mt-12">
          {/* Expanding Square Footage Question */}
          <div className="space-y-4">
            <p className="text-center text-lg font-medium">
              Does your project involve expanding the square footage by 20% or more?
            </p>
            <RadioGroup
              value={rehabDetailsData.expandingSquareFootage}
              onValueChange={(value) => updateBooleanLikeField("expandingSquareFootage", value as "yes" | "no")}
              className="space-y-3"
            >
              <div className="space-y-2">
                <RadioGroupItem value="yes" id="expanding-yes" className="peer sr-only" />
                <Label
                  htmlFor="expanding-yes"
                  className="cursor-pointer block"
                >
                  <Card className={`transition-all hover:shadow-md ${
                    rehabDetailsData.expandingSquareFootage === "yes" 
                      ? "border-2 border-[#24356C]" 
                      : "border"
                  }`}>
                    <CardHeader className="py-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-medium">Yes</CardTitle>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          rehabDetailsData.expandingSquareFootage === "yes" 
                            ? "border-[#24356C] bg-[#24356C]" 
                            : "border-gray-300"
                        }`}>
                          <div className={`w-2 h-2 rounded-full bg-white ${
                            rehabDetailsData.expandingSquareFootage === "yes" ? "opacity-100" : "opacity-0"
                          }`}></div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Label>
              </div>

              <div className="space-y-2">
                <RadioGroupItem value="no" id="expanding-no" className="peer sr-only" />
                <Label
                  htmlFor="expanding-no"
                  className="cursor-pointer block"
                >
                  <Card className={`transition-all hover:shadow-md ${
                    rehabDetailsData.expandingSquareFootage === "no" 
                      ? "border-2 border-[#24356C]" 
                      : "border"
                  }`}>
                    <CardHeader className="py-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-medium">No</CardTitle>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          rehabDetailsData.expandingSquareFootage === "no" 
                            ? "border-[#24356C] bg-[#24356C]" 
                            : "border-gray-300"
                        }`}>
                          <div className={`w-2 h-2 rounded-full bg-white ${
                            rehabDetailsData.expandingSquareFootage === "no" ? "opacity-100" : "opacity-0"
                          }`}></div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Changing Use Question */}
          <div className="space-y-4">
            <p className="text-center text-lg font-medium">
              Does your project involve changing the use of the property?
            </p>
            <RadioGroup
              value={rehabDetailsData.changingUse}
              onValueChange={(value) => updateBooleanLikeField("changingUse", value as "yes" | "no")}
              className="space-y-3"
            >
              <div className="space-y-2">
                <RadioGroupItem value="yes" id="changing-yes" className="peer sr-only" />
                <Label
                  htmlFor="changing-yes"
                  className="cursor-pointer block"
                >
                  <Card className={`transition-all hover:shadow-md ${
                    rehabDetailsData.changingUse === "yes" 
                      ? "border-2 border-[#24356C]" 
                      : "border"
                  }`}>
                    <CardHeader className="py-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-medium">Yes</CardTitle>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          rehabDetailsData.changingUse === "yes" 
                            ? "border-[#24356C] bg-[#24356C]" 
                            : "border-gray-300"
                        }`}>
                          <div className={`w-2 h-2 rounded-full bg-white ${
                            rehabDetailsData.changingUse === "yes" ? "opacity-100" : "opacity-0"
                          }`}></div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Label>
              </div>

              <div className="space-y-2">
                <RadioGroupItem value="no" id="changing-no" className="peer sr-only" />
                <Label
                  htmlFor="changing-no"
                  className="cursor-pointer block"
                >
                  <Card className={`transition-all hover:shadow-md ${
                    rehabDetailsData.changingUse === "no" 
                      ? "border-2 border-[#24356C]" 
                      : "border"
                  }`}>
                    <CardHeader className="py-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-medium">No</CardTitle>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          rehabDetailsData.changingUse === "no" 
                            ? "border-[#24356C] bg-[#24356C]" 
                            : "border-gray-300"
                        }`}>
                          <div className={`w-2 h-2 rounded-full bg-white ${
                            rehabDetailsData.changingUse === "no" ? "opacity-100" : "opacity-0"
                          }`}></div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Currency Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="constructionBudget">Construction Budget</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="constructionBudget"
                  placeholder="0.00"
                  value={formatCurrency(rehabDetailsData.constructionBudget)}
                  onChange={(e) => handleCurrencyInput("constructionBudget", e.target.value)}
                  className="pl-8 text-lg h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="afterRepairValue">After Repair Value</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="afterRepairValue"
                  placeholder="0.00"
                  value={formatCurrency(rehabDetailsData.afterRepairValue)}
                  onChange={(e) => handleCurrencyInput("afterRepairValue", e.target.value)}
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