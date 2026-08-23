import Seo from "../components/Seo.jsx";
import PageBanner from "../components/PageBanner.jsx";
import site from "../config/site.js";

export default function AboutUs() {
	return (
		<>
			<Seo title="About Us" />
			<PageBanner title="Our History" />
			<div className="page-content">
				<section className="profile-section">
					<div className="container">
						<div className="row">
							<div className="col-md-4 col-12 order-md-2 mb-4">
								<div className="profile-picture">
									<div
										id="carouselExampleSlidesOnly"
										className="carousel slide carousel-fade"
										data-bs-ride="carousel"
										data-bs-pause="false"
									>
										<div className="carousel-inner">
											<div className="carousel-item active" data-bs-interval="3000">
												<img
													src="https://res.cloudinary.com/djfy7fvq1/image/upload/f_auto,q_auto/v1/Scottish/principal"
													className="d-block w-100"
													alt="School Building"
												/>
												<h3 className="mb-0">
													Mrs. Mamta Sindhu <small>Founder of {site.fullName}</small>
												</h3>
											</div>
											<div className="carousel-item" data-bs-interval="3000">
												<img
													src="https://res.cloudinary.com/djfy7fvq1/image/upload/f_auto,q_auto/v1/Scottish/pyjzphzv3grxcro45ag4"
													className="d-block w-100"
													alt="School Building"
												/>
												<h3 className="mb-0">
													Mr. Narender Sindhu <small>Founder of {site.fullName}</small>
												</h3>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-md-8 col-12 order-md-1" data-aos="fade-up">
								<div className="profile-content">
									<div className="text">
										<p>
											<strong>{site.fullName}</strong> was founded with a vision of providing a
											nurturing and enriching educational experience. The journey began when a
											parent couple, in search of the perfect nursery school for their child,
											realized that none met their expectations for a warm, caring, and
											stimulating learning environment. Driven by their passion for quality
											education, they established <strong>Kidz World</strong> in Jawahar Nagar—a
											play school where affection, creativity, and curiosity were at the heart of
											learning.
										</p>

										<p>
											As the years passed, <strong>Kidz World</strong> flourished, expanding into
											multiple branches with a strong focus on{" "}
											<strong>innovative teaching methods, creative learning, and calligraphy</strong>
											. Encouraging a child’s natural curiosity became the foundation of their
											approach, making learning an exciting journey rather than a routine task.
											With a growing reputation for excellence, the school evolved into{" "}
											<strong>{site.fullName}</strong> at its{" "}
											<strong>Sector 16 & 17 campuses</strong>, catering to primary and secondary
											students.
										</p>

										<p>
											Recognizing the need for <strong>advanced academic coaching</strong>, the
											founders later established a{" "}
											<strong>Senior Secondary Campus at South Bypass</strong>, offering
											specialized guidance for students preparing for <strong>NEET and JEE</strong>
											. With a team of experienced faculty, including{" "}
											<strong>IITians and doctors</strong>, the school provides top-tier coaching
											to help students achieve success in competitive exams while maintaining a
											balanced and holistic learning experience.
										</p>

										<p>
											At <strong>{site.fullName}</strong>, we strongly believe in a{" "}
											<strong>Parent-Management Partnership</strong>, where parents play an active
											role in shaping the school environment. We welcome feedback, ideas, and
											collaborative efforts to continuously enhance the learning experience. Our
											curriculum is designed to be{" "}
											<strong>research-driven, project-based, and student-centered</strong>,
											integrating{" "}
											<strong>academics, sports, extracurricular activities, and hobbies</strong>{" "}
											to create a well-rounded education.
										</p>

										<p>
											More than just a school, <strong>{site.fullName}</strong> is a thriving
											community where students are inspired to dream, explore, and achieve their
											fullest potential.
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
