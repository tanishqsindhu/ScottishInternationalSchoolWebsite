import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Seo from "../../components/Seo.jsx";
import { api } from "../../lib/api.js";

const FALLBACK_IMAGE =
	"https://res.cloudinary.com/dlpq5gl1a/image/upload/v1688312952/No_image_Found_ioxitj.png";

// Banner matches photoSlide.ejs but links back to the news list instead of home.
function EventBanner() {
	return (
		<section id="top" className="brand-hero row" style={{ overflowX: "hidden" }}>
			<div className="animate-banner">
				<picture className="zoom">
					<div
						id="carouselExampleSlidesOnly"
						className="carousel slide carousel-fade"
						data-bs-ride="carousel"
						data-bs-pause="false"
					>
						<div className="carousel-inner">
							<div className="carousel-item active" data-bs-interval="3000">
								<img
									src="https://res.cloudinary.com/djfy7fvq1/image/upload/w_1500/f_auto,q_auto/v1/Scottish/me8akbjwzvyuzno4e6zf"
									className="d-block w-100"
									alt="building picture"
									style={{ height: "70vh" }}
								/>
							</div>
							<div className="carousel-item" data-bs-interval="3000">
								<img
									src="https://res.cloudinary.com/djfy7fvq1/image/upload/w_1500/q_auto/f_auto/v1741596937/naqc1fiijnhbap3jmyr8.webp"
									className="d-block w-100"
									alt="building picture"
									style={{ height: "70vh" }}
								/>
							</div>
						</div>
					</div>
				</picture>
			</div>
			<div className="page-title align-items-start">
				<div className="container">
					<div className="banner-content-inner">
						<h1 style={{ fontSize: "3em" }}>
							News And Events
							<Link to="/news-events">
								<i className="fa-solid fa-arrow-left" style={{ color: "#eabd57" }}></i> Back
							</Link>
						</h1>
					</div>
				</div>
			</div>
		</section>
	);
}

export default function EventPage() {
	const { id } = useParams();
	const [article, setArticle] = useState(null);
	const [status, setStatus] = useState("loading");

	useEffect(() => {
		let cancelled = false;
		setStatus("loading");
		setArticle(null);
		api
			.get(`/news-events?id=${id}`)
			.then((data) => {
				if (cancelled) return;
				if (data.article) {
					setArticle(data.article);
					setStatus("loaded");
				} else {
					setStatus("notfound");
				}
			})
			.catch(() => {
				if (!cancelled) setStatus("notfound");
			});
		return () => {
			cancelled = true;
		};
	}, [id]);

	if (status === "notfound") {
		return (
			<>
				<Seo title="News & Events" />
				<EventBanner />
				<div className="container py-5 text-center">
					<h2>Article not found</h2>
					<p>
						<Link to="/news-events">Back to News &amp; Events</Link>
					</p>
				</div>
			</>
		);
	}

	return (
		<>
			<Seo title={article ? article.title : "News & Events"} />
			<EventBanner />
			<div className="container-fuild">
				<div className="row">
					<section className="inner-entry">
						<div
							className="container wow fadeInUp"
							data-wow-duration="1.5s"
							data-wow-delay=".2s"
							style={{
								visibility: "visible",
								animationDuration: "1.5s",
								animationDelay: "0.2s",
								animationName: "fadeInUp",
							}}
						>
							<div className="mainTitle">
								<p className="title-branding mb-2">
									<img
										className="img-fluid"
										src="/assets/webp/SISTransparentLogoWhite.webp"
										alt="Logo"
									/>
								</p>
							</div>
						</div>
					</section>
				</div>
			</div>
			{article && (
				<div className="page-content">
					<section className="profile-section">
						<div className="container-fuild">
							<div className="row">
								<div className="col-md-5 col-12 order-md-1">
									<div className="profile-picture">
										<div
											id="carouselExampleSlidesOnly"
											className="carousel slide carousel-fade"
											data-bs-ride="carousel"
											data-bs-pause="false"
										>
											<div className="carousel-inner">
												<div className="carousel-item active" data-bs-interval="4000">
													<img
														src={article.images.length ? article.images[0].url : FALLBACK_IMAGE}
														className="d-block w-100"
														alt="event photo"
														style={{ width: "100%", height: "100%" }}
													/>
												</div>
												{article.images.slice(1).map((image) => (
													<div className="carousel-item" key={image.filename || image.url}>
														<img
															src={image.url}
															className="d-block w-100"
															alt="event photo"
															style={{ width: "100%", height: "100%" }}
														/>
													</div>
												))}
											</div>
										</div>
									</div>
								</div>
								<div className="col-md-7 col-12 order-md-2">
									<div className="profile-content newsDetails style-section-3 pt-0">
										<div className="text">
											<div className="content-text ImgNotFound mt-3 mt-md-0 me-0">
												<h3 className="title-medium">
													<small>News</small>
													{article.title}{" "}
													<b className="date">
														<i className="fa-regular fa-clock fa-fade"></i> {article.date}{" "}
														{article.month} {article.year}
													</b>
												</h3>

												<div className="text readMoreText">
													{article.content ? (
														<div
															className="article-content"
															data-aos="fade-up"
															dangerouslySetInnerHTML={{ __html: article.content }}
														/>
													) : (
														<>
															<p></p>
															<div data-aos="fade-up">{article.paragraph1}</div>
															<div>&nbsp;</div>
															{article.paragraph2title !== "" && (
																<div className="section-title" data-aos="fade-up">
																	<h4 className="p-color fs-3">{article.paragraph2title}</h4>
																</div>
															)}
															{article.paragraph2 !== "" && (
																<>
																	<div data-aos="fade-up">{article.paragraph2}</div>
																	<div>&nbsp;</div>
																</>
															)}
															{article.paragraph3title !== "" && (
																<div className="section-title" data-aos="fade-up">
																	<h4 className="p-color fs-3">{article.paragraph3title}</h4>
																</div>
															)}
															{article.paragraph3 !== "" && (
																<>
																	<div data-aos="fade-up">{article.paragraph3}</div>
																	<div>&nbsp;</div>
																</>
															)}
															{article.paragraph4title !== "" && (
																<div className="section-title" data-aos="fade-up">
																	<h4 className="p-color fs-3">{article.paragraph4title}</h4>
																</div>
															)}
															{article.paragraph4 !== "" && (
																<>
																	<div data-aos="fade-up">{article.paragraph4}</div>
																	<div>&nbsp;</div>
																</>
															)}
															{article.paragraph5title !== "" && (
																<div className="section-title" data-aos="fade-up">
																	<h4 className="p-color fs-3">{article.paragraph5title}</h4>
																</div>
															)}
															{article.paragraph5 !== "" && (
																<div data-aos="fade-up">{article.paragraph5}</div>
															)}
															<p></p>
														</>
													)}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			)}
			<link rel="stylesheet" href="/stylesheets/eventPage.css" />
			<link rel="stylesheet" href="/stylesheets/page-title.css" />
			<style>{`
				.article-content { font-size: 16px; line-height: 1.8; }
				.article-content h1 { font-size: 1.8em; color: #980505; margin-top: 1em; }
				.article-content h2 { font-size: 1.5em; color: #980505; margin-top: 1em; }
				.article-content h3 { font-size: 1.25em; margin-top: 0.8em; }
				.article-content p { margin-bottom: 0.8em; }
				.article-content blockquote { border-left: 4px solid #980505; padding-left: 1em; margin: 1em 0; color: #555; font-style: italic; }
				.article-content ul, .article-content ol { padding-left: 1.5em; margin-bottom: 1em; }
				.article-content a { color: #980505; text-decoration: underline; }
			`}</style>
		</>
	);
}
