import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../../components/Seo.jsx";
import PageBanner from "../../components/PageBanner.jsx";
import { api } from "../../lib/api.js";

const FALLBACK_IMAGE =
	"https://res.cloudinary.com/dlpq5gl1a/image/upload/v1688312952/No_image_Found_ioxitj.png";

export default function NewsAndEvents() {
	const [news, setNews] = useState([]);

	useEffect(() => {
		let cancelled = false;
		api
			.get("/news-events")
			.then((data) => {
				if (!cancelled) setNews(data.news || []);
			})
			.catch(() => {
				if (!cancelled) setNews([]);
			});
		return () => {
			cancelled = true;
		};
	}, []);

	return (
		<>
			<Seo title="News & Events" />
			<PageBanner title="News And Events" />
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
								<h2></h2>
							</div>
						</div>
					</section>
				</div>
			</div>
			<section className="photo-gallery bg-white news-page" style={{ overflowX: "hidden" }}>
				<div className="container-fluid">
					<ul className="photoGallery p-0 row">
						{news.map((item) => (
							<li className="col-xs-12 col-md-6 col-lg-4 mb-4" data-aos="fade-up" key={item._id}>
								<div className="gallery-single">
									<div>
										<span>
											<p>
												<b>{item.date}</b> <b>{item.month}</b> <b>{item.year}</b>
											</p>
										</span>
										<span>
											<Link to={`/news-events/${item._id}`}>
												<figure>
													{item.images.length ? (
														<img
															src={item.images[0].url}
															alt="event photo"
															style={{ width: "100%", height: "100%" }}
														/>
													) : (
														<img
															src={FALLBACK_IMAGE}
															className="d-block w-100"
															alt="event photo"
															style={{ width: "100%", height: "100%" }}
														/>
													)}
												</figure>
											</Link>
										</span>
										<span>
											<h3>{item.title}</h3>
											<p className="test">{item.secondaryTitle}</p>
											<p className="text-link">
												<Link to={`/news-events/${item._id}`}>
													Full Story <i className="fa-solid fa-arrow-right fa-flip"></i>
												</Link>
											</p>
										</span>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			</section>

			<link rel="stylesheet" href="/stylesheets/news-events-homepage.css" />
			<link rel="stylesheet" href="/stylesheets/page-title.css" />
		</>
	);
}
