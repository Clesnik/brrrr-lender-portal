"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

type FicoScoreRange = "no-fico" | "350-659" | "660-679" | "680-699" | "700-719" | "720-739" | "740-759" | "760-779" | "780-850"
type CitizenshipType = "us_citizen" | "permanent_resident" | "non_permanent_resident" | "foreign_national"

interface Props {
  onBack: () => void
  onNext: (ficoScore: FicoScoreRange) => void
  citizenshipType: CitizenshipType | null
}

export default function FicoScoreSelection({ onBack, onNext, citizenshipType }: Props) {
  const [selectedScore, setSelectedScore] = useState<FicoScoreRange | null>(null)

  const handleContinue = () => {
    if (selectedScore) {
      onNext(selectedScore)
    }
  }

  const baseFicoRanges = [
    { value: "350-659" as const, label: "350 - 659" },
    { value: "660-679" as const, label: "660 - 679" },
    { value: "680-699" as const, label: "680 - 699" },
    { value: "700-719" as const, label: "700 - 719" },
    { value: "720-739" as const, label: "720 - 739" },
    { value: "740-759" as const, label: "740 - 759" },
    { value: "760-779" as const, label: "760 - 779" },
    { value: "780-850" as const, label: "780 - 850" },
  ]

  // Add No-FICO option for non-permanent residents and foreign nationals
  const ficoRanges = (citizenshipType === "non_permanent_resident" || citizenshipType === "foreign_national") 
    ? [{ value: "no-fico" as const, label: "No-FICO" }, ...baseFicoRanges]
    : baseFicoRanges

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] p-8">
      <div className="w-full max-w-4xl space-y-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center space-x-8 mb-12">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full">
              <Check className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium">Borrower Type</span>
          </div>
          <div className="w-16 h-0.5 bg-blue-600"></div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full">
              <Check className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium">Citizenship</span>
          </div>
          <div className="w-16 h-0.5 bg-blue-600"></div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-medium">
              4
            </div>
            <span className="text-sm font-medium">FICO Score</span>
          </div>
          <div className="w-16 h-0.5 bg-gray-300"></div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-500 rounded-full font-medium">
              5
            </div>
            <span className="text-sm text-gray-500">Property Address</span>
          </div>
        </div>

        {/* Step indicator */}
        <div className="text-center">
          <p className="text-muted-foreground text-sm">Step 4 of 13</p>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between mb-8">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Button 
            disabled={!selectedScore}
            onClick={handleContinue}
            className="flex items-center gap-2 bg-[#24356C] hover:bg-[#1e2d5a]"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Main content */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">FICO Score</h1>
          <p className="text-muted-foreground text-lg">
            What's your current Mid-FICO score?
          </p>
        </div>

        <RadioGroup
          value={selectedScore || ""}
          onValueChange={(value) => setSelectedScore(value as FicoScoreRange)}
          className="grid grid-cols-1 gap-4 mt-12 max-w-2xl mx-auto"
        >
          {ficoRanges.map((range) => (
            <div key={range.value} className="space-y-2">
              <RadioGroupItem value={range.value} id={range.value} className="peer sr-only" />
              <Label
                htmlFor={range.value}
                className="cursor-pointer block"
              >
                <Card className={`transition-all hover:shadow-md ${
                  selectedScore === range.value 
                    ? "border-2 border-[#24356C]" 
                    : "border"
                }`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-semibold">{range.label}</CardTitle>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedScore === range.value 
                          ? "border-[#24356C] bg-[#24356C]" 
                          : "border-gray-300"
                      }`}>
                        <div className={`w-2 h-2 rounded-full bg-white ${
                          selectedScore === range.value ? "opacity-100" : "opacity-0"
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