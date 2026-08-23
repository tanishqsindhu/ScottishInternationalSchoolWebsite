import Seo from "../../components/Seo.jsx";
import PageBanner from "../../components/PageBanner.jsx";

export default function BeyondClassroomCoCurricular() {
	return (
		<>
			<Seo title="Co-Curricular" />
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
								<h2>Co-Curricular</h2>
							</div>
						</div>
					</section>
				</div>
				<div className="container">
					<div className="row" data-aos="fade-up">
						<div className="col py-5">
							<p className="text">
								A vibrant co-curricular programme combine to educate and develop a child
								holistically. There are more than several activities for students to choose from
								and these in turn help students to express themselves, find themselves, outside the
								classroom.
							</p>

							<p className="text">
								Co-curricular pursuits include quizzing, debating, elocution, dramatics,
								photography, fine art, Hindi writing, English writing, chess club, science club,
								dance club among yet others!
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
						<div className="col m-2 p-2" style={{ height: "450px" }}>
							<img
								className="rounded"
								src="/assets/webp/Sports infrastructure.webp"
								alt=""
								style={{ width: "100%", height: "100%" }}
							/>
						</div>
					</div>
				</div>
			</div>

			<link rel="stylesheet" href="/stylesheets/contact-us.css" />
			<link rel="stylesheet" href="/stylesheets/page-title.css" />
		</>
	);
}
