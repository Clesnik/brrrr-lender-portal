"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface OccupancyData {
  numberOfUnits: string
  numberOfVacantUnits: string
  isShortTermRental: string
  isSection8: string
}

interface Props {
  onBack: () => void
  onNext: (occupancyData: OccupancyData) => void
  propertyType: "single_family" | "townhome_pud" | "condominium" | "multifamily_2_4" | "multifamily_5_8" | null
}

export default function OccupancySelection({ onBack, onNext, propertyType }: Props) {
  const [occupancyData, setOccupancyData] = useState<OccupancyData>({
    numberOfUnits: "",
    numberOfVacantUnits: "",
    isShortTermRental: "",
    isSection8: "",
  })

  const isFormValid = 
    occupancyData.numberOfUnits && 
    occupancyData.numberOfVacantUnits && 
    occupancyData.isShortTermRental && 
    occupancyData.isSection8

  const handleContinue = () => {
    if (isFormValid) {
      onNext(occupancyData)
    }
  }

  const updateField = (field: keyof OccupancyData, value: string) => {
    setOccupancyData(prev => ({ ...prev, [field]: value }))
  }

  const getUnitOptions = () => {
    if (!propertyType) return []
    
    switch (propertyType) {
      case "single_family":
      case "townhome_pud":
      case "condominium":
        return [{ value: "1", label: "1" }]
      case "multifamily_2_4":
        return [
          { value: "2", label: "2" },
          { value: "3", label: "3" },
          { value: "4", label: "4" }
        ]
      case "multifamily_5_8":
        return [
          { value: "5", label: "5" },
          { value: "6", label: "6" },
          { value: "7", label: "7" },
          { value: "8", label: "8" }
        ]
      default:
        return []
    }
  }

  const unitOptions = getUnitOptions()

  const getVacantUnitOptions = () => {
    if (!propertyType) return []
    
    switch (propertyType) {
      case "single_family":
      case "townhome_pud":
      case "condominium":
        return [
          { value: "0", label: "0" },
          { value: "1", label: "1" }
        ]
      case "multifamily_2_4":
        return [
          { value: "0", label: "0" },
          { value: "1", label: "1" },
          { value: "2", label: "2" },
          { value: "3", label: "3" },
          { value: "4", label: "4" }
        ]
      case "multifamily_5_8":
        return [
          { value: "0", label: "0" },
          { value: "1", label: "1" },
          { value: "2", label: "2" },
          { value: "3", label: "3" },
          { value: "4", label: "4" },
          { value: "5", label: "5" },
          { value: "6", label: "6" },
          { value: "7", label: "7" },
          { value: "8", label: "8" }
        ]
      default:
        return []
    }
  }

  const vacantUnitOptions = getVacantUnitOptions()

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] p-8">
      <div className="w-full max-w-4xl space-y-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center space-x-8 mb-12">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full">
              <Check className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium">Transaction Type</span>
          </div>
          <div className="w-16 h-0.5 bg-blue-600"></div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-medium">
              9
            </div>
            <span className="text-sm font-medium">Occupancy</span>
          </div>
          <div className="w-16 h-0.5 bg-gray-300"></div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-500 rounded-full font-medium">
              10
            </div>
            <span className="text-sm text-gray-500">Income & Expenses</span>
          </div>
        </div>

        {/* Step indicator */}
        <div className="text-center">
          <p className="text-muted-foreground text-sm">Step 9 of 13</p>
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
          <h1 className="text-4xl font-bold tracking-tight">Occupancy</h1>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto space-y-8 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="numberOfUnits"># of Units</Label>
              <Select value={occupancyData.numberOfUnits} onValueChange={(value) => updateField("numberOfUnits", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {unitOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="numberOfVacantUnits"># of Vacant Units</Label>
              <Select value={occupancyData.numberOfVacantUnits} onValueChange={(value) => updateField("numberOfVacantUnits", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {vacantUnitOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="isShortTermRental">Is the property a short term rental?</Label>
              <Select value={occupancyData.isShortTermRental} onValueChange={(value) => updateField("isShortTermRental", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="No" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="isSection8">Are any units Section 8?</Label>
              <Select value={occupancyData.isSection8} onValueChange={(value) => updateField("isSection8", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="No" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
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