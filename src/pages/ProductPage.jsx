import { useEffect }     from "react";
import { useParams, Link } from "react-router-dom";
import SEO               from "../components/common/SEO";
import Breadcrumb        from "../components/common/Breadcrumb";
import ProductGallery    from "../components/product/ProductGallery";
import ProductInfo       from "../components/product/ProductInfo";
import ProductTabs       from "../components/product/ProductTabs";
import RelatedProducts   from "../components/product/RelatedProducts";
import RecentlyViewed    from "../components/product/RecentlyViewed";
import { PRODUCTS }      from "../data/products";
import { useStore }      from "../context/StoreContext";

export default function ProductPage() {
  const { id }               = useParams();
  const { addRecentlyViewed } = useStore();

  const product = PRODUCTS.find(p => p.id === Number(id));

  useEffect(() => {
    if (!product) return;
    addRecentlyViewed(product);
    window.scrollTo({ top: 0 });
  }, [id]);

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-24 gap-4">
      <p className="font-serif text-3xl">Product not found</p>
      <Link to="/shop" className="btn-gold">Back to Shop</Link>
    </div>
  );

  const schema = {
    "@context":    "https://schema.org",
    "@type":       "Product",
    "name":        product.name,
    "image":       product.images,
    "description": product.description,
    "sku":         `LX-${String(product.id).padStart(4, "0")}`,
    "brand":       { "@type": "Brand", "name": "LUXORA" },
    "offers": {
      "@type":           "Offer",
      "url":             `https://luxora.com/product/${product.id}`,
      "priceCurrency":   "USD",
      "price":           product.price,
      "availability":    "https://schema.org/InStock",
      "seller":          { "@type": "Organization", "name": "LUXORA" },
    },
    "aggregateRating": {
      "@type":       "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviews,
    },
  };

  return (
    <>
      <SEO
        title={product.seoTitle || product.name}
        description={product.seoDesc || product.description}
        keywords={`${product.name}, ${product.category}, luxury, LUXORA`}
        image={product.images[0]}
        url={`/product/${product.id}`}
        type="product"
        schema={schema}
      />

      <div className="pt-24 pb-16 px-4 sm:px-6 max-w-screen-xl mx-auto">
        <Breadcrumb items={[
          { label: "Home", to: "/" },
          { label: "Shop", to: "/shop" },
          { label: product.name },
        ]} />

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 mb-20">
          <ProductGallery product={product} />
          <ProductInfo    product={product} />
        </div>

        {/* Tabs */}
        <ProductTabs product={product} />

        {/* Related */}
        <RelatedProducts product={product} />

        {/* Recently Viewed */}
        <RecentlyViewed excludeId={product.id} />
      </div>
    </>
  );
}