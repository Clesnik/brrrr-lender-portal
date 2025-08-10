"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

type LoanType = "dscr" | "bridge"

interface Props {
  onNext: (loanType: LoanType) => void
}

export default function LoanTypeSelection({ onNext }: Props) {
  const [selectedType, setSelectedType] = useState<LoanType | null>(null)

  const handleContinue = () => {
    if (selectedType) {
      onNext(selectedType)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] p-8">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Select your loan type</h1>
          <p className="text-muted-foreground text-lg">
            Choose between a DSCR loan for long-term rental financing or a
            <br />
            Bridge loan for short-term fix-and-flip projects
          </p>
        </div>

        <RadioGroup
          value={selectedType || ""}
          onValueChange={(value) => setSelectedType(value as LoanType)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12"
        >
          <div className="space-y-2">
            <RadioGroupItem value="dscr" id="dscr" className="peer sr-only" />
            <Label
              htmlFor="dscr"
              className="cursor-pointer block"
            >
              <Card className="h-full transition-all hover:shadow-md peer-data-[state=checked]:border-2 peer-data-[state=checked]:border-[#24356C]">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">DSCR</CardTitle>
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-data-[state=checked]:border-[#24356C] peer-data-[state=checked]:bg-[#24356C] flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white opacity-0 peer-data-[state=checked]:opacity-100"></div>
                    </div>
                  </div>
                  <CardDescription className="text-base">
                    Long-term rental property financing based on cash flow
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-current rounded-full" />
                      No personal income verification required
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-current rounded-full" />
                      Loan amounts up to $3M
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-current rounded-full" />
                      Terms up to 30 years
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-current rounded-full" />
                      Close in LLC or personal name
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </Label>
          </div>

          <div className="space-y-2">
            <RadioGroupItem value="bridge" id="bridge" className="peer sr-only" />
            <Label
              htmlFor="bridge"
              className="cursor-pointer block"
            >
              <Card className="h-full transition-all hover:shadow-md peer-data-[state=checked]:border-2 peer-data-[state=checked]:border-[#24356C]">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">Bridge</CardTitle>
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-data-[state=checked]:border-[#24356C] peer-data-[state=checked]:bg-[#24356C] flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white opacity-0 peer-data-[state=checked]:opacity-100"></div>
                    </div>
                  </div>
                  <CardDescription className="text-base">
                    Short-term financing for fix-and-flip projects
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-current rounded-full" />
                      Up to 90% purchase + 100% rehab
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-current rounded-full" />
                      Interest-only payments
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-current rounded-full" />
                      Terms 6-24 months
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-current rounded-full" />
                      Ground-up construction available
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-current rounded-full" />
                      Close in LLC or personal name
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </Label>
          </div>
        </RadioGroup>

        <div className="flex justify-center pt-8">
          <Button 
            size="lg" 
            disabled={!selectedType}
            onClick={handleContinue}
            className="px-8 bg-[#24356C] hover:bg-[#1e2d5a]"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}