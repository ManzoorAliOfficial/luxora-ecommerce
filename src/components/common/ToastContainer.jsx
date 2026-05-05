import { useStore } from "../../context/StoreContext";

export default function ToastContainer() {
  const { toasts } = useStore();
  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col gap-2 pointer-events-none"
         role="region" aria-label="Notifications" aria-live="polite">
      {toasts.map(t => (
        <div key={t.id} role="alert"
          className={`animate-toast-in flex items-center gap-3 px-5 py-3 rounded-sm shadow-card text-sm min-w-56 max-w-xs pointer-events-auto
            ${t.type === "error" ? "bg-red-600 text-white" : "bg-luxury text-white"}`}>
          <span>{t.type === "error" ? "✕" : "✓"}</span>
          <span>{t.msg}</span>
        </div>
      ))}
    </div>
  );
}