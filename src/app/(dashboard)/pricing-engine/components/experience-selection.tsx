"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ExperienceData {
  numberOfFlips: string
  numberOfGroundUps: string
  numberOfRentalsOwned: string
}

interface Props {
  onBack: () => void
  onNext: (experienceData: ExperienceData) => void
}

export default function ExperienceSelection({ onBack, onNext }: Props) {
  const [experienceData, setExperienceData] = useState<ExperienceData>({
    numberOfFlips: "",
    numberOfGroundUps: "",
    numberOfRentalsOwned: "",
  })

  const isFormValid = 
    experienceData.numberOfFlips && 
    experienceData.numberOfGroundUps && 
    experienceData.numberOfRentalsOwned

  const handleContinue = () => {
    if (isFormValid) {
      onNext(experienceData)
    }
  }

  const updateField = (field: keyof ExperienceData, value: string) => {
    // Only allow numeric input
    const numericValue = value.replace(/[^0-9]/g, '')
    setExperienceData(prev => ({ ...prev, [field]: numericValue }))
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
            <span className="text-sm font-medium">Transaction Details</span>
          </div>
          <div className="w-16 h-0.5 bg-blue-600"></div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-medium">
              10
            </div>
            <span className="text-sm font-medium">Experience</span>
          </div>
          <div className="w-16 h-0.5 bg-gray-300"></div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-500 rounded-full font-medium">
              11
            </div>
            <span className="text-sm text-gray-500">Rehab Details</span>
          </div>
        </div>

        {/* Step indicator */}
        <div className="text-center">
          <p className="text-muted-foreground text-sm">Step 10 of 13</p>
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
          <h1 className="text-4xl font-bold tracking-tight">Experience</h1>
          <p className="text-muted-foreground text-lg">
            Rehab in the trailing 36 months
          </p>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto space-y-8 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="numberOfFlips"># of Flips</Label>
              <Input
                id="numberOfFlips"
                placeholder="0"
                value={experienceData.numberOfFlips}
                onChange={(e) => updateField("numberOfFlips", e.target.value)}
                className="text-center text-lg h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="numberOfGroundUps"># of Ground Ups</Label>
              <Input
                id="numberOfGroundUps"
                placeholder="0"
                value={experienceData.numberOfGroundUps}
                onChange={(e) => updateField("numberOfGroundUps", e.target.value)}
                className="text-center text-lg h-12"
              />
            </div>
          </div>

          <div className="max-w-md mx-auto">
            <div className="space-y-2">
              <Label htmlFor="numberOfRentalsOwned"># of Rentals Owned</Label>
              <Input
                id="numberOfRentalsOwned"
                placeholder="0"
                value={experienceData.numberOfRentalsOwned}
                onChange={(e) => updateField("numberOfRentalsOwned", e.target.value)}
                className="text-center text-lg h-12"
              />
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