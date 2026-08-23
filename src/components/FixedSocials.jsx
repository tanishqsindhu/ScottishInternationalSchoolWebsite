import site from "../config/site.js";

export default function FixedSocials() {
	return (
		<>
			<div className="fixed-social-container">
				<a
					className="fixedSocial fixedSocial-youtube"
					target="_blank"
					rel="noopener noreferrer"
					href={site.youtubeUrl}
					aria-label="Visit Youtube Channel"
				>
					<i className="fa-brands fa-youtube fa-fade"></i>
				</a>
				<a
					className="fixedSocial fixedSocial-instagram"
					target="_blank"
					rel="noopener noreferrer"
					href={site.instagramUrl}
					aria-label="Visit Instagram Profile"
				>
					<i className="fa-brands fa-instagram fa-fade"></i>
				</a>
				<a
					className="fixedSocial fixedSocial-facebook"
					target="_blank"
					rel="noopener noreferrer"
					href={site.facebookUrl}
					aria-label="Visit Facebook Profile"
				>
					<i className="fa-brands fa-facebook-f fa-fade"></i>
				</a>
			</div>
			<link rel="stylesheet" href="/stylesheets/fixedSocial.css" />
		</>
	);
}
