import Seo from "../components/Seo.jsx";
import PageBanner from "../components/PageBanner.jsx";
import site from "../config/site.js";

const MAGAZINE_PDF = "/assets/pdf/Scottish International SchoolMagazine.pdf";

export default function Magazine() {
	return (
		<>
			<Seo title="School Magazine" />
			<PageBanner title="School Magazine" />

			<div className="page-content">
				<section className="magazine-section py-5">
					<div className="container">
						<div className="row justify-content-center mb-4">
							<div className="col-lg-8 text-center" data-aos="fade-up">
								<h2 className="section-title mb-3">{site.fullName} Magazine</h2>
								<p className="text-muted">
									Explore our school magazine featuring student achievements, events, and memorable moments.
								</p>
								<a
									href={MAGAZINE_PDF}
									download="Scottish-International-School-Magazine.pdf"
									className="btn btn-primary btn-lg mt-3"
								>
									<i className="fa-solid fa-download me-2"></i> Download Magazine
								</a>
							</div>
						</div>

						<div className="row justify-content-center" data-aos="fade-up" data-aos-delay="200">
							<div className="col-12">
								<div className="pdf-viewer-container">
									<iframe src={MAGAZINE_PDF} className="pdf-viewer" title={`${site.fullName} Magazine`}></iframe>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>

			<style>{`
	.magazine-section {
		background-color: #f8f9fa;
	}

	.section-title {
		color: #1a365d;
		font-weight: 700;
	}

	.pdf-viewer-container {
		background: #fff;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		padding: 20px;
		overflow: hidden;
	}

	.pdf-viewer {
		width: 100%;
		height: 80vh;
		border: none;
		border-radius: 8px;
	}

	.btn-primary {
		background-color: #1a365d;
		border-color: #1a365d;
		padding: 12px 30px;
		font-weight: 600;
		transition: all 0.3s ease;
	}

	.btn-primary:hover {
		background-color: #eabd57;
		border-color: #eabd57;
		color: #1a365d;
		transform: translateY(-2px);
	}

	@media (max-width: 768px) {
		.pdf-viewer {
			height: 60vh;
		}
	}
`}</style>

			<link rel="stylesheet" href="/stylesheets/contact-us.css" />
		</>
	);
}
