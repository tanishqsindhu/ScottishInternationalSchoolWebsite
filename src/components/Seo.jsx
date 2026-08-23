import { useLocation } from "react-router-dom";
import site from "../config/site.js";

// React 19 hoists <title>/<meta>/<link> rendered in components into <head>.
export default function Seo({ title, description }) {
	const { pathname } = useLocation();
	const pageTitle = title
		? `${title} | ${site.fullName}`
		: `${site.fullName} | Best International School in ${site.city}`;
	const desc = description || site.seoDescription;
	const url = `${site.siteUrl}${pathname === "/" ? "" : pathname}`;

	return (
		<>
			<title>{pageTitle}</title>
			<meta name="description" content={desc} />
			<meta name="keywords" content={site.seoKeywords} />
			<meta name="author" content={site.fullName} />
			<link rel="canonical" href={url} />

			<meta property="og:site_name" content={site.fullName} />
			<meta property="og:title" content={pageTitle} />
			<meta property="og:description" content={desc} />
			<meta property="og:type" content="website" />
			<meta property="og:url" content={url} />
			<meta property="og:image" content={site.ogImageUrl} />
			<meta property="og:image:width" content="1200" />
			<meta property="og:image:height" content="630" />
			<meta property="og:locale" content="en_IN" />

			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:site" content={site.twitterHandle} />
			<meta name="twitter:title" content={pageTitle} />
			<meta name="twitter:description" content={desc} />
			<meta name="twitter:image" content={site.ogImageUrl} />

			<script type="application/ld+json">
				{JSON.stringify({
					"@context": "https://schema.org",
					"@type": "EducationalOrganization",
					name: site.fullName,
					url: site.siteUrl,
					logo: site.ogImageUrl,
					description: site.seoDescription,
					address: {
						"@type": "PostalAddress",
						addressLocality: site.city,
						addressRegion: site.region,
						addressCountry: site.country,
					},
					telephone: site.phonePrimary.replace(/\s/g, "-"),
					email: site.contactEmail,
				})}
			</script>
		</>
	);
}
