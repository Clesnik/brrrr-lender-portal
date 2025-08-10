"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

type BridgeType = "bridge" | "bridge_rehab" | "ground_up"

interface Props {
  onBack: () => void
  onNext: (bridgeType: BridgeType) => void
}

export default function BridgeTypeSelection({ onBack, onNext }: Props) {
  const [selectedType, setSelectedType] = useState<BridgeType | null>(null)

  const handleContinue = () => {
    if (selectedType) {
      onNext(selectedType)
    }
  }

  const bridgeTypes = [
    { value: "bridge" as const, label: "Bridge" },
    { value: "bridge_rehab" as const, label: "Bridge + Rehab" },
    { value: "ground_up" as const, label: "Ground Up" },
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
            <span className="text-sm font-medium">Bridge Type</span>
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
          <p className="text-muted-foreground text-sm">Step 7 of 12</p>
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
            className="flex items-center gap-2"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Main content */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Bridge Type</h1>
          <p className="text-muted-foreground text-lg">
            Choose the type of bridge product that best matches your
            <br />
            investment purpose
          </p>
        </div>

        <RadioGroup
          value={selectedType || ""}
          onValueChange={(value) => setSelectedType(value as BridgeType)}
          className="grid grid-cols-1 gap-4 mt-12 max-w-2xl mx-auto"
        >
          {bridgeTypes.map((type) => (
            <div key={type.value} className="space-y-2">
              <RadioGroupItem value={type.value} id={type.value} className="peer sr-only" />
              <Label
                htmlFor={type.value}
                className="cursor-pointer block"
              >
                <Card className={`transition-all hover:shadow-md ${
                  selectedType === type.value 
                    ? "border-2 border-[#24356C]" 
                    : "border"
                }`}>
                  <CardHeader className="py-6">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-semibold">{type.label}</CardTitle>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedType === type.value 
                          ? "border-[#24356C] bg-[#24356C]" 
                          : "border-gray-300"
                      }`}>
                        <div className={`w-2 h-2 rounded-full bg-white ${
                          selectedType === type.value ? "opacity-100" : "opacity-0"
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