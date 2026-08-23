import { Link } from "react-router-dom";
import site from "../config/site.js";

function FooterBottom() {
	return (
		<>
			<div className="nav-trigger NavTriggerBottom" style={{ marginBottom: "-100px" }}>
				<a href="#top" id="footer-button" className="triggerOpen">
					<span></span>
					<span></span>
					<span></span>
					<b>
						<i className="fa-solid fa-arrow-up"></i>
						<br />
						Menu
					</b>
				</a>
			</div>
			<link rel="stylesheet" href="/stylesheets/navbottom.css" />
		</>
	);
}

export default function Footer() {
	return (
		<>
			<section className="row" style={{ marginBottom: "160px" }}>
				<FooterBottom />
			</section>

			<footer className="brand-footer">
				<div className="container">
					<div
						className="row justify-content-center"
						style={{ color: "#b3b3b3", padding: "0 0 10px 0", borderBottom: "1px solid #a5a3a3" }}
					>
						<div className="col-lg-6 text-lg-start d-flex flex-column">
							<div className="row">
								<h3>Contact us</h3>
							</div>
							<div className="row justify-content-between">
								{site.branches.map((branch, i) => (
									<div key={branch.name} className={i === 0 ? "col-lg-5" : "col-lg-5 mt-2 mt-lg-0 me-lg-4"}>
										<ul className="list-unstyled">
											<li>
												<a target="_blank" rel="noopener noreferrer" href={branch.mapUrl}>
													{site.fullName} <br />
													{branch.address}
												</a>
											</li>
											<li>
												<a className="text-nowrap" href={`tel:${branch.phone.replace(/\s/g, "")}`}>
													<i className="fa-solid fa-phone fa-shake"></i> {branch.phone}
												</a>
											</li>
											<li>
												<a
													className="text-nowrap"
													style={{ overflowX: "hidden" }}
													href={`mailto:${site.contactEmail}`}
												>
													<i className="fa-regular fa-envelope fa-flip"></i> {site.contactEmail}
												</a>
											</li>
										</ul>
									</div>
								))}
							</div>
						</div>

						<div className="col text-lg-start d-flex flex-column footerList mt-2 mt-md-0">
							<h3>Quick Links</h3>
							<ul className="list-unstyled">
								<li>
									<Link to="/beyond-classroom">Beyond Classroom</Link>
								</li>
								<li>
									<Link to="/accomplishments/academics">Academic Accomplishments</Link>
								</li>
								<li>
									<Link to="/accomplishments/sports">Sports Accomplishments</Link>
								</li>
								<li>
									<Link to="/accomplishments/co-curricular">Co-Curricular Accomplishments</Link>
								</li>
								<li>
									<Link to="/news-events">News And Events</Link>
								</li>
							</ul>
						</div>
						<div className="col text-lg-start d-flex flex-column footerList mt-2 mt-md-0">
							<h3>Useful Links</h3>
							<ul className="list-unstyled">
								<li>
									<Link to="/about-us">About Us</Link>
								</li>
								<li>
									<Link to="/admission">Admissions</Link>
								</li>
								<li>
									<Link to="/academics">Academics</Link>
								</li>
								<li>
									<Link to="/jobs">Job openings</Link>
								</li>
								<li>
									<Link to="/magazine">Magazine</Link>
								</li>
								<li>
									<Link to="/gallery">Galleries</Link>
								</li>
								<li>
									<Link to="/mandatory-disclosure">Mandatory Disclosure</Link>
								</li>
								<li>
									<Link to="/terms-conditions">Terms & Conditions</Link>
								</li>
							</ul>
						</div>
						<div className="col text-lg-start d-flex flex-column align-items-center order-first align-items-lg-start order-lg-last">
							<div className="fw-bold d-flex align-items-center mb-2">
								<span className="bs-icon-sm bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center bs-icon me-2">
									<img src={site.logoUrl} alt="" width="50px" height="50px" />
								</span>
								<span style={{ fontSize: "20px" }}>{site.fullName}</span>
							</div>
							<p style={{ color: "#b3b3b3" }}>{site.tagline}</p>
						</div>
					</div>
					<div className="d-flex justify-content-between align-items-center pt-3">
						<p className="mb-0" style={{ color: "#b3b3b3" }}>
							Copyright © {new Date().getFullYear()} {site.copyrightHolder}
						</p>
						<ul className="list-inline mb-0">
							<li className="list-inline-item" style={{ color: "#b3b3b3" }}>
								<a
									href={site.facebookUrl}
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Visit Facebook Profile"
								>
									<i className="fa-brands fa-facebook"></i>
								</a>
							</li>
							<li className="list-inline-item" style={{ color: "#b3b3b3" }}>
								<a
									href={site.youtubeUrl}
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Visit Youtube Profile"
								>
									<i className="fa-brands fa-youtube"></i>
								</a>
							</li>
							<li className="list-inline-item" style={{ color: "#b3b3b3" }}>
								<a
									href={site.instagramUrl}
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Visit Instagram Profile"
								>
									<i className="fa-brands fa-instagram"></i>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</footer>
			<link rel="stylesheet" href="/stylesheets/footer.css" />
		</>
	);
}
