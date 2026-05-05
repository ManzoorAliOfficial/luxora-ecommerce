import { Helmet } from "react-helmet-async";

export default function SEO({ title, description, keywords, image, url, type = "website", schema }) {
  const fullTitle = title ? `${title} | LUXORA` : "LUXORA — Premium Luxury Fashion";
  const siteUrl   = "https://luxora.com";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {keywords    && <meta name="keywords"    content={keywords} />}
      <link rel="canonical" href={`${siteUrl}${url || ""}`} />
      <meta property="og:type"        content={type} />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:url"         content={`${siteUrl}${url || ""}`} />
      <meta property="og:site_name"   content="LUXORA" />
      {description && <meta property="og:description" content={description} />}
      {image       && <meta property="og:image"       content={image} />}
      <meta name="twitter:card"  content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      {image       && <meta name="twitter:image"       content={image} />}
      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
    </Helmet>
  );
}