import SEO          from "../components/common/SEO";
import Reveal       from "../components/common/Reveal";
import HeroBanner   from "../components/home/HeroBanner";
import CategoryGrid from "../components/home/CategoryGrid";
import BestSellers  from "../components/home/BestSellers";
import PromoBanner  from "../components/home/PromoBanner";
import NewArrivals  from "../components/home/NewArrivals";
import Testimonials from "../components/home/Testimonials";
import Newsletter   from "../components/home/Newsletter";
import TrustBadges from "../components/home/TrustBadges";
export default function HomePage() {
  return (
    <>
      <SEO
        title="Premium Luxury Fashion & Accessories"
        description="Shop LUXORA for premium luxury fashion, handbags, watches, shoes and accessories. Free shipping over $100. 30-day returns."
        keywords="luxury fashion, premium handbags, designer watches, luxury shoes"
        url="/"
      />

      <Reveal><HeroBanner /></Reveal>
      <Reveal delay={0.1}><CategoryGrid /></Reveal>
      <Reveal delay={0.2}><BestSellers /></Reveal>
      <Reveal delay={0.3}><PromoBanner /></Reveal>
      <Reveal delay={0.4}><NewArrivals /></Reveal>
      <Reveal delay={0.5}><Testimonials /></Reveal>
      <Reveal delay={0.6}><Newsletter /></Reveal>
      <Reveal delay={0.6}><TrustBadges /></Reveal>
      


    </>
  );
}