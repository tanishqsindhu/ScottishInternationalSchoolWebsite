import { useEffect, useState } from "react";
import Seo from "../components/Seo.jsx";
import PageBanner from "../components/PageBanner.jsx";
import site from "../config/site.js";
import { api } from "../lib/api.js";

// The EJS view always showed the General Application card (jobs.length === 0 || true),
// so the fetched jobs list is kept as a fallback for when specific openings are published.
const SHOW_GENERAL_APPLICATION = true;
const APPLY_FORM_URL = "https://forms.gle/DCK6BtgjZSvcsHzs5";

export default function Jobs() {
	const [jobs, setJobs] = useState([]);

	useEffect(() => {
		if (SHOW_GENERAL_APPLICATION) return;
		api
			.get("/jobs")
			.then((data) => setJobs(data.jobs || []))
			.catch(() => setJobs([]));
	}, []);

	return (
		<>
			<Seo title="Jobs" />
			<PageBanner title="Jobs" />

			<div className="container-fuild">
				<div className="row" data-aos="fade-up">
					<section className="inner-entry" style={{ overflowX: "hidden" }}>
						<div className="container">
							<div className="mainTitle">
								<p className="title-branding mb-2">
									<img className="img-fluid" src="/assets/webp/SISTransparentLogoWhite.webp" alt="Logo" />
								</p>
								<h2>Current Job Opening</h2>
							</div>
						</div>
					</section>
				</div>
			</div>

			<div className="container">
				<div className="row justify-content-center m-5" data-aos="fade-up">
					{SHOW_GENERAL_APPLICATION || jobs.length === 0 ? (
						<div className="col-12 d-flex justify-content-center" style={{ height: "100%" }}>
							<div className="card shadow" data-aos="fade-up">
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
												className="d-block w-100 rounded-top carousel-img"
												alt="School Building"
											/>
										</div>
										<div className="carousel-item" data-bs-interval="3000">
											<img
												src="https://res.cloudinary.com/djfy7fvq1/image/upload/w_1500/q_auto/f_auto/v1741596937/naqc1fiijnhbap3jmyr8.webp"
												className="d-block w-100 rounded-top carousel-img"
												alt="School Building"
											/>
										</div>
									</div>
								</div>
								<div className="card-body">
									<h4 className="card-title text-center fs-2 bold p-color">General Application</h4>
									<p className="card-text m-3 p-color">
										Thank you for your interest in joining {site.fullName}. Please fill out
										this application form carefully. Ensure all details are accurate before submission.
										<br />
										<strong>Salary no bar for deserving candidates.</strong>
										<br />
										<strong> Requirements:</strong>
										<br />
										📌 Fluency in English Language should be excellent.
										<br />
										📌 Qualifications as per CBSE norms.
										<br />
										📌 Teaching experience of 3 To 4 years with adequate computer literacy.
										<br />
										📌 Passion for education and student development
										<br />
										<span className="text-muted">
											We will review your application and contact you if you are shortlisted.
											<br />
											For any inquiries, please reach out to {site.contactEmail} or {site.phonePrimary}.
										</span>
									</p>
									<a
										href={APPLY_FORM_URL}
										target="_blank"
										rel="noopener noreferrer"
										className="btn btn-outline-warning w-100"
									>
										To Apply Click Here
									</a>
								</div>
							</div>
						</div>
					) : (
						jobs.map((job, index) => (
							<div className="col-7" key={index}>
								<p>
									<a
										data-bs-toggle="collapse"
										style={{ color: "black" }}
										href={`#job${index}`}
										role="button"
										aria-expanded="false"
										aria-controls={`job${index}`}
									>
										<h2>
											<i className="fa-solid fa-chevron-down"></i> {job.title}
										</h2>
									</a>
								</p>
								<div className="collapse" id={`job${index}`}>
									<div>
										<h3>Responsibilities:</h3>
										<ul style={{ listStyleType: "circle" }}>
											{job.responsibilities?.map((responsibility, i) => (
												<li style={{ marginLeft: "25px" }} key={i}>
													{responsibility}
												</li>
											))}
										</ul>
										<br />
										<h3>Requirements:</h3>
										<ul style={{ listStyleType: "circle" }}>
											{job.requirements?.map((requirement, i) => (
												<li style={{ marginLeft: "25px" }} key={i}>
													{requirement}
												</li>
											))}
										</ul>
										<br />
										<a href={job.applyLink} style={{ fontSize: "24px" }}>
											To apply Click Here
										</a>
									</div>
								</div>
							</div>
						))
					)}
				</div>
			</div>
			<style>{`
	.carousel-img {
		height: 300px; /* Adjust height as needed */
		object-fit: cover; /* Ensures images fit properly without stretching */
	}
`}</style>
			<link rel="stylesheet" href="/stylesheets/contact-us.css" />
			<link rel="stylesheet" href="/stylesheets/page-title.css" />
			<link rel="stylesheet" href="/stylesheets/about-us.css" />
		</>
	);
}
