import Seo from "../../components/Seo.jsx";
import PageBanner from "../../components/PageBanner.jsx";

const individualAwards = [
	{
		title: "International Level Chess Champion",
		image: "/assets/webp/sports/chess.webp",
		text: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
		updated: "Last updated 3 mins ago",
	},
	{
		title: "State Level Chess Champion",
		image: "/assets/webp/sports/chess.webp",
		text: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
		updated: "Last updated 3 mins ago",
	},
	{
		title: "National Level Chess Champion",
		image: "/assets/webp/sports/chess.webp",
		text: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
		updated: "Last updated 3 mins ago",
	},
	{
		title: "School Level Chess Champion",
		image: "/assets/webp/sports/chess.webp",
		text: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
		updated: "Last updated 3 mins ago",
	},
];

const teamSportsRows = [
	{
		tournament: "Summer Valley Invitational Junior Football Tournament",
		venue: "Summer Valley School, Dehradun",
		date: "22nd August to 27th August, 2022",
		result: "Semi Finalist",
	},
	{
		tournament: "The Doon School Invitational Under-14 Football Tournament",
		venue: "The Doon School, Dehradun",
		date: "29th August to 3rd September, 2022",
		result: "Semi Finalist",
	},
	{
		tournament: "Selaqui All India Inter School Soccer Tournament",
		venue: "Selaqui International School, Selaqui",
		date: "3rd September to 6th September, 2022",
		result: "Semi Finalist",
	},
];

const specialMention =
	"Ishan Kumar was adjudged Best Goal Keeper of the tournament during Summer Valley Invitational Junior U-15 Football Tournament-2022.";

function TeamSportTable({
	title,
	titleClassName = "mt-5 text-uppercase text-center",
	sectionTitleClassName = "section-title",
	mobileImg,
	tableImg,
}) {
	return (
		<div className="table-custom table-responsive">
			<div className={sectionTitleClassName}>
				<h2 className={titleClassName} style={{ color: "#654f4f" }}>
					{title}
				</h2>
			</div>
			<div className="d-block d-lg-none">
				<div className="">
					<img
						className="img-fluid w-100"
						src={mobileImg.src}
						style={mobileImg.style}
						alt={mobileImg.alt}
					/>
				</div>
			</div>
			<table className="table table-bordered table-striped text-center">
				<tbody>
					<tr>
						<td colSpan="5" style={{ textAlign: "left" }}>
							Coach: <b>Manoj Kumar Barthwal</b> | Captain: <b>Param Mehta</b>
						</td>
					</tr>
					<tr>
						<td rowSpan="4" className="bg-white d-none d-lg-table-cell" width="33%">
							<div className="">
								<img
									className="img-fluid w-100"
									src={tableImg.src}
									style={tableImg.style}
									alt={tableImg.alt}
								/>
							</div>
						</td>
						<th>Tournament</th>
						<th width="20%">Venue</th>
						<th width="15%">Date/Month</th>
						<th width="10%">Result</th>
					</tr>
					{teamSportsRows.map((row) => (
						<tr key={row.tournament}>
							<td>{row.tournament}</td>
							<td>{row.venue}</td>
							<td>{row.date}</td>
							<td>{row.result}</td>
						</tr>
					))}
					<tr>
						<td colSpan="5">
							<h5 className="mt-2 text-left">
								<b>Special Mention:</b>
							</h5>
							<ul className="list text-left">
								<li>{specialMention}</li>
								<ul></ul>
							</ul>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export default function AccomplishmentsCoCurricular() {
	return (
		<>
			<Seo title="Co-Curricular Accomplishments" />
			<PageBanner title="Co-Curricular Accomplishments" />
			<div className="container-fuild" data-aos="fade-up">
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
								<h2>Achievements</h2>
							</div>
						</div>
					</section>
				</div>
			</div>
			<section id="winners" data-aos="fade-up">
				<div className="container" style={{ overflowX: "hidden" }}>
					<div className="row">
						<h2 className="mt-5 text-center fs-1" style={{ color: "#654f4f" }}>
							22nd UK Open State Roller Skating Championship 2023
						</h2>
						<i className="fa-solid fa-minus" style={{ color: "#e3bf68", fontSize: "50px" }}></i>
						<p>
							The 22nd UK Open State Roller Skating Championship, 2023 witnessed fierce competition
							among 40 schools from across the state. In an outstanding display of skill and
							determination, Welhamites clinched the highly coveted overall best performance
							trophy. Their exceptional performance was evident as they emerged victorious in the
							Senior and Junior Roll Ball matches, as well as the Junior and Sub-Junior Roller
							Hockey matches. Additionally, they secured the runner-up position in the Senior and
							Junior In-line Hockey matches. Notably, some of our talented players also
							participated in the Roll Ball nationals in the Senior and Sub-Junior categories.
							Congratulations to the entire team on their remarkable success!
						</p>
					</div>
					<div className="row">
						<div className="row mb-3">
							<div className="col-md-4 mb-3 mb-md-0">
								<img src="/assets/webp/sports/karate.webp" className="img-fluid rounded" alt="" />
							</div>
							<div className="col-md-4 mb-3 mb-md-0">
								<img src="/assets/webp/sports/karate.webp" className="img-fluid rounded" alt="" />
							</div>
							<div className="col-md-4 mb-3 mb-md-0">
								<img src="/assets/webp/sports/karate.webp" className="img-fluid rounded" alt="" />
							</div>
						</div>
						<div className="row">
							<div className="col-md-6 mb-3 mb-md-0">
								<img src="/assets/webp/sports/karate.webp" alt="" className="img-fluid rounded" />
							</div>
							<div className="col-md-6 mb-3 mb-md-0">
								<img src="/assets/webp/sports/karate.webp" alt="" className="img-fluid rounded" />
							</div>
						</div>
					</div>
				</div>
				<div className="container" style={{ overflowX: "hidden" }}>
					<div className="row">
						<h2 className="mt-5 text-center fs-1" style={{ color: "#654f4f" }}>
							INTER SCHOOL AQUA MEET
						</h2>
						<i className="fa-solid fa-minus" style={{ color: "#e3bf68", fontSize: "50px" }}></i>
						<p>
							School&rsquo;s Swimming Team lifted the Championship Trophy and proved their mettle
							at the Inter School Aqua Meet held at the Shri Ram Centennial School. With an amazing
							showcase of talent, our team of 23 students competed across diverse age categories,
							leaving an indelible mark. Their exceptional skills and dedication led to a
							remarkable achievement of 8 Gold, 8 Silver, and 5 Bronze medals. Astitva Sharma
							received special recognition as the Best Swimmer in the Junior category. The entire
							Welham community exults in this momentous triumph as we proudly hoist the
							championship trophy. Heartfelt congratulations to our outstanding swimmers and the
							coach for their remarkable achievements. Their unwavering commitment and hard work
							have truly paid off!
						</p>
					</div>
					<div className="row">
						<div className="row mb-3">
							<div className="col-md-4 mb-3 mb-md-0">
								<img
									src="/assets/webp/sports/swimming.webp"
									className="img-fluid rounded"
									alt=""
									width="100%"
									height="100%"
								/>
							</div>
							<div className="col-md-4 mb-3 mb-md-0">
								<img
									src="/assets/webp/sports/swimming.webp"
									className="img-fluid rounded"
									alt=""
									width="100%"
									height="100%"
								/>
							</div>
							<div className="col-md-4 mb-3 mb-md-0">
								<img
									src="/assets/webp/sports/swimming.webp"
									className="img-fluid rounded"
									alt=""
									width="100%"
									height="100%"
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6 mb-3 mb-md-0">
								<img
									src="/assets/webp/sports/swimming.webp"
									alt=""
									className="img-fluid rounded"
									width="100%"
									height="100%"
								/>
							</div>
							<div className="col-md-6 mb-3 mb-md-0">
								<img
									src="/assets/webp/sports/swimming.webp"
									alt=""
									className="img-fluid rounded"
									width="100%"
									height="100%"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section id="individual-awards" data-aos="fade-up">
				<div className="container mt-5">
					<div className="row" style={{ overflowX: "hidden" }}>
						<h2 className="text-uppercase text-center fs-1" style={{ color: "#654f4f" }}>
							Individual Awards
						</h2>
						<i className="fa-solid fa-minus" style={{ color: "#e3bf68", fontSize: "50px" }}></i>
						{individualAwards.slice(0, 2).map((award) => (
							<div className="col-md-6" key={award.title}>
								<div className="card mb-3" style={{ maxWidth: "540px" }}>
									<div className="row g-0">
										<div className="col-md-5">
											<img
												src={award.image}
												className="img-fluid"
												alt="School Building"
												style={{ height: "100%" }}
											/>
										</div>
										<div className="col-md-7">
											<div className="card-body">
												<h5 className="card-title">{award.title}</h5>
												<p className="card-text">{award.text}</p>
												<p className="card-text">
													<small className="text-body-secondary">{award.updated}</small>
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className="row">
						{individualAwards.slice(2).map((award) => (
							<div className="col-md-6" key={award.title}>
								<div className="card mb-3" style={{ maxWidth: "540px" }}>
									<div className="row g-0">
										<div className="col-md-5">
											<img
												src={award.image}
												className="img-fluid"
												alt="School Building"
												style={{ height: "100%" }}
											/>
										</div>
										<div className="col-md-7">
											<div className="card-body">
												<h5 className="card-title">{award.title}</h5>
												<p className="card-text">{award.text}</p>
												<p className="card-text">
													<small className="text-body-secondary">{award.updated}</small>
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
			<section id="team-sports" data-aos="fade-up">
				<section>
					<div className="container" data-aos="fade-up">
						<div className="row mt-5 mb-3">
							<h2 className="text-uppercase text-center p-0 fs-1" style={{ color: "#654f4f" }}>
								Team Sports
							</h2>
							<i
								className="fa-solid fa-minus p-0"
								style={{ color: "#e3bf68", fontSize: "50px" }}
							></i>
						</div>
						<TeamSportTable
							title="Soccer"
							titleClassName="text-uppercase text-center"
							mobileImg={{ src: "/assets/webp/sports/football.webp", alt: "" }}
							tableImg={{ src: "/assets/webp/sports/football.webp", alt: "" }}
						/>
					</div>
				</section>
				<section>
					<div className="container" data-aos="fade-up">
						<TeamSportTable
							title="Basketball"
							mobileImg={{
								src: "/assets/webp/basketball.webp",
								style: { maxHeight: "30rem" },
								alt: "student playing basketball",
							}}
							tableImg={{
								src: "/assets/webp/basketball.webp",
								style: { height: "500px" },
								alt: "basketball image",
							}}
						/>
					</div>
				</section>
				<section>
					<div className="container" data-aos="fade-up">
						<TeamSportTable
							title="Volley"
							sectionTitleClassName="section-title wow fadeInUp"
							mobileImg={{ src: "/assets/webp/sports/volleyball.webp", alt: "" }}
							tableImg={{ src: "/assets/webp/sports/volleyball.webp", alt: "" }}
						/>
					</div>
				</section>
				<section>
					<div className="container" data-aos="fade-up">
						<TeamSportTable
							title="Karate"
							mobileImg={{ src: "/assets/webp/sports/football.webp", alt: "" }}
							tableImg={{ src: "/assets/webp/sports/karate.webp", alt: "" }}
						/>
					</div>
				</section>
			</section>

			<link rel="stylesheet" href="/stylesheets/page-title.css" />
			<style>{`
	table {
		font-size: 0.9rem;
	}
	#team-sports img,
	#individual-awards img,
	#winners img {
		max-width: 100%;
	}

	@media (min-width: 750px) {
		#individual-awards img {
			border-bottom-left-radius: var(--bs-border-radius) !important;
			border-top-left-radius: var(--bs-border-radius) !important;
		}
	}

	@media (max-width: 750px) {
		#team-sports img,
		#individual-awards img {
			border-top-left-radius: var(--bs-border-radius) !important;
			border-top-right-radius: var(--bs-border-radius) !important;
		}
	}

	@media (max-width: 770px) {
		.banner-content-inner h1 {
			font-size: 1.9rem !important;
		}
	}
			`}</style>
		</>
	);
}
