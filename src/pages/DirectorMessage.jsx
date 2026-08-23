import Seo from "../components/Seo.jsx";
import PageBanner from "../components/PageBanner.jsx";
import site from "../config/site.js";

export default function DirectorMessage() {
	return (
		<>
			<Seo title="Director's Message" />
			<PageBanner title="Director's Message" />

			<div className="page-content" data-aos="fade-up">
				<section className="profile-section">
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
													src="https://res.cloudinary.com/djfy7fvq1/image/upload/f_auto,q_auto/v1/Scottish/pyjzphzv3grxcro45ag4"
													className="d-block w-100"
													alt="director profile picture"
												/>
												<h3>
													Mr. Narender Sindhu
													<small>Founder &amp; Director of {site.fullName}</small>
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
											As an educational institution, we strive to provide a nurturing and inspiring
											environment where every student can grow, learn, and flourish.
										</p>

										<p>
											At The Scotts, we believe in the power of education to transform lives. Our dedicated
											team of educators is committed to fostering academic excellence, promoting character
											development, and instilling a love for lifelong learning. We embrace innovative
											teaching methodologies and integrate technology to enhance the learning experience.
										</p>

										<p>
											Our school is not just a place of academic growth but also a vibrant community where
											students can explore their talents, interests, and passions. We offer a wide range
											of extracurricular activities, clubs, and sports programs that foster teamwork,
											leadership, and personal growth. These activities contribute to the holistic
											development of our students, equipping them with the skills and values necessary to
											thrive in an ever-changing world.
										</p>

										<p>
											We are committed to providing a safe and supportive environment for all students. We
											believe that every child deserves to feel safe and respected, and we have a
											zero-tolerance policy for bullying and harassment. We also have a strong commitment
											to diversity and inclusion.
										</p>

										<p>
											We believe in the importance of collaboration between parents, students, and staff.
											We encourage open lines of communication and value your involvement in your child's
											educational journey. Together, we can create a strong partnership that ensures the
											success and well-being of our students.
										</p>

										<p>
											I would like to express my gratitude to our dedicated faculty and staff, whose
											unwavering commitment to education and the well-being of our students sets us apart.
											Their passion, expertise, and tireless efforts contribute to creating an exceptional
											learning environment.
										</p>

										<p>
											I also extend my appreciation to our parents for entrusting us with the education of
											your children. Your support, involvement, and partnership are vital to the success
											of our students and our school as a whole.
										</p>

										<p>
											Together, let us embark on a journey of growth, discovery, and endless possibilities
											for our students.
										</p>

										<p>Best regards,</p>
										<img
											src="/assets/webp/SISTransparentLogo.webp"
											alt="Director signature"
											className="py-3"
											width="150px"
											height="170px"
										/>
										<p>
											Narender Sindhu <br />
											Director <br />
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
