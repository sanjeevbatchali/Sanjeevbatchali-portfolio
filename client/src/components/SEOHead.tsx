import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://www.sanjeevbatchali.in';
const DEFAULT_IMAGE = `${SITE_URL}/profile.jpg`;
const SITE_NAME = 'Sanjeev Batchali';

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  structuredData?: object | object[];
}

export default function SEOHead({
  title,
  description,
  path = '/',
  ogType = 'website',
  ogImage = DEFAULT_IMAGE,
  structuredData,
}: SEOHeadProps) {
  const canonicalUrl = `${SITE_URL}${path}`;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  const jsonLdArray = structuredData
    ? Array.isArray(structuredData)
      ? structuredData
      : [structuredData]
    : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLdArray.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
