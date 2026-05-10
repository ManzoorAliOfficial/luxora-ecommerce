const STEPS = ["Billing", "Payment", "Confirm"];

export default function StepIndicator({ step }) {
  return (
    <div className="flex items-center gap-0 max-w-xs">
      {STEPS.map((s, i) => (
        <div key={s} className="flex items-center">
          <div className={`flex items-center gap-2 ${i < STEPS.length - 1 ? "mr-0" : ""}`}>
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                step > i + 1 || step === i + 1
                  ? "bg-gold text-white"
                  : "bg-champagne text-muted"
              }`}
            >
              {step > i + 1 ? (
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            <span className={`text-xs ${step === i + 1 ? "text-luxury font-medium" : "text-muted"}`}>
              {s}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`w-8 h-px mx-2 ${step > i + 1 ? "bg-gold" : "bg-champagne"}`} />
          )}
        </div>
      ))}
    </div>
  );
}