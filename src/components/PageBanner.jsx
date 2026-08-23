import { Link } from "react-router-dom";

// Replaces views/partials/photoSlide.ejs - hero banner with page title.
export default function PageBanner({ title }) {
	return (
		<section id="top" className="brand-hero row" style={{ overflowX: "hidden" }}>
			<div className="animate-banner">
				<picture className="zoom">
					<div
						id="carouselExampleSlidesOnly"
						className="carousel slide carousel-fade"
						data-bs-ride="carousel"
					>
						<div className="carousel-inner">
							<div className="carousel-item active" data-bs-interval="3000">
								<img
									src="https://res.cloudinary.com/djfy7fvq1/image/upload/w_1500/f_auto,q_auto/v1/Scottish/me8akbjwzvyuzno4e6zf"
									className="d-block w-100"
									alt="School Building"
									style={{ height: "70vh" }}
								/>
							</div>
							<div className="carousel-item" data-bs-interval="3000">
								<img
									src="https://res.cloudinary.com/djfy7fvq1/image/upload/w_1500/q_auto/f_auto/v1741596937/naqc1fiijnhbap3jmyr8.webp"
									className="d-block w-100"
									alt="School Building"
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
						<h1>
							{title}
							<Link to="/">
								<i className="fa-solid fa-arrow-left" style={{ color: "#eabd57" }}></i> Home
							</Link>
						</h1>
					</div>
				</div>
			</div>
		</section>
	);
}
