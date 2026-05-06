import { useState } from "react";

export default function Tabs({ tabs, defaultTab = 0, className = "" }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className={className}>
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`
              px-6 py-3 font-medium transition-all
              border-b-2 -mb-px
              ${activeTab === idx
                ? "border-gold text-gold"
                : "border-transparent text-gray-500 hover:text-gray-700"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="py-6">
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
}
