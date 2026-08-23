import { Link } from "react-router-dom";
import Seo from "../../components/Seo.jsx";
import PageBanner from "../../components/PageBanner.jsx";

const cards = [
	{
		to: "/beyond-classroom/sports",
		img: "/assets/webp/basketball.webp",
		title: "Sports",
	},
	{
		to: "/beyond-classroom/co-curricular",
		img: "/assets/webp/Glimpse of Baisakhi Celebration.webp",
		title: "Co-Currucular",
	},
];

export default function BeyondClassroom() {
	return (
		<>
			<Seo title="Beyond Classroom" />
			<PageBanner title="Beyond Classroom" />
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
			<section className="container pt-3 bg-1" data-aos="fade-up">
				<div className="row justify-content-center">
					<h2 className="text-center display-1 py-5" style={{ color: "#654f4f" }}>
						WHERE YOU WANT TO VISIT FIRST?
					</h2>
					{cards.map((card, i) => (
						<div className={i === 0 ? "col-md-6 mb-2" : "col-md-6"} key={card.to}>
							<Link to={card.to}>
								<div className="card">
									<img src={card.img} className="card-img" height="750px" />
									<div className="card-img-overlay align-content-center">
										<h5
											className="card-title text-center display-3 rounded"
											style={{
												color: "#eabd57",
												backgroundColor: "rgba(46, 46, 46, 0.4)",
											}}
										>
											{card.title}
										</h5>
									</div>
								</div>
							</Link>
						</div>
					))}
				</div>
			</section>
			<style>{`
				@keyframes zoominoutsinglefeatured {
					0% {
						transform: scale(1, 1);
					}

					100% {
						transform: scale(1.25, 1.25);
					}
				}

				.card:hover {
					animation: zoominoutsinglefeatured 20s infinite;
				}
			`}</style>
			<link rel="stylesheet" href="/stylesheets/page-title.css" />
		</>
	);
}
