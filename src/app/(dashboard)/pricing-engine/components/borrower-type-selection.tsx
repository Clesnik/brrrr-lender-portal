"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

type BorrowerType = "entity" | "individual"

interface Props {
  onBack: () => void
  onNext: (borrowerType: BorrowerType) => void
}

export default function BorrowerTypeSelection({ onBack, onNext }: Props) {
  const [selectedType, setSelectedType] = useState<BorrowerType | null>(null)

  const handleContinue = () => {
    if (selectedType) {
      onNext(selectedType)
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
            <span className="text-sm font-medium">Loan Type</span>
          </div>
          <div className="w-16 h-0.5 bg-blue-600"></div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-medium">
              2
            </div>
            <span className="text-sm font-medium">Borrower Type</span>
          </div>
          <div className="w-16 h-0.5 bg-gray-300"></div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-500 rounded-full font-medium">
              3
            </div>
            <span className="text-sm text-gray-500">Citizenship</span>
          </div>
        </div>

        {/* Step indicator */}
        <div className="text-center">
          <p className="text-muted-foreground text-sm">Step 2 of 13</p>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between mb-8">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Button 
            disabled={!selectedType}
            onClick={handleContinue}
            className="flex items-center gap-2 px-8 bg-[#24356C] hover:bg-[#1e2d5a]"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Main content */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Borrower Type</h1>
          <p className="text-muted-foreground text-lg">
            Please select whether the borrower is closing in an entity or
            <br />
            individual name
          </p>
        </div>

        <RadioGroup
          value={selectedType || ""}
          onValueChange={(value) => setSelectedType(value as BorrowerType)}
          className="grid grid-cols-1 gap-6 mt-12 max-w-2xl mx-auto"
        >
          <div className="space-y-2">
            <RadioGroupItem value="entity" id="entity" className="peer sr-only" />
            <Label
              htmlFor="entity"
              className="cursor-pointer block"
            >
              <Card className={`transition-all hover:shadow-md ${
                selectedType === "entity" 
                  ? "border-2 border-[#24356C]" 
                  : "border"
              }`}>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">Entity</CardTitle>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedType === "entity" 
                        ? "border-[#24356C] bg-[#24356C]" 
                        : "border-gray-300"
                    }`}>
                      <div className={`w-2 h-2 rounded-full bg-white ${
                        selectedType === "entity" ? "opacity-100" : "opacity-0"
                      }`}></div>
                    </div>
                  </div>
                  <CardDescription className="text-base">
                    Closing in an LLC, Corporation, or other business entity
                  </CardDescription>
                </CardHeader>
              </Card>
            </Label>
          </div>

          <div className="space-y-2">
            <RadioGroupItem value="individual" id="individual" className="peer sr-only" />
            <Label
              htmlFor="individual"
              className="cursor-pointer block"
            >
              <Card className={`transition-all hover:shadow-md ${
                selectedType === "individual" 
                  ? "border-2 border-[#24356C]" 
                  : "border"
              }`}>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">Individual</CardTitle>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedType === "individual" 
                        ? "border-[#24356C] bg-[#24356C]" 
                        : "border-gray-300"
                    }`}>
                      <div className={`w-2 h-2 rounded-full bg-white ${
                        selectedType === "individual" ? "opacity-100" : "opacity-0"
                      }`}></div>
                    </div>
                  </div>
                  <CardDescription className="text-base">
                    Closing in personal name or as an individual
                  </CardDescription>
                </CardHeader>
              </Card>
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}