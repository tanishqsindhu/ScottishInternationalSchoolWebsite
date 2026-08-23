import Seo from "../../components/Seo.jsx";
import PageBanner from "../../components/PageBanner.jsx";

// Class X toppers (CBSE Board Result) - left column, two rows
const topperRows = [
	[
		{
			img: "/assets/webp/achievements/academic/Divyanshi.webp",
			alt: "Divyanshi - CBSE Board Result 99.4%",
			name: "Divyanshi",
			pct: "99.4%",
			highlight: true,
		},
		{
			img: "/assets/webp/achievements/academic/Harsh.webp",
			alt: "Harsh - CBSE Board Result 97.4%",
			name: "Harsh",
			pct: "97.4%",
		},
		{
			img: "/assets/webp/achievements/academic/Muskan.webp",
			alt: "Muskan - CBSE Board Result 98%",
			name: "Muskan",
			pct: "98%",
		},
	],
	[
		{
			img: "/assets/webp/achievements/academic/Neha.webp",
			alt: "Neha - CBSE Board Result 96.6%",
			name: "Neha",
			pct: "96.6%",
		},
		{
			img: "/assets/webp/achievements/academic/Anaya.webp",
			alt: "Anaya - CBSE Board Result 96.2%",
			name: "Anaya",
			pct: "96.2%",
		},
		{
			img: "/assets/webp/achievements/academic/Anirudh.webp",
			alt: "Anirudh - CBSE Board Result 96%",
			name: "Anirudh",
			pct: "96%",
		},
		{
			img: "/assets/webp/achievements/academic/Barkha.webp",
			alt: "Barkha - CBSE Board Result 95.4%",
			name: "Barkha",
			pct: "95.4%",
		},
	],
];

const stats = [
	{ value: "95%", label: "Scottishians Scored Above 70%" },
	{ value: "85%", label: "Overall School Average Result" },
	{ value: "70%", label: "Scottishians Scored Above 80%" },
	{ value: "52%", label: "Scottishians Scored Above 90%" },
	{ value: "44%", label: "Scottishians Scored Above 90% in S.St." },
	{ value: "43%", label: "Scottishians Scored Above 90% in Hindi" },
];

// All-students achievement cards, grouped by row as in the original markup
const allStudentRows = [
	[
		{
			img: "/assets/webp/achievements/academic/allStudents/Rashi.webp",
			alt: "Rashi - CBSE Board Result 96.8%",
			name: "RASHI",
			pct: "96.8%",
			highlight: true,
		},
		{
			img: "/assets/webp/achievements/academic/allStudents/Quleen.webp",
			alt: "Quleen - CBSE Board Result 96.6%",
			name: "QULEEN",
			pct: "96.6%",
		},
		{
			img: "/assets/webp/achievements/academic/allStudents/Komal.webp",
			alt: "Komal - CBSE Board Result 96.6%",
			name: "KOMAL",
			pct: "96.6%",
		},
		{
			img: "/assets/webp/achievements/academic/allStudents/Ritika.webp",
			alt: "Ritika - CBSE Board Result 95.2%",
			name: "RITIKA",
			pct: "95.2%",
		},
		{
			img: "/assets/webp/achievements/academic/allStudents/Garvita.webp",
			alt: "Garvita - CBSE Board Result 95%",
			name: "GARVITA",
			pct: "95%",
		},
		{
			img: "/assets/webp/achievements/academic/allStudents/Riya.webp",
			alt: "Riya - CBSE Board Result 93.6%",
			name: "RIYA",
			pct: "93.6%",
		},
		{
			img: "/assets/webp/achievements/academic/allStudents/Tammna.webp",
			alt: "Tammna - CBSE Board Result 93.4%",
			name: "TAMMNA",
			pct: "93.4%",
		},
		{
			img: "/assets/webp/achievements/academic/allStudents/Divya.webp",
			alt: "Divya - CBSE Board Result 93%",
			name: "DIVYA",
			pct: "93%",
		},
	],
	[
		{
			img: "/assets/webp/achievements/academic/allStudents/Chitrakshi.webp",
			alt: "Chitrakshi - CBSE Board Result 92.8%",
			name: "CHITRAKSHI",
			pct: "92.8%",
		},
		{
			img: "/assets/webp/achievements/academic/allStudents/Shanaya.webp",
			alt: "Shanaya - CBSE Board Result 92.6%",
			name: "SHANAYA",
			pct: "92.6%",
		},
		{
			img: "/assets/webp/achievements/academic/allStudents/Kiran.webp",
			alt: "Kiran - CBSE Board Result 92.4%",
			name: "KIRAN",
			pct: "92.4%",
		},
		{
			img: "/assets/webp/achievements/academic/allStudents/Shreya.webp",
			alt: "Shreya - CBSE Board Result 92.4%",
			name: "SHREYA",
			pct: "92.4%",
		},
		{
			img: "/assets/webp/achievements/academic/allStudents/Utsav.webp",
			alt: "Utsav Singla - CBSE Board Result 92%",
			name: "UTSAV SINGLA",
			pct: "92%",
		},
		{
			img: "/assets/webp/achievements/academic/allStudents/Suryanshi.webp",
			alt: "Suryanshi - CBSE Board Result 92%",
			name: "SURYANSHI",
			pct: "92%",
		},
		{
			img: "/assets/webp/achievements/academic/allStudents/Sanya.webp",
			alt: "Sanya - CBSE Board Result 91.4%",
			name: "SANYA",
			pct: "91.4%",
		},
		{
			img: "/assets/webp/achievements/academic/allStudents/Dhara.webp",
			alt: "Dhara - CBSE Board Result 90.8%",
			name: "DHARA",
			pct: "90.8%",
		},
		{
			img: "/assets/webp/achievements/academic/allStudents/Khushi.webp",
			alt: "Khushi - CBSE Board Result 90.6%",
			name: "KHUSHI",
			pct: "90.6%",
		},
	],
	[
		{
			img: "/assets/webp/achievements/academic/allStudents/Yashika.webp",
			alt: "Yashika - CBSE Board Result 94.2%",
			name: "YASHIKA",
			pct: "94.2%",
		},
		{
			img: "/assets/webp/achievements/academic/allStudents/Ishika.webp",
			alt: "Ishika - CBSE Board Result 94%",
			name: "ISHIKA",
			pct: "94%",
		},
		{
			img: "/assets/webp/achievements/academic/allStudents/Nishchal.webp",
			alt: "Nishchal - CBSE Board Result 93.8%",
			name: "NISHCHAL",
			pct: "93.8%",
		},
		{
			img: "/assets/webp/achievements/academic/allStudents/Ritika 2.webp",
			alt: "Ritika - CBSE Board Result 93.2%",
			name: "RITIKA",
			pct: "93.4%",
		},
		{
			img: "/assets/webp/achievements/academic/allStudents/Niyati.webp",
			alt: "Niyati - CBSE Board Result 93.2%",
			name: "NIYATI",
			pct: "93.2%",
		},
		{
			img: "/assets/webp/achievements/academic/allStudents/Aman.webp",
			alt: "Aman - CBSE Board Result 93%",
			name: "AMAN",
			pct: "93%",
		},
		{
			img: "/assets/webp/achievements/academic/allStudents/Kulwant.webp",
			alt: "Kulwant - CBSE Board Result 93%",
			name: "KULWANT",
			pct: "93%",
		},
		{
			img: "/assets/webp/achievements/academic/allStudents/Nikki.webp",
			alt: "Nikki - CBSE Board Result 92.8%",
			name: "NIKKI",
			pct: "92.8%",
		},
	],
	[
		{
			img: "/assets/webp/achievements/academic/allStudents/Archana.webp",
			alt: "Archana - CBSE Board Result 92.8%",
			name: "ARCHANA",
			pct: "92.8%",
		},
		{
			img: "/assets/webp/achievements/academic/allStudents/Priyanshi.webp",
			alt: "Priyanshi - CBSE Board Result 92.4%",
			name: "PRIYANSHI",
			pct: "92.4%",
		},
		{
			img: "/assets/webp/achievements/academic/allStudents/Aayush.webp",
			alt: "Aayush - CBSE Board Result 91.4%",
			name: "Aayush",
			pct: "91.4%",
		},
		{
			img: "/assets/webp/achievements/academic/allStudents/Lavisha.webp",
			alt: "Lavisha - CBSE Board Result 91.4%",
			name: "LAVISHA",
			pct: "91.4%",
		},
		{
			img: "/assets/webp/achievements/academic/allStudents/Gaurav.webp",
			alt: "Gaurav - CBSE Board Result 91.2%",
			name: "GAURAV",
			pct: "91.2%",
		},
		{
			img: "/assets/webp/achievements/academic/allStudents/Bhumika.webp",
			alt: "Bhumika - CBSE Board Result 90.8%",
			name: "BHUMIKA",
			pct: "90.8%",
		},
		{
			img: "/assets/webp/achievements/academic/allStudents/Chetan.webp",
			alt: "Chetan - CBSE Board Result 90.2%",
			name: "CHETAN",
			pct: "90.2%",
		},
		{
			img: "/assets/webp/achievements/academic/allStudents/Aalya.webp",
			alt: "Aalya - CBSE Board Result 90.2%",
			name: "AALYA",
			pct: "90.2%",
		},
		{
			img: "/assets/webp/achievements/academic/allStudents/Siksha.webp",
			alt: "Siksha - CBSE Board Result 90.2%",
			name: "SIKSHA",
			pct: "90.2%",
		},
	],
];

// National achiever cards (half-width, no team details)
const olympiadCards = [
	{
		img: "/assets/webp/achievements/academic/INTERNATIONAL ENGLISH OLYMPIAD.webp",
		title: "SOF - INTERNATIONAL ENGLISH OLYMPIAD (2022-23)",
		text: "Our young dreamers secured 14 Gold Medals of Excellence in International English Olympiad (2022- 2023) organised by Science Olympiad Foundation.",
	},
	{
		img: "/assets/webp/achievements/academic/INTERNATIONAL GENERAL KNOWLEDGE OLYMPIAD.webp",
		title: "SOF - INTERNATIONAL GENERAL KNOWLEDGE OLYMPIAD (2022-23)",
		text: "Our young dreamers secured 15 Gold Medals of Excellence in International General Knowledge Olympiad (2022-2023) organised by Science Olympiad Foundation.",
	},
	{
		img: "/assets/webp/achievements/academic/SOF INTERNATIONAL SCIENCE OLYMPIAD.webp",
		title: "SOF - INTERNATIONAL SCIENCE OLYMPIAD (2022-23)",
		text: "Our young dreamers secured Gold Medals of Excellence in International Science Olympiad (2022-2023) organised by Science Olympiad Foundation.",
	},
	{
		img: "/assets/webp/achievements/academic/SOF INTERNATIONAL SCIENCE OLYMPIAD 2024-25.webp",
		title: "SOF - INTERNATIONAL SCIENCE OLYMPIAD (2024-25)",
		text: "Our young dreamers secured Gold Medals of Excellence in International Science Olympiad (2024-2025) organised by Science Olympiad Foundation.",
	},
];

function AchievementCard({ img, alt, name, pct, highlight }) {
	return (
		<div className="col mb-3 mb-md-0">
			<div className="achievement-card">
				<img src={img} className="img-fluid rounded" alt={alt} width="100%" height="100%" />
				<div className="card-content">
					<p className={highlight ? "p-color" : undefined}>{name}</p>
					<p className={highlight ? "s-color" : undefined}>{pct}</p>
				</div>
			</div>
		</div>
	);
}

export default function AccomplishmentsAcademics() {
	return (
		<>
			<Seo title="Academic Accomplishments" />
			<PageBanner title="Academics Accomplishments" />

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
									<img className="img-fluid" src="/assets/webp/SISTransparentLogoWhite.webp" alt="Logo" />
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
							OUR CBSE BOARD RESULT
						</h2>
						<i className="fa-solid fa-minus" style={{ color: "#e3bf68", fontSize: "50px" }}></i>
						<p className="text-center">
							While we place holistic development of the child at the top in our pursuit to
							excellence, it is ensured that academic rigor is not defeated of its pristine
							position. The Scotts at all times has enjoyed the luxury of holding a fine sense of
							balance between academics and co-curricular activities and it has been our privilege
							to have students who fulfil our dreams. Our highfliers list is ever evolving every
							year.
						</p>
					</div>
					<div className="row">
						<div className="col mb-3">
							{topperRows.map((row, rowIndex) => (
								<div className="row" key={rowIndex}>
									{row.map((student) => (
										<AchievementCard key={student.name} {...student} />
									))}
								</div>
							))}
						</div>
						<div className="col mb-3">
							<div className="row h-100">
								{stats.map((stat) => (
									<div className="col-md-4 mb-3" key={stat.label}>
										<div className="stats-card">
											<h4 className="fs-1">{stat.value}</h4>
											<p>{stat.label}</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
					<div className="row">
						{allStudentRows.map((row, rowIndex) => (
							<div className="row" key={rowIndex}>
								{row.map((student) => (
									<AchievementCard key={student.img} {...student} />
								))}
								{rowIndex === allStudentRows.length - 1 && (
									<p
										className="text-end"
										style={{ fontSize: "1rem", fontWeight: "bold", color: "#e3bf68" }}
									>
										and Many More...
									</p>
								)}
							</div>
						))}
					</div>
				</div>
			</section>

			<section id="individual-awards" data-aos="fade-up">
				<div className="container">
					<div className="row" style={{ overflowX: "hidden" }}>
						<h2 className="text-uppercase text-center fs-1" style={{ color: "#654f4f" }}>
							National Achievers
						</h2>
						<i className="fa-solid fa-minus" style={{ color: "#e3bf68", fontSize: "50px" }}></i>
						{olympiadCards.slice(0, 2).map((card) => (
							<div className="col-md-6" key={card.title}>
								<div className="card mb-3">
									<div className="row g-0">
										<div className="col-md-5">
											<img src={card.img} alt="School Building" style={{ height: "100%", width: "100%" }} />
										</div>
										<div className="col-md-7">
											<div className="card-body">
												<h5 className="card-title p-color">{card.title}</h5>
												<p className="card-text text-body-secondary">{card.text}</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className="row">
						{olympiadCards.slice(2).map((card) => (
							<div className="col-md-6" key={card.title}>
								<div className="card mb-3">
									<div className="row g-0">
										<div className="col-md-5">
											<img src={card.img} alt="School Building" style={{ height: "100%", width: "100%" }} />
										</div>
										<div className="col-md-7">
											<div className="card-body">
												<h5 className="card-title p-color">{card.title}</h5>
												<p className="card-text text-body-secondary">{card.text}</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
						<div className="col-12">
							<div className="card mb-3">
								<div className="row g-0">
									<div className="col-md-5">
										<img
											src="/assets/webp/achievements/academic/YOUTH ENTREPRENEURHIPCHALLENGE.png"
											alt="School Building"
											style={{ height: "100%", width: "100%" }}
										/>
									</div>
									<div className="col-md-7">
										<div className="card-body">
											<h5 className="card-title p-color">
												YOUTH ENTREPRENEURSHIP CHALLENGE - 2023, IIT KANPUR
											</h5>
											<p className="card-text text-body-secondary">
												Our phenomenal Scottishians have once again dazzled with their
												entrepreneurial brilliance on the national stage, leaving an unforgettable
												impression. Among the top 10 teams, not just one but two of our outstanding
												teams pitched in the finale, proudly representing Haryana as the sole
												participants from our state in this prestigious competition.
											</p>
											<p className="card-text">
												<small className="text-body-secondary">
													Team Gaupatr (9th Achievers) -<br />
													Yash Lohan, Oshav Jindal
												</small>
												<br />
												<small className="text-body-secondary">
													Team Biostubble (12th Non-Med) -<br />
													Khushi, Chhavi, Himani
												</small>
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-12">
							<div className="card mb-3">
								<div className="row g-0">
									<div className="col-md-5">
										<img
											src="/assets/webp/achievements/academic/YOUTH IDEATHON.png"
											alt="School Building"
											style={{ height: "100%", width: "100%" }}
										/>
									</div>
									<div className="col-md-7">
										<div className="card-body">
											<h5 className="card-title p-color">
												YOUTH IDEATHON - 2023 INDIA'S BIGGEST IDEA FESTIVAL HELD AT IIT DELHI!
											</h5>
											<p className="card-text text-body-secondary">
												Our Scottishians made us proud by achieving a national-level achievement,
												showcasing entrepreneurial leadership excellence in YOUTH IDEATHON.
											</p>
											<p className="card-text">
												<small className="text-body-secondary">
													Team 1 (9th Achievers) -<br />
													Oshav Jindal, Jivitesh Sharma, Abhinav Singh, Yash Lohan
												</small>
												<br />
												<small className="text-body-secondary">
													Team 2 (11th Non-Med) -<br />
													Khushi, Vibhor, Garv Bhutani, Jyot
												</small>
												<br />
												<small className="text-body-secondary">
													Team 3 (12th Non-Med) -<br />
													Kalpit, Yogveer, Hemant
												</small>
											</p>
											<p className="card-text text-body-secondary">
												We secured slot in the Top 1000 teams out of 1,50,000+ registered! Out of
												7,50,000+ students nationwide, our future tycoons excelled with smart skills
												and dedication.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<link rel="stylesheet" href="/stylesheets/academicsAccomplishments.css" />
			<link rel="stylesheet" href="/stylesheets/page-title.css" />
			<style>{`
	@media (max-width: 770px) {
		td > #hundred-marks {
			margin-top: 6rem;
		}
		td > #hundred-marks-big-list {
			margin-top: 8rem;
		}
		td .img-fluid {
			max-width: 100%;
		}
		.banner-content-inner h1 {
			font-size: 1.9rem !important;
		}
	}

	.achievement-card {
		transition: transform 0.3s ease, box-shadow 0.3s ease;
		border-radius: 15px;
		overflow: hidden;
		background: white;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		margin-bottom: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.achievement-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
	}

	.achievement-card img {
		width: 60%;
		height: 60%;
		object-fit: fit;
		transition: transform 0.3s ease;
		display: block;
		margin: 0 auto;
	}

	.achievement-card:hover img {
		transform: scale(1.05);
	}

	.achievement-card .card-content {
		text-align: center;
		width: 100%;
	}

	.achievement-card .card-content p:first-child {
		font-weight: bold;
		color: #654f4f;
		margin-bottom: 5px;
	}

	.achievement-card .card-content p:last-child {
		color: #e3bf68;
		font-size: 1.2em;
	}

	.stats-card {
		transition: transform 0.3s ease, box-shadow 0.3s ease;
		border-radius: 15px;
		padding: 20px;
		background-color: #e3bf68;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.stats-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
	}

	.stats-card h4 {
		color: #654f4f;
		margin-bottom: 10px;
	}

	.stats-card p {
		color: #654f4f;
		margin: 0;
	}
			`}</style>
		</>
	);
}
