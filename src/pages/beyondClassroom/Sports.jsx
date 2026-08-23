import Seo from "../../components/Seo.jsx";
import PageBanner from "../../components/PageBanner.jsx";

const badgeStyle = {
	backgroundColor: "rgba(255, 255, 255, 0.592)",
	color: "#d42123",
	width: "35%",
	height: "10%",
	bottom: "15px",
	left: "9%",
	textAlign: "center",
	paddingTop: "15px",
};

export default function BeyondClassroomSports() {
	return (
		<>
			<Seo title="Sports" />
			<PageBanner title="Beyond Classroom" />

			<div className="container-fuild">
				<div className="row" data-aos="fade-up">
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
								<h2>Sports</h2>
							</div>
						</div>
					</section>
				</div>
				<div className="container">
					<div className="row" data-aos="fade-up">
						<div className="col py-5">
							<p className="text">
								Sports are an integral part of life at school. We pride in inculcating the finest
								values of dedication, integrity, and team spirit in our student body.
							</p>

							<p className="text">
								Students are encouraged to compete with each other by way of inter house
								competitions. An academic year is typically infused with several sporting
								championships. Besides permanent physical education staff, specialist coaches are
								available year round for students to focus on a single sport, such as table tennis
								or badminton.
							</p>

							<p className="text">
								Our school has done exceedingly well in several sports in the past half-decade,
								including winning under-17 IPSC (Indian Public Schools Conference) football
								championship, winning gold at several major basketball tournaments and many more.
							</p>

							<p className="text">
								Our sports infrastructure is among the best in the country with modern synthetic
								basketball courts, , swimming pool, football ground, vollay ball court and many
								outdoor badminton courts.
							</p>

							<p className="text">
								Football, basketball, volleyball, badminton, table tennis, skating and swimming are
								on offer, alongside athletics, yoga and karate.
							</p>
						</div>
					</div>
					<div className="row mb-3 justify-content-evenly" data-aos="fade-up">
						<div className="col m-2 p-2" style={{ height: "450px" }}>
							<img
								className="rounded"
								src="/assets/webp/Sports infrastructure.webp"
								alt=""
								style={{ width: "100%", height: "100%" }}
							/>
						</div>
					</div>
					<div className="row mb-3 justify-content-evenly" data-aos="fade-up">
						<div className="col mb-2 pr-2 position-relative" style={{ height: "450px" }}>
							<img
								className="rounded"
								src="/assets/webp/basketball.webp"
								alt=""
								style={{ width: "100%", height: "100%" }}
							/>
							<span
								style={badgeStyle}
								className="position-absolute badge rounded-pill text-uppercase"
							>
								Basketball
							</span>
						</div>
						<div className="col mb-2 pr-2 position-relative" style={{ height: "450px" }}>
							<img
								className="rounded"
								src="/assets/webp/sports/volleyball.webp"
								alt=""
								style={{ width: "100%", height: "100%" }}
							/>
							<span
								style={badgeStyle}
								className="position-absolute badge rounded-pill text-uppercase"
							>
								Volleyball
							</span>
						</div>
					</div>
					<div className="row justify-content-center" data-aos="fade-up">
						<div className="col-sm-6 mb-2 position-relative" height="450px">
							<img
								className="rounded"
								src="/assets/webp/sports/Table Tennis.webp"
								alt=""
								style={{ width: "100%", height: "100%" }}
							/>
							<span
								style={badgeStyle}
								className="position-absolute badge rounded-pill text-uppercase"
							>
								Table Tennis
							</span>
						</div>
						<div className="col-sm-6 mb-2 position-relative" height="450px">
							<img
								className="rounded"
								src="/assets/webp/girlsrace.webp"
								alt=""
								style={{ width: "100%", height: "100%" }}
							/>
							<span
								style={badgeStyle}
								className="position-absolute badge rounded-pill text-uppercase"
							>
								Track and Field
							</span>
						</div>
					</div>
				</div>
			</div>

			<link rel="stylesheet" href="/stylesheets/contact-us.css" />
			<link rel="stylesheet" href="/stylesheets/page-title.css" />
		</>
	);
}
