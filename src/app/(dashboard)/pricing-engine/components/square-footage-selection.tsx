"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

type PropertyType = "single_family" | "townhome_pud" | "condominium" | "multifamily_2_4" | "multifamily_5_8"

type SquareFootageAnswer = "yes" | "no"

interface Props {
  onBack: () => void
  onNext: (answer: SquareFootageAnswer) => void
  propertyType: PropertyType
}

export default function SquareFootageSelection({ onBack, onNext, propertyType }: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<SquareFootageAnswer | null>(null)

  const handleContinue = () => {
    if (selectedAnswer) {
      onNext(selectedAnswer)
    }
  }

  const getSubheading = () => {
    if (propertyType === "single_family" || propertyType === "townhome_pud") {
      return "Is the unit below 700 sq ft?"
    } else if (propertyType === "condominium") {
      return "Is the unit below 500 sq ft?"
    } else if (propertyType === "multifamily_2_4" || propertyType === "multifamily_5_8") {
      return "Are any unit(s) below 500 sq ft?"
    }
    return "Is the unit below 700 sq ft?" // fallback
  }

  const answers = [
    { value: "yes" as const, label: "Yes" },
    { value: "no" as const, label: "No" },
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
            <span className="text-sm font-medium">Property Type</span>
          </div>
          <div className="w-16 h-0.5 bg-blue-600"></div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-medium">
              7
            </div>
            <span className="text-sm font-medium">Square Footage</span>
          </div>
          <div className="w-16 h-0.5 bg-gray-300"></div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-500 rounded-full font-medium">
              8
            </div>
            <span className="text-sm text-gray-500">Transaction Type</span>
          </div>
        </div>

        {/* Step indicator */}
        <div className="text-center">
          <p className="text-muted-foreground text-sm">Step 7 of 13</p>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between mb-8">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Button 
            disabled={!selectedAnswer}
            onClick={handleContinue}
            className="flex items-center gap-2 bg-[#24356C] hover:bg-[#1e2d5a]"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Main content */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Square Footage</h1>
          <p className="text-muted-foreground text-lg">
            {getSubheading()}
          </p>
        </div>

        <RadioGroup
          value={selectedAnswer || ""}
          onValueChange={(value) => setSelectedAnswer(value as SquareFootageAnswer)}
          className="grid grid-cols-1 gap-4 mt-12 max-w-2xl mx-auto"
        >
          {answers.map((answer) => (
            <div key={answer.value} className="space-y-2">
              <RadioGroupItem value={answer.value} id={answer.value} className="peer sr-only" />
              <Label
                htmlFor={answer.value}
                className="cursor-pointer block"
              >
                <Card className={`transition-all hover:shadow-md ${
                  selectedAnswer === answer.value 
                    ? "border-2 border-[#24356C]" 
                    : "border"
                }`}>
                  <CardHeader className="py-6">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-semibold">{answer.label}</CardTitle>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswer === answer.value 
                          ? "border-[#24356C] bg-[#24356C]" 
                          : "border-gray-300"
                      }`}>
                        <div className={`w-2 h-2 rounded-full bg-white ${
                          selectedAnswer === answer.value ? "opacity-100" : "opacity-0"
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
    </div>
  )
}