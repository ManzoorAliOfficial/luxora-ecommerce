export default function ColorSelector({ colors = [], selected, onChange }) {
  if (!colors || colors.length === 0) return null;

  return (
    <div className="mb-5">
      <p className="label">Color</p>
      <div className="flex gap-2 mt-2">
        {colors.map(c => (
          <button
            key={c}
            onClick={() => onChange(c)}
            aria-label={`Color ${c}`}
            aria-pressed={selected === c}
            className="w-8 h-8 rounded-full transition-all cursor-pointer border-0 shrink-0"
            style={{
              background:    c,
              outline:       `2px solid ${selected === c ? "#C9A84C" : "#EDE8E0"}`,
              outlineOffset: "2px",
            }}
          />
        ))}
      </div>
    </div>
  );
}