// Central site configuration.
// Every value can be overridden with a VITE_* environment variable
// (set in .env locally, or in Netlify's environment variables UI).
const env = import.meta.env;

const site = {
	// Branding
	name: env.VITE_SCHOOL_NAME || "The Scotts International School",
	subtext: env.VITE_SCHOOL_SUBTEXT || "(Formerly Scottish)",
	fullName: env.VITE_SCHOOL_NAME_FULL || "The Scotts (Formerly Scottish) International School",
	tagline: env.VITE_SCHOOL_TAGLINE || "Be What You Want To Be...",
	city: env.VITE_SCHOOL_CITY || "Hisar",
	region: env.VITE_SCHOOL_REGION || "Haryana",
	country: env.VITE_SCHOOL_COUNTRY || "India",
	copyrightHolder: env.VITE_COPYRIGHT_HOLDER || "Scotts Global TecQ",
	logoUrl:
		env.VITE_LOGO_URL ||
		"https://res.cloudinary.com/djfy7fvq1/image/upload/f_auto,q_auto/v1/Scottish/hkoqggo9z6nyp29xior8",
	ogImageUrl:
		env.VITE_OG_IMAGE_URL ||
		"https://res.cloudinary.com/djfy7fvq1/image/upload/v1678905543/Scottish/IMG_6289_ingaog.jpg",

	// SEO
	siteUrl: env.VITE_SITE_URL || "https://thescotts.in",
	seoDescription:
		env.VITE_SEO_DESCRIPTION ||
		"The Scotts (Formerly Scottish) International School in Hisar offers world-class education with state-of-the-art facilities. Our CBSE curriculum focuses on holistic development through academics, sports, arts, and extracurricular activities.",
	seoKeywords:
		env.VITE_SEO_KEYWORDS ||
		"Scottish International School,The Scotts,The Scotts International School,International School Hisar,CBSE School Hisar,Best School Hisar",
	twitterHandle: env.VITE_TWITTER_HANDLE || "@ScottishIntl",

	// Contact
	contactEmail: env.VITE_CONTACT_EMAIL || "info@thescotts.in",
	phonePrimary: env.VITE_PHONE_PRIMARY || "+91 9315577788",
	phoneSecondary: env.VITE_PHONE_SECONDARY || "+91 93508 08762",
	branches: [
		{
			name: env.VITE_BRANCH1_NAME || "Sector 17",
			address:
				env.VITE_BRANCH1_ADDRESS ||
				"Civil Line Police Station Rd, Sector 17, Hisar, Haryana 125001, India",
			mapUrl: env.VITE_BRANCH1_MAP_URL || "https://g.co/kgs/V4uajv3",
			phone: env.VITE_PHONE_PRIMARY || "+91 9315577788",
		},
		{
			name: env.VITE_BRANCH2_NAME || "Sector 16-17",
			address:
				env.VITE_BRANCH2_ADDRESS ||
				"Near Aadhar hospital towards Delhi - South bye pass - Sector 16-17, Haryana 125001, India",
			mapUrl: env.VITE_BRANCH2_MAP_URL || "https://g.co/kgs/X6vPwU4",
			phone: env.VITE_PHONE_SECONDARY || "+91 93508 08762",
		},
	],

	// Socials
	facebookUrl: env.VITE_FACEBOOK_URL || "https://www.facebook.com/thescotts.hisar/",
	instagramUrl: env.VITE_INSTAGRAM_URL || "https://www.instagram.com/sishisar/",
	youtubeUrl: env.VITE_YOUTUBE_URL || "https://www.youtube.com/@scottishinternationalhisar",

	// Third-party
	recaptchaSiteKey: env.VITE_RECAPTCHA_SITE_KEY || "",
	posthogKey: env.VITE_POSTHOG_KEY || "",
	posthogHost: env.VITE_POSTHOG_HOST || "https://us.i.posthog.com",
};

export default site;
