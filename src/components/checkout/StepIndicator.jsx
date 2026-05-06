import { Check } from "lucide-react";

export default function StepIndicator({ currentStep }) {
  const steps = [
    { number: 1, title: "Shipping" },
    { number: 2, title: "Payment" },
    { number: 3, title: "Review" },
  ];

  return (
    <div className="flex items-center justify-center mb-12">
      {steps.map((step, idx) => (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`
                w-12 h-12 rounded-full flex items-center justify-center font-semibold
                transition-all duration-300
                ${currentStep > step.number
                  ? "bg-green-500 text-white"
                  : currentStep === step.number
                  ? "bg-gold text-white"
                  : "bg-gray-200 text-gray-500"
                }
              `}
            >
              {currentStep > step.number ? (
                <Check className="h-6 w-6" />
              ) : (
                step.number
              )}
            </div>
            <span className="text-sm mt-2 font-medium text-gray-700">
              {step.title}
            </span>
          </div>

          {idx < steps.length - 1 && (
            <div
              className={`
                w-24 h-1 mx-4 transition-all duration-300
                ${currentStep > step.number ? "bg-green-500" : "bg-gray-200"}
              `}
            />
          )}
        </div>
      ))}
    </div>
  );
}
