import { Link } from "react-router-dom";

export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center flex-wrap gap-2 text-xs text-muted"
          itemScope itemType="https://schema.org/BreadcrumbList">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2"
              itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            {i > 0 && <span aria-hidden="true" className="text-champagne">·</span>}
            {item.to
              ? <Link to={item.to} className="hover:text-gold transition-colors" itemProp="item">
                  <span itemProp="name">{item.label}</span>
                </Link>
              : <span className="text-gold font-medium" itemProp="name">{item.label}</span>
            }
            <meta itemProp="position" content={String(i + 1)} />
          </li>
        ))}
      </ol>
    </nav>
  );
}