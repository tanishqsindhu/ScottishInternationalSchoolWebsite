import Seo from "../components/Seo.jsx";
import PageBanner from "../components/PageBanner.jsx";
import site from "../config/site.js";

export default function PrincipalMessage() {
	return (
		<>
			<Seo title="Principal's Message" />
			<PageBanner title="Principal's Message" />

			<div className="page-content">
				<section className="profile-section" data-aos="fade-up">
					<div className="container">
						<div className="row">
							<div className="col-md-4 col-12 order-md-2">
								<div className="profile-picture">
									<div
										id="carouselExampleSlidesOnly"
										className="carousel slide carousel-fade"
										data-bs-ride="carousel"
									>
										<div className="carousel-inner">
											<div className="carousel-item active">
												<img
													src="https://res.cloudinary.com/djfy7fvq1/image/upload/f_auto,q_auto/v1/Scottish/principal"
													className="d-block w-100"
													alt="Principal"
												/>
												<h3>
													Mrs. Mamta Sindhu
													<small>Founder &amp; Principal of {site.fullName}</small>
												</h3>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-md-8 col-12 order-md-1">
								<div className="profile-content">
									<div className="text">
										<p>Dear Parents,</p>
										<p>Greetings from {site.fullName}.</p>
										<p>Hope you and your loved ones are keeping well and looking after each other.</p>
										<p>
											I am thrilled to address you as the Principal of SIS family and share with you the
											incredible opportunities and experiences that await you within our educational
											community.
										</p>

										<p>
											At The Scotts, we are dedicated to providing a well-rounded education that nurtures
											the academic, social, and emotional growth of each and every student. We believe in
											fostering a culture of excellence, respect, and inclusivity, where every individual
											is valued and encouraged to reach their full potential.
										</p>

										<p>
											As Educators, our Students are our pride. Each effort they make, each hurdle they
											cross, each one of their achievements gives us immense joy. Just as we embrace their
											success, we support them when they stumble, as they most inevitably do. Schools are
											life simulated and our endeavour is to strengthen the character of our Students so
											that they are strong in mind, body and soul. Success and failure must affect them to
											the extent that they bring out the best in them.
										</p>

										<p>
											Let me assure you, that the only thing that will drive me will be the thought that
											my students deserve nothing but my best efforts. I will love them like my own, will
											counsel them like my own, will share their joys and sorrows and from time to time
											reprimand them like my own. In my endeavour, I seek your trust and support.
										</p>

										<p>Looking forward to an association of mutual trust and respect.</p>

										<p>Best regards,</p>
										<img
											src="/assets/webp/SISTransparentLogo.webp"
											alt="Principal signature"
											className="py-3"
											width="150px"
											height="170px"
										/>
										<p>
											Mamta Sindhu <br />
											Principal <br />
											{site.fullName}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>

			<link rel="stylesheet" href="/stylesheets/contact-us.css" />
			<link rel="stylesheet" href="/stylesheets/about-us.css" />
		</>
	);
}
