import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import Recaptcha from "../components/Recaptcha.jsx";
import { api } from "../lib/api.js";
import { useFlash } from "../context/FlashContext.jsx";
import site from "../config/site.js";

const NO_IMAGE_URL =
	"https://res.cloudinary.com/dlpq5gl1a/image/upload/w_500/q_auto/f_auto/v1688312952/No_image_Found_ioxitj.png";

export default function Home() {
	const { flash } = useFlash();
	const [news, setNews] = useState([]);
	const [parentTestimonial, setParentTestimonial] = useState([]);

	// Contact form state
	const [contact, setContact] = useState({
		name: "",
		email: "",
		phone: "",
		branch: "",
		message: "",
	});
	const contactRecaptchaRef = useRef(null);

	// Newsletter form state
	const [newsletterEmail, setNewsletterEmail] = useState("");
	const newsletterRecaptchaRef = useRef(null);

	// Infinite testimonial carousel refs (replaces public/javascripts/infinty-carousel.js)
	const carouselRef = useRef(null);

	useEffect(() => {
		let cancelled = false;
		api
			.get("/home-data")
			.then((data) => {
				if (cancelled) return;
				setNews(data.news || []);
				setParentTestimonial(data.parentTestimonial || []);
			})
			.catch(() => {
				/* leave data sections empty */
			});
		return () => {
			cancelled = true;
		};
	}, []);

	// Re-implementation of infinty-carousel.js behaviour
	useEffect(() => {
		const carousel = carouselRef.current;
		if (!carousel || !parentTestimonial.length) return;

		let index = 0;

		function getVisibleCount() {
			if (window.innerWidth < 600) return 1; // Mobile
			if (window.innerWidth < 900) return 2; // Tablet
			if (window.innerWidth > 1500) return 6; // Extra Wide Display
			return 4; // Desktop default
		}

		let visibleCount = getVisibleCount();

		function checkAndCloneSlides() {
			const slides = carousel.querySelectorAll(".slide1");
			// Clone when the user is about to reach the last few slides
			if (index >= slides.length - visibleCount) {
				slides.forEach((slide) => {
					carousel.appendChild(slide.cloneNode(true));
				});
			}
		}

		function updateCarousel() {
			const slideWidth = 100 / visibleCount;
			const shift = -(index * slideWidth);
			carousel.style.transition = "transform 0.5s ease-in-out";
			carousel.style.transform = `translateX(${shift}%)`;
			checkAndCloneSlides();
		}

		function nextSlide() {
			index++;
			updateCarousel();
		}

		function prevSlide() {
			if (index > 0) {
				index--;
				updateCarousel();
			} else {
				index = carousel.querySelectorAll(".slide1").length - visibleCount; // Jump to end
				carousel.style.transition = "none";
				carousel.style.transform = `translateX(-${index * (100 / visibleCount)}%)`;
				setTimeout(() => {
					carousel.style.transition = "transform 0.5s ease-in-out";
					prevSlide();
				}, 50);
			}
		}

		// Adjust slide width dynamically
		function adjustSlides() {
			visibleCount = getVisibleCount();
			index = 0; // Reset index on resize
			carousel.querySelectorAll(".slide1").forEach((slide) => {
				slide.style.flex = `0 0 ${100 / visibleCount}%`;
			});
			checkAndCloneSlides();
		}

		const nextBtn = document.getElementById("next");
		const prevBtn = document.getElementById("prev");
		nextBtn?.addEventListener("click", nextSlide);
		prevBtn?.addEventListener("click", prevSlide);
		window.addEventListener("resize", adjustSlides);

		// Auto-slide every 3 seconds
		const intervalId = setInterval(nextSlide, 3000);

		// Initial setup
		adjustSlides();

		return () => {
			clearInterval(intervalId);
			nextBtn?.removeEventListener("click", nextSlide);
			prevBtn?.removeEventListener("click", prevSlide);
			window.removeEventListener("resize", adjustSlides);
			// Remove cloned slides so React's DOM stays consistent
			const slides = carousel.querySelectorAll(".slide1");
			slides.forEach((slide, i) => {
				if (i >= parentTestimonial.length) slide.remove();
			});
			carousel.style.transition = "";
			carousel.style.transform = "";
		};
	}, [parentTestimonial]);

	async function handleContactSubmit(e) {
		e.preventDefault();
		if (!e.target.checkValidity()) {
			e.target.classList.add("was-validated");
			return;
		}
		try {
			const recaptcha = contactRecaptchaRef.current?.getResponse();
			const res = await api.post("/contact", { user: { ...contact }, recaptcha });
			flash("success", res.message);
			setContact({ name: "", email: "", phone: "", branch: "", message: "" });
			e.target.classList.remove("was-validated");
			contactRecaptchaRef.current?.reset();
		} catch (err) {
			flash("error", err.message);
		}
	}

	async function handleNewsletterSubmit(e) {
		e.preventDefault();
		if (!e.target.checkValidity()) {
			e.target.classList.add("was-validated");
			return;
		}
		try {
			const recaptcha = newsletterRecaptchaRef.current?.getResponse();
			const res = await api.post("/newsletter", {
				email: newsletterEmail,
				action: "subscribe",
				recaptcha,
			});
			flash("success", res.message);
			setNewsletterEmail("");
			e.target.classList.remove("was-validated");
			newsletterRecaptchaRef.current?.reset();
		} catch (err) {
			flash("error", err.message);
		}
	}

	return (
		<>
			<Seo />
			<section id="top" className="row">
				<div
					id="carouselExampleSlidesOnly"
					className="carousel slide carousel-fade"
					data-bs-ride="carousel"
					data-bs-pause="false"
				>
					<div className="carousel-inner">
						<div className="carousel-item active" data-bs-interval="3000">
							<img
								src="https://res.cloudinary.com/djfy7fvq1/image/upload/w_1500/q_auto/f_auto/v1741596937/naqc1fiijnhbap3jmyr8"
								srcSet="
                        https://res.cloudinary.com/djfy7fvq1/image/upload/w_400/q_auto/f_auto/v1741596937/naqc1fiijnhbap3jmyr8 400w,
                        https://res.cloudinary.com/djfy7fvq1/image/upload/w_600/q_auto/f_auto/v1741596937/naqc1fiijnhbap3jmyr8 600w,
                        https://res.cloudinary.com/djfy7fvq1/image/upload/w_1500/q_auto/f_auto/v1741596937/naqc1fiijnhbap3jmyr8 1000w,
                        https://res.cloudinary.com/djfy7fvq1/image/upload/w_1500/q_auto/f_auto/v1741596937/naqc1fiijnhbap3jmyr8 1500w
                      "
								sizes="(max-width: 600px) 100vw, 
                      (max-width: 1000px) 80vw, 
                      50vw"
								className="d-block w-100"
								alt="school building"
								style={{ height: "700px" }}
							/>
							<div
								className="carousel-caption d-md-block rounded"
								style={{ backgroundColor: "rgb(66, 39, 26,0.4)" }}
							>
								<h5 style={{ color: "#f0bc1b" }}>{site.fullName} - South Bypass Campus</h5>
								<p style={{ color: "#f0bc1b" }}>
									Welcome to our school building, a place where learning thrives and futures are
									shaped! Our school is designed to provide a safe, engaging, and inspiring
									environment for students to grow academically, socially, and personally.
								</p>
							</div>
						</div>
						<div className="carousel-item" data-bs-interval="3000">
							<img
								src="https://res.cloudinary.com/djfy7fvq1/image/upload/w_1500/f_auto,q_auto/v1/Scottish/me8akbjwzvyuzno4e6zf"
								srcSet="
                        https://res.cloudinary.com/djfy7fvq1/image/upload/w_500/q_auto/f_auto/v1/Scottish/me8akbjwzvyuzno4e6zf 500w,
                        https://res.cloudinary.com/djfy7fvq1/image/upload/w_600/q_auto/f_auto/v1/Scottish/me8akbjwzvyuzno4e6zf 600w,
                        https://res.cloudinary.com/djfy7fvq1/image/upload/w_1500/q_auto/f_auto/v1/Scottish/me8akbjwzvyuzno4e6zf 1000w,
                        https://res.cloudinary.com/djfy7fvq1/image/upload/w_1500/q_auto/f_auto/v1/Scottish/me8akbjwzvyuzno4e6zf 1500w
                      "
								sizes="(max-width: 600px) 100vw, 
                      (max-width: 1000px) 80vw, 
                      50vw"
								className="d-block w-100"
								alt="school building"
								style={{ height: "700px" }}
							/>
							<div
								className="carousel-caption d-md-block rounded"
								style={{ backgroundColor: "rgb(66, 39, 26,0.4)" }}
							>
								<h5 style={{ color: "#f0bc1b" }}>{site.fullName} - Sector 16 & 17 Campus</h5>
								<p style={{ color: "#f0bc1b" }}>
									Welcome to our school building, a place where learning thrives and futures are
									shaped! Our school is designed to provide a safe, engaging, and inspiring
									environment for students to grow academically, socially, and personally.
								</p>
							</div>
						</div>
						<div className="carousel-item" data-bs-interval="3000">
							<img
								src="https://res.cloudinary.com/djfy7fvq1/image/upload/w_1500/f_auto,q_auto/v1/Scottish/erxnxgk83yd2v55opyso"
								srcSet="
                        https://res.cloudinary.com/djfy7fvq1/image/upload/w_400/q_auto/f_auto/v1/Scottish/erxnxgk83yd2v55opyso 400w,
                        https://res.cloudinary.com/djfy7fvq1/image/upload/w_600/q_auto/f_auto/v1/Scottish/erxnxgk83yd2v55opyso 600w,
                        https://res.cloudinary.com/djfy7fvq1/image/upload//w_1500/q_auto/f_auto/v1/Scottish/erxnxgk83yd2v55opyso 1000w,
                        https://res.cloudinary.com/djfy7fvq1/image/upload/w_1500/q_auto/f_auto/v1/Scottish/erxnxgk83yd2v55opyso 1500w
                      "
								sizes="(max-width: 600px) 100vw, 
                      (max-width: 1000px) 80vw, 
                      50vw"
								className="d-block w-100"
								alt="school library"
								style={{ height: "700px" }}
							/>
							<div
								className="carousel-caption d-md-block rounded"
								style={{ backgroundColor: "rgb(66, 39, 26,0.4)" }}
							>
								<h5 style={{ color: "#f0bc1b" }}>School's Library</h5>
								<p style={{ color: "#f0bc1b" }}>
									Welcome to our student-focused library, where knowledge meets opportunity!Our
									library boasts a vast collection of academic materials, carefully curated to align
									with the curriculum of local schools, colleges, and universities. From textbooks
									and reference books to scholarly journals and research papers, we have everything
									you need to enhance your learning experience.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="home-entry bg1" data-aos="fade-up">
				<div className=" container text-center">
					<div id="welcomeMessage">
						<div className="main-title">
							<h2>{site.fullName}</h2>
						</div>
						<p>
							Welcome to the School of Possibilities, where our motto is "{site.tagline}" We
							celebrate individuality, creativity, and personal aspirations while fostering academic
							excellence. Our dedicated faculty and diverse programs help students unlock their
							talents and excel in their chosen endeavors. With a dynamic curriculum and specialized
							courses in sciences, technology, arts, and humanities, we provide a well-rounded
							education that encourages exploration. Real-world connections, hands-on experiences
							allow students to apply their knowledge. We promote respect, collaboration, and
							inclusivity, fostering personal growth, lifelong friendships, and academic success.
							Join us at the {site.name}, where dreams take flight and every student becomes their
							best self.
						</p>
					</div>
				</div>
			</section>
			<div className="home-gallery-items bg1" data-aos="fade-up">
				<div className="container">
					<div className="row mb-5 ">
						<div className="col mb-5 d-flex justify-content-center">
							<div className="rectangle">
								<div className="circle">
									<Link to="/magazine" aria-label="School's history">
										<figure className="d-flex justify-content-center">
											<img
												src="/assets/webp/auditorium.webp"
												alt="ACADEMICS"
												width="300px"
												height="300px"
											/>
										</figure>
									</Link>
								</div>
								<div className="item-part-detail text-center">
									<h3>My Home</h3>
									<hr />
									<Link
										to="/magazine"
										data-aos="fade-up"
										className=" btn mt-2"
										id="btn"
										aria-label="School's history"
										style={{
											color: "#980606",
											borderRadius: 0,
											borderColor: "#980606",
											transition: "all 1s ease-in-out",
										}}
									>
										Explore
									</Link>
								</div>
							</div>
						</div>
						<div className="col mb-5 d-flex justify-content-center">
							<div className="rectangle-inverted">
								<div className="circle-inverted">
									<Link to="/beyond-classroom/sports" aria-label="about sports at school">
										<figure className="d-flex justify-content-center">
											<img
												src="/assets/webp/girlsrace.webp"
												alt="ACADEMICS"
												width="300px"
												height="300px"
											/>
										</figure>
									</Link>
								</div>
								<div className="item-part-detail text-center">
									<h3>Sweating It Out</h3>
									<hr />
									<Link
										to="/beyond-classroom/sports"
										id="inverted-btn"
										className="btn mt-2"
										data-aos="fade-up"
										aria-label="about sports at school"
										style={{
											color: "white",
											borderRadius: 0,
											borderColor: "white",
											transition: "all 1s ease-in-out",
										}}
									>
										Explore
									</Link>
								</div>
							</div>
						</div>
						<div className="col mb-5 d-flex justify-content-center">
							<div className="rectangle">
								<div className="circle">
									<Link to="/news-events/67c54d5de076cb17b2d5793b" aria-label="new branch artitcle">
										<figure className="d-flex justify-content-center">
											<img
												src="/assets/webp/scottishBuilding.webp"
												alt="ACADEMICS"
												width="300px"
												height="300px"
											/>
										</figure>
									</Link>
								</div>
								<div className="item-part-detail text-center">
									<h3>Branching Out</h3>
									<hr />
									<Link
										to="/news-events/67c54d5de076cb17b2d5793b"
										className="btn mt-2"
										id="btn"
										data-aos="fade-up"
										aria-label="new branch artitcle"
										style={{
											color: "#980606",
											borderRadius: 0,
											borderColor: "#980606",
											transition: "all 1s ease-in-out",
										}}
									>
										Explore
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<section data-aos="fade-up" className="newsAndEvents container mt-5">
				<div className="row">
					<h2 className="text-center text-uppercase" style={{ color: "#2f3091" }}>
						News & Events
					</h2>
					<div
						className="section-title wow fadeInUp"
						style={{ visibility: "visible", animationName: "fadeInUp" }}
					>
						<p className="title-branding mb-2">
							<img className="img-fluid" alt="logo" src={site.logoUrl} width="49" height="49" />
						</p>
					</div>
				</div>
				<div className="row">
					<div className="containernews">
						<div className="carouselNews">
							{news.slice(0, 9).map((item) => (
								<article
									key={item._id}
									className="carousel__face text-center"
									style={{
										backgroundImage: `url(${item.images.length ? item.images[0].url : NO_IMAGE_URL})`,
									}}
								>
									<Link
										to={`/news-events/${item._id}`}
										style={{ textDecoration: "none", color: "#eabd57" }}
									>
										<h3 className="fs-3">{item.title}</h3>
										<p className="text-break" style={{ color: "#eabd57" }}>
											{item.shortDescription || item.secondaryTitle || ""}
										</p>
									</Link>
								</article>
							))}
						</div>
					</div>
				</div>
				<div
					className="service-single pt-3 pt-md-4 text-left"
					style={{ backgroundColor: "transparent" }}
				>
					<figcaption className="Gallery" style={{ paddingTop: 0 }}>
						<div className="readMore">
							<Link to="/news-events" title="Read More">
								<span>Load More</span>
							</Link>
						</div>
					</figcaption>
				</div>
			</section>
			<section className="messages">
				<div className="container" data-aos="fade-up">
					<div className="row mt-5 mb-5">
						<div className="col-xl-4 col-lg-4 col-md-6 col-12 mb-3">
							<div className="service-single">
								<Link to="/director-message" aria-label="read director's message">
									<figure>
										<img
											className="img-fluid w-100"
											src="https://res.cloudinary.com/djfy7fvq1/image/upload/f_auto,q_auto/v1/Scottish/pyjzphzv3grxcro45ag4"
											alt="director image"
										/>
									</figure>
									<figcaption className="">
										<h3>
											<small>OUR DIRECTOR</small> <br />
											MR. NARENDER SINGH SINDHU
										</h3>
										<div className="readMore" data-aos="fade-up">
											<Link
												to="/director-message"
												title="Read More"
												aria-label="read director's message"
											>
												<span>Read More</span>
											</Link>
										</div>
									</figcaption>
								</Link>
							</div>
						</div>
						<div className="col-xl-4 col-lg-4 col-md-6 col-12 mb-3">
							<div className="service-single pt-3 pt-md-4 text-left">
								<div>
									<div
										className="section-title"
										style={{ visibility: "visible" }}
										data-aos="fade-up"
									>
										<p className="title-branding mb-2">
											<img
												className="img-fluid"
												src={site.logoUrl}
												width="49px"
												height="49px"
												alt="logo"
											/>
										</p>
										<h2 className="p-color">
											<small>Gallery</small>
										</h2>
									</div>
									<figcaption className="Gallery" style={{ paddingTop: "0px" }}>
										<div className="box20">
											<Link to="/gallery" aria-label="visit Gallery">
												<img
													className="img-fluid w-100"
													src="assets/webp/saveEarth.webp"
													alt="save earth image"
												/>
												<div className="content_visible">
													<div className="imgtext">
														<h3 className="title">
															<i className="fa-solid fa-earth-asia fa-spin"></i> Our Priority to
															Save
														</h3>
														{/*<span class="post"><i class="las la-photo-video"></i>34</span>*/}
													</div>
													<div className="box-content">
														<h3 className="title">
															<Link to="/gallery" aria-label="visit Gallery">
																{" "}
																<i className="fa-solid fa-earth-asia fa-spin"></i> Our Priority to
																Save
															</Link>
														</h3>
														{/*<span class="post"><i class="las la-photo-video"></i> 34</span>*/}
													</div>
													<ul className="icon">
														<li>
															<Link to="/gallery" title="View all Images" aria-label="visit Gallery">
																<i className="fa-solid fa-arrow-right"></i>
															</Link>
														</li>
													</ul>
												</div>
											</Link>
										</div>
										<div className="readMore" data-aos="fade-up">
											<Link to="/gallery" title="Read More" aria-label="visit Gallery">
												<span>All Galleries</span>
											</Link>
										</div>
									</figcaption>
								</div>
							</div>
						</div>
						<div className="col-xl-4 col-lg-4 col-md-6 col-12 mb-3">
							<div className="service-single">
								<Link to="/principal-message" title="Read More" aria-label="Principal Message">
									<figure>
										<img
											className="img-fluid w-100"
											src="https://res.cloudinary.com/djfy7fvq1/image/upload/f_auto,q_auto/v1/Scottish/principal"
											alt=""
										/>
									</figure>
									<figcaption className="">
										<h3>
											<small>OUR PRINCIPAL</small> <br />
											MRS. MAMTA SINGH SINDHU
										</h3>
										<div className="readMore" data-aos="fade-up">
											<Link to="/principal-message" title="Read More" aria-label="Principal Message">
												<span>Read More</span>
											</Link>
										</div>
									</figcaption>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* School Magazine Section */}
			<section className="magazine-showcase py-5" data-aos="fade-up">
				<div className="container">
					<div className="row">
						<div className="section-title text-center" data-aos="fade-up">
							<p className="title-branding mb-2">
								<img className="img-fluid" src={site.logoUrl} width="49" height="49" alt="logo" />
							</p>
							<h2 className="p-color text-uppercase" style={{ color: "#2f3091" }}>
								School Magazine
							</h2>
						</div>
					</div>
					<div className="row align-items-center justify-content-center mt-4">
						<div className="col-lg-5 col-md-6 mb-4 mb-md-0" data-aos="fade-right">
							<div className="magazine-book-wrapper">
								<div className="magazine-book">
									<div className="magazine-cover">
										<div className="magazine-spine"></div>
										<div className="magazine-front">
											<div className="magazine-content-preview">
												<img src={site.logoUrl} alt="School Logo" className="magazine-logo" />
												<h3>{site.fullName}</h3>
												<p className="magazine-subtitle">Annual Magazine</p>
												<div className="magazine-decoration">
													<i className="fa-solid fa-book-open"></i>
												</div>
											</div>
										</div>
									</div>
									<div className="magazine-shadow"></div>
								</div>
							</div>
						</div>
						<div className="col-lg-5 col-md-6" data-aos="fade-left">
							<div className="magazine-info">
								<h3 className="magazine-title">Explore Our Journey</h3>
								<p className="magazine-description">
									Dive into the vibrant pages of our school magazine featuring student achievements,
									creative expressions, memorable events, and inspiring stories from our{" "}
									{site.name} family.
								</p>
								<ul className="magazine-highlights">
									<li>
										<i className="fa-solid fa-star"></i> Student Achievements & Awards
									</li>
									<li>
										<i className="fa-solid fa-palette"></i> Creative Artwork & Stories
									</li>
									<li>
										<i className="fa-solid fa-camera"></i> Event Highlights & Memories
									</li>
									<li>
										<i className="fa-solid fa-graduation-cap"></i> Academic Excellence
									</li>
								</ul>
								<div className="magazine-actions">
									<Link to="/magazine" className="btn btn-magazine-view">
										<i className="fa-solid fa-eye me-2"></i> View Magazine
									</Link>
									<a
										href="/assets/pdf/Scottish International SchoolMagazine.pdf"
										download={`${site.name}-Magazine.pdf`}
										className="btn btn-magazine-download"
									>
										<i className="fa-solid fa-download me-2"></i> Download
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<style>{`
.magazine-showcase {
	background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
	position: relative;
	overflow: hidden;
}

.magazine-showcase::before {
	content: '';
	position: absolute;
	top: -50%;
	right: -20%;
	width: 60%;
	height: 200%;
	background: radial-gradient(circle, rgba(234, 189, 87, 0.1) 0%, transparent 70%);
	pointer-events: none;
}

.magazine-book-wrapper {
	display: flex;
	justify-content: center;
	perspective: 1000px;
}

.magazine-book {
	position: relative;
	transform-style: preserve-3d;
	transition: transform 0.5s ease;
}

.magazine-book:hover {
	transform: rotateY(-15deg);
}

.magazine-cover {
	position: relative;
	width: 280px;
	height: 380px;
	transform-style: preserve-3d;
}

.magazine-front {
	position: absolute;
	width: 100%;
	height: 100%;
	background: linear-gradient(145deg, #1a365d 0%, #2d4a7c 50%, #1a365d 100%);
	border-radius: 0 12px 12px 0;
	box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
}

.magazine-front::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
	opacity: 0.5;
}

.magazine-spine {
	position: absolute;
	left: 0;
	width: 20px;
	height: 100%;
	background: linear-gradient(90deg, #0f2341 0%, #1a365d 100%);
	border-radius: 4px 0 0 4px;
	transform: translateX(-18px) rotateY(-90deg);
	transform-origin: right center;
}

.magazine-content-preview {
	text-align: center;
	color: white;
	padding: 30px;
	z-index: 1;
	position: relative;
}

.magazine-logo {
	width: 80px;
	height: 80px;
	margin-bottom: 20px;
	border-radius: 50%;
	background: white;
	padding: 10px;
}

.magazine-content-preview h3 {
	font-size: 1.4rem;
	font-weight: 700;
	margin-bottom: 10px;
	text-transform: uppercase;
	letter-spacing: 1px;
}

.magazine-subtitle {
	color: #eabd57;
	font-size: 1.1rem;
	font-weight: 600;
	margin-bottom: 20px;
}

.magazine-decoration {
	font-size: 2.5rem;
	color: #eabd57;
	opacity: 0.8;
}

.magazine-shadow {
	position: absolute;
	bottom: -20px;
	left: 50%;
	transform: translateX(-50%);
	width: 200px;
	height: 20px;
	background: radial-gradient(ellipse, rgba(0,0,0,0.3) 0%, transparent 70%);
}

.magazine-info {
	padding: 20px;
}

.magazine-title {
	font-size: 1.8rem;
	font-weight: 700;
	color: #1a365d;
	margin-bottom: 15px;
}

.magazine-description {
	color: #555;
	line-height: 1.7;
	margin-bottom: 20px;
}

.magazine-highlights {
	list-style: none;
	padding: 0;
	margin-bottom: 25px;
}

.magazine-highlights li {
	padding: 8px 0;
	color: #444;
	font-size: 0.95rem;
}

.magazine-highlights li i {
	color: #eabd57;
	margin-right: 10px;
	width: 20px;
}

.magazine-actions {
	display: flex;
	gap: 15px;
	flex-wrap: wrap;
}

.btn-magazine-view {
	background: #1a365d;
	color: white;
	padding: 12px 25px;
	border-radius: 8px;
	font-weight: 600;
	transition: all 0.3s ease;
	text-decoration: none;
}

.btn-magazine-view:hover {
	background: #eabd57;
	color: #1a365d;
	transform: translateY(-2px);
	box-shadow: 0 5px 20px rgba(234, 189, 87, 0.4);
}

.btn-magazine-download {
	background: transparent;
	color: #1a365d;
	padding: 12px 25px;
	border: 2px solid #1a365d;
	border-radius: 8px;
	font-weight: 600;
	transition: all 0.3s ease;
	text-decoration: none;
}

.btn-magazine-download:hover {
	background: #1a365d;
	color: white;
	transform: translateY(-2px);
}

@media (max-width: 768px) {
	.magazine-cover {
		width: 220px;
		height: 300px;
	}

	.magazine-content-preview h3 {
		font-size: 1.1rem;
	}

	.magazine-logo {
		width: 60px;
		height: 60px;
	}

	.magazine-title {
		font-size: 1.5rem;
	}

	.magazine-actions {
		flex-direction: column;
	}

	.btn-magazine-view,
	.btn-magazine-download {
		text-align: center;
	}
}
`}</style>

			{parentTestimonial && parentTestimonial.length > 0 && (
				<section className="pt-5 mb-5" data-aos="fade-up" style={{ backgroundColor: "#f1f1f1" }}>
					<div className="Parents-conner container">
						<div className="row">
							<div className="section-title" style={{ visibility: "visible" }} data-aos="fade-up">
								<p className="title-branding mb-2">
									<img
										className="img-fluid"
										src={site.logoUrl}
										width="49px"
										height="49px"
										alt="logo"
									/>
								</p>
								<h2 className="p-color">
									<small>{site.name} Testimonial</small>
								</h2>
							</div>
							<p className="text-center">
								Every member of our school community has a unique story to tell. From transformative
								learning experiences to moments of personal achievement, these stories showcase the
								spirit and values that define us. Hear directly from our alumni, students, parents,
								and well wishers.{" "}
							</p>
						</div>
					</div>
					<div className="row">
						<div className="carousel-container1">
							<div className="carousel1" ref={carouselRef}>
								{parentTestimonial.map((img, i) => (
									<div className="slide1" key={i}>
										<img src={img} alt="Image 1" style={{ minHeight: "100%" }} />
									</div>
								))}
							</div>
							<div className="nav-buttons">
								<button id="prev">&#10094;</button>
								<button id="next">&#10095;</button>
							</div>
						</div>
					</div>
				</section>
			)}
			<section className="contact mt-5">
				<div className="container" data-aos="fade-up">
					<div className="row">
						<div className="section-title" style={{ visibility: "visible" }} data-aos="fade-up">
							<p className="title-branding">
								<img
									className="img-fluid mb-3"
									src={site.logoUrl}
									width="49px"
									height="49px"
									alt="logo"
								/>
							</p>
						</div>
						<div id="contactUsForm">
							<div className="carousel slide h-100" data-bs-ride="carousel" data-bs-pause="false">
								<div className="carousel-inner h-100">
									<div className="carousel-item active" data-bs-interval="3000">
										<img
											src="https://res.cloudinary.com/djfy7fvq1/image/upload/w_1000/q_auto/f_auto/v1683454348/Screenshot_2023-05-07_at_3.41.47_PM_wt8wpn.png"
											className="d-block w-100"
											alt="school building"
										/>
									</div>
									<div className="carousel-item" data-bs-interval="3000">
										<img
											src="https://res.cloudinary.com/djfy7fvq1/image/upload/q_auto/f_auto/v1739893269/Scottish/drc1d0rm8iiwsjxmsqoe.jpg"
											className="d-block w-100 ml-5"
											alt="school building"
										/>
									</div>
								</div>
							</div>
							<form
								id="contact-us-form"
								className="border rounded shadow px-5 contactForm validated-form"
								noValidate
								onSubmit={handleContactSubmit}
								style={{ background: "var(--bs-body-bg)" }}
							>
								<h3 className="text-uppercase mt-4" style={{ color: "black", textAlign: "left" }}>
									Schedule a campus visit{" "}
								</h3>
								<div>
									<i className="fa-solid fa-minus" style={{ color: "#e3bf68", fontSize: "50px" }}></i>
								</div>
								<div>
									<p style={{ color: "black", textAlign: "left" }}>
										Seeing is believing. To experience the infrastructure and atmosphere of{" "}
										{site.name}, do get in touch with us{" "}
									</p>
								</div>
								<div className="mb-3">
									<input
										className="form-control"
										type="text"
										name="user[name]"
										aria-label="Enter Name"
										placeholder="Name"
										value={contact.name}
										onChange={(e) => setContact({ ...contact, name: e.target.value })}
										required
									/>
								</div>
								<div className="mb-3">
									<input
										className="form-control"
										type="email"
										name="user[email]"
										aria-label="Enter Email"
										placeholder="Email"
										value={contact.email}
										onChange={(e) => setContact({ ...contact, email: e.target.value })}
										required
									/>
								</div>
								<div className="mb-3">
									<input
										className="form-control"
										type="number"
										name="user[phone]"
										aria-label="Enter Phone Number"
										placeholder="Phone Number"
										value={contact.phone}
										onChange={(e) => setContact({ ...contact, phone: e.target.value })}
										required
									/>
								</div>
								<div className="mb-3">
									<select
										className="form-select"
										name="user[branch]"
										aria-label="Branch Selection"
										value={contact.branch}
										onChange={(e) => setContact({ ...contact, branch: e.target.value })}
										required
									>
										<option value="">Select branch</option>
										<option value="Sector 16 & 17">Sector 16 & 17</option>
										<option value="South Bypass">South Bypass</option>
									</select>
								</div>
								<div className="mb-3">
									<textarea
										className="form-control"
										name="user[message]"
										aria-label="Enter Your Message"
										placeholder="Message"
										rows="3"
										value={contact.message}
										onChange={(e) => setContact({ ...contact, message: e.target.value })}
										required
									></textarea>
								</div>
								<Recaptcha ref={contactRecaptchaRef} />

								<div className="mb-3 row mx-1">
									<button className="btn btn-outline-secondary btn-lg col " type="submit">
										<i className="fa-solid fa-envelope" style={{ color: "#bbbbbb" }}></i> Send Us A
										Message
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
			<section className="pt-4 container" data-aos="fade-up">
				<div className="">
					<div className=" border rounded border-0 border-light d-flex flex-column justify-content-between align-items-center flex-lg-row p-2 p-lg-3">
						<div className="text-center text-lg-start py-3 py-lg-1">
							<h2 className="fw-bold mb-2">
								<strong>Subscribe to our newsletter</strong>
							</h2>
							<p className="mb-0">For latest Information.</p>
						</div>
						<form
							className="d-flex justify-content-center flex-wrap my-2 validated-form"
							noValidate
							onSubmit={handleNewsletterSubmit}
						>
							<div className="m-2">
								<input
									className="form-control"
									type="email"
									name="email"
									placeholder="Your Email"
									value={newsletterEmail}
									onChange={(e) => setNewsletterEmail(e.target.value)}
									required
								/>
							</div>
							<Recaptcha ref={newsletterRecaptchaRef} />

							<div className="my-2">
								<button className="btn btn-primary ms-sm-2" type="submit">
									Subscribe{" "}
								</button>
							</div>
						</form>
					</div>
				</div>
			</section>
			<section className="pt-5" data-aos="fade-up">
				<div className="facts-and-figure container">
					<div className="row">
						<h2 className="text-center text-uppercase" style={{ color: "#2f3091" }}>
							{" "}
							FACTS & FIGURES
						</h2>
						<div
							className="section-title wow fadeInUp"
							style={{ visibility: "visible", animationName: "fadeInUp" }}
						>
							<p className="title-branding mb-2">
								<img className="img-fluid" alt="logo" src={site.logoUrl} width="49px" height="49px" />
							</p>
						</div>
					</div>
					<div className="container ">
						<ul className="row">
							<li className="col">
								<div className="single_counter">
									<div>
										<h2>
											<i className="fa-solid fa-school"></i>
											<span className="counting" data-count="1937">
												2015
											</span>
											<span></span>
										</h2>
									</div>
									<h5>
										School <br />
										Founded In
									</h5>
								</div>
							</li>
							<li className="col">
								<div className="single_counter ">
									<div>
										<h2>
											<i className="fa-solid fa-futbol fa-bounce" style={{ marginBottom: "-0.3rem" }}></i>
											<span className="counting" data-count="30" style={{ fontSize: "40px" }}>
												15
											</span>
											<span>+</span>
											{/* <br><small style="font-size: 30px;">Sports</small> */}
										</h2>
									</div>
									<h5 style={{ fontSize: "1.5rem" }}>Sports</h5>
								</div>
							</li>
							<li className="col">
								<div className="single_counter ">
									<div>
										<h2>
											<i
												className="fa-solid fa-chalkboard-user"
												style={{ marginBottom: "-0.3rem" }}
											></i>
											<span className="counting">1:9</span>
										</h2>
									</div>
									<h5>
										Pupil Teacher
										<br /> Ratio
									</h5>
								</div>
							</li>
							<li className="col">
								<div className="single_counter ">
									<div>
										<h2>
											<i className="fa-solid fa-medal fa-beat" style={{ marginBottom: "-0.3rem" }}></i>
											<span className="counting" data-count="25000">
												2000
											</span>
											<span>+</span>
										</h2>
									</div>
									<h5>Achievements</h5>
								</div>
							</li>
							{/* <li class="col">
                        <div class="single_counter ">
                            <div>
                                <h2>
                                    <i class="las la-award"></i>
                                    <span class="counting" data-count="8">8</span><span></span>
                                </h2>
                            </div>
                            <h5>Board <br>Accreditation </h5>
                        </div>
                    </li> */}
						</ul>
					</div>
				</div>
			</section>

			<link rel="stylesheet" href="/stylesheets/button.css" />
			<link rel="stylesheet" href="/stylesheets/home.css" />
			<link rel="stylesheet" href="/stylesheets/infinty-carousel.css" />
			<style>{`
                        @media (max-width:770px) {

                            .carousel-item h3,
                            .carousel-item p {
                                font-size: 10px;
                            }
                        }
                    `}</style>
		</>
	);
}
