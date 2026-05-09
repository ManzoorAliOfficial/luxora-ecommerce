import { useStore } from "../../context/StoreContext";

/**
 * Props:
 *   open: boolean       — controls visibility
 *   onClose: fn         — called when modal should close
 */
export default function AddProductModal({ open, onClose }) {
  const { addToast } = useStore();

  if (!open) return null;

  const handleAdd = () => {
    addToast("Product added!");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-sm shadow-card max-w-md w-full p-6 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-sm tracking-widest uppercase font-medium">Add New Product</h3>
          <button onClick={onClose} className="btn-ghost">✕</button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="label">Product Name</label>
            <input placeholder="e.g. Luxury Handbag" className="input" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Price ($)</label>
              <input type="number" placeholder="149" className="input" />
            </div>
            <div>
              <label className="label">Old Price ($)</label>
              <input type="number" placeholder="189" className="input" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Category</label>
              <select className="input">
                {["Women", "Men", "Shoes", "Bags", "Accessories"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Badge</label>
              <select className="input">
                <option>None</option>
                <option>New</option>
                <option>Sale</option>
                <option>-20%</option>
              </select>
            </div>
          </div>

          <div>
            <label className="label">Image URL</label>
            <input placeholder="https://..." className="input" />
          </div>
        </div>

        <div className="flex gap-3 mt-5">
          <button className="btn-gold" onClick={handleAdd}>
            Add Product
          </button>
          <button className="btn-outline" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}