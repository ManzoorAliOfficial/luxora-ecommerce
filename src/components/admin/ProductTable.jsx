import Stars from "../../components/common/Stars";
import { PRODUCTS } from "../../data/products";
import { useStore } from "../../context/StoreContext";

export default function ProductTable({ onAddProduct }) {
  const { addToast } = useStore();

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Products</h2>
        <button onClick={onAddProduct} className="btn-gold py-2.5 px-5">
          + Add Product
        </button>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" aria-label="Products">
            <thead className="bg-ivory">
              <tr className="border-b border-champagne">
                {["Product", "Category", "Price", "Stock", "Rating", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="text-left py-3 px-4 text-xs tracking-widest uppercase text-muted font-medium"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PRODUCTS.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-champagne hover:bg-ivory/50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-sm overflow-hidden bg-ivory shrink-0">
                        <img src={p.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="font-medium text-xs">{p.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-muted text-xs">{p.category}</td>
                  <td className="py-3 px-4 font-medium">${p.price}</td>
                  <td className="py-3 px-4">
                    <span className="badge bg-green-100 text-green-700">In Stock</span>
                  </td>
                  <td className="py-3 px-4">
                    <Stars rating={p.rating} size={11} />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button className="text-xs text-gold hover:underline bg-transparent border-0 cursor-pointer font-sans">
                        Edit
                      </button>
                      <button
                        onClick={() => addToast("Product deleted")}
                        className="text-xs text-red-500 hover:underline bg-transparent border-0 cursor-pointer font-sans"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}