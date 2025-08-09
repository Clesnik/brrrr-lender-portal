"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

type WholesalerFeeAnswer = "yes" | "no"

interface Props {
  onBack: () => void
  onNext: (wholesalerFee: WholesalerFeeAnswer) => void
}

export default function WholesalerFeeSelection({ onBack, onNext }: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<WholesalerFeeAnswer | null>(null)

  const handleContinue = () => {
    if (selectedAnswer) {
      onNext(selectedAnswer)
    }
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
            <span className="text-sm font-medium">Transaction Type</span>
          </div>
          <div className="w-16 h-0.5 bg-blue-600"></div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-medium">
              9
            </div>
            <span className="text-sm font-medium">Wholesaler Fee</span>
          </div>
          <div className="w-16 h-0.5 bg-gray-300"></div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-500 rounded-full font-medium">
              10
            </div>
            <span className="text-sm text-gray-500">Transaction Details</span>
          </div>
        </div>

        {/* Step indicator */}
        <div className="text-center">
          <p className="text-muted-foreground text-sm">Step 9 of 14</p>
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
            className="flex items-center gap-2"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Main content */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Wholesaler Fee</h1>
          <p className="text-muted-foreground text-lg">
            Does this transaction have a wholesale fee?
          </p>
        </div>

        <RadioGroup
          value={selectedAnswer || ""}
          onValueChange={(value) => setSelectedAnswer(value as WholesalerFeeAnswer)}
          className="grid grid-cols-1 gap-4 mt-12 max-w-2xl mx-auto"
        >
          {answers.map((answer) => (
            <div key={answer.value} className="space-y-2">
              <RadioGroupItem value={answer.value} id={answer.value} className="peer sr-only" />
              <Label
                htmlFor={answer.value}
                className="cursor-pointer block peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-primary peer-data-[state=checked]:ring-offset-2"
              >
                <Card className="transition-all hover:shadow-md peer-data-[state=checked]:border-primary">
                  <CardHeader className="py-6">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-semibold">{answer.label}</CardTitle>
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white opacity-0 peer-data-[state=checked]:opacity-100"></div>
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