"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

type CitizenshipType = "us_citizen" | "permanent_resident" | "non_permanent_resident" | "foreign_national"

interface Props {
  onBack: () => void
  onNext: (citizenshipType: CitizenshipType) => void
}

export default function CitizenshipSelection({ onBack, onNext }: Props) {
  const [selectedType, setSelectedType] = useState<CitizenshipType | null>(null)

  const handleContinue = () => {
    if (selectedType) {
      onNext(selectedType)
    }
  }

  const citizenshipTypes = [
    { value: "us_citizen" as const, label: "U.S. Citizen", description: "Born in the United States or naturalized citizen" },
    { value: "permanent_resident" as const, label: "Permanent Resident", description: "Green card holder with permanent residency status" },
    { value: "non_permanent_resident" as const, label: "Non-Permanent Resident", description: "Temporary visa holder or work authorization" },
    { value: "foreign_national" as const, label: "Foreign National", description: "Non-U.S. citizen residing outside the United States" },
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
            <span className="text-sm font-medium">Loan Type</span>
          </div>
          <div className="w-16 h-0.5 bg-blue-600"></div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full">
              <Check className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium">Borrower Type</span>
          </div>
          <div className="w-16 h-0.5 bg-blue-600"></div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-medium">
              3
            </div>
            <span className="text-sm font-medium">Citizenship</span>
          </div>
          <div className="w-16 h-0.5 bg-gray-300"></div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-500 rounded-full font-medium">
              4
            </div>
            <span className="text-sm text-gray-500">FICO Score</span>
          </div>
        </div>

        {/* Step indicator */}
        <div className="text-center">
          <p className="text-muted-foreground text-sm">Step 3 of 13</p>
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
            className="flex items-center gap-2 bg-[#24356C] hover:bg-[#1e2d5a]"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Main content */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Citizenship</h1>
          <p className="text-muted-foreground text-lg">
            Select the Citizenship of the Primary Guarantor
          </p>
        </div>

        <RadioGroup
          value={selectedType || ""}
          onValueChange={(value) => setSelectedType(value as CitizenshipType)}
          className="grid grid-cols-1 gap-4 mt-12 max-w-2xl mx-auto"
        >
          {citizenshipTypes.map((option) => (
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
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{option.label}</CardTitle>
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
                    <CardDescription className="text-base text-muted-foreground">
                      {option.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}