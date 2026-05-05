import { Link }            from "react-router-dom";
import { CATEGORIES_DATA } from "../../data/categories";

export default function CategoryGrid() {
  return (
    <section className="py-20 px-4 sm:px-6 max-w-screen-xl mx-auto" aria-label="Shop by category">
      <div className="text-center mb-12">
        <p className="section-label">Browse By</p>
        <h2 className="section-title">Shop By Category</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {CATEGORIES_DATA.map(cat => (
          <Link key={cat.name} to={`/shop?category=${cat.name}`}
                className="group text-center" aria-label={`Shop ${cat.name}`}>
            <div className="relative rounded-sm overflow-hidden mb-3 bg-ivory" style={{ aspectRatio: "1" }}>
              <img src={cat.image} alt={cat.name}
                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                   loading="lazy" width="200" height="200" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
            </div>
            <p className="text-sm font-medium tracking-wide text-luxury group-hover:text-gold transition-colors">{cat.name}</p>
            <p className="text-xs text-muted">{cat.count} items</p>
          </Link>
        ))}
      </div>
    </section>
  );
}