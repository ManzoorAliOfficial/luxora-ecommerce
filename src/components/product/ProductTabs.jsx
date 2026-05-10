import { useState } from "react";
import ReviewList from "./ReviewList";

export default function ProductTabs({ product }) {
  const [tab, setTab] = useState("description");

  const TABS = [
    { id: "description", label: "Description" },
    { id: "additional",  label: "Additional Info" },
    { id: "reviews",     label: `Reviews (${product.reviews})` },
  ];

  const SPEC_ROWS = [
    ["SKU",      `LX-${String(product.id).padStart(4, "0")}`],
    ["Category", product.category],
    ["Stock",    `${product.stock} available`],
    ["Weight",   "0.5 kg"],
    ["Shipping", "Free over $100"],
    ["Returns",  "30 days"],
  ];

  return (
    <div className="mb-20">
      {/* Tab bar */}
      <div className="flex border-b border-champagne mb-8 overflow-x-auto">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            role="tab"
            aria-selected={tab === t.id}
            className={`tab whitespace-nowrap ${tab === t.id ? "active" : ""}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab panels */}
      <div role="tabpanel">
        {tab === "description" && (
          <div className="max-w-2xl">
            <p className="text-sm text-muted leading-relaxed mb-4">{product.description}</p>
            <p className="text-sm text-muted leading-relaxed">
              Every piece in our collection is thoughtfully designed using only the finest materials
              sourced from trusted suppliers around the world.
            </p>
          </div>
        )}

        {tab === "additional" && (
          <div className="max-w-md">
            <table className="w-full text-sm" aria-label="Product specifications">
              <tbody>
                {SPEC_ROWS.map(([k, v]) => (
                  <tr key={k} className="border-b border-champagne">
                    <td className="py-3 pr-6 font-medium text-luxury w-36">{k}</td>
                    <td className="py-3 text-muted">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "reviews" && (
          <ReviewList rating={product.rating} reviews={product.reviews} />
        )}
      </div>
    </div>
  );
}