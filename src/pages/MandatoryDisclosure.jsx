import Seo from "../components/Seo.jsx";
import PageBanner from "../components/PageBanner.jsx";
import site from "../config/site.js";

const pdfButtonStyle = {
	color: "#980606",
	borderRadius: 0,
	borderColor: "#980606",
	transition: "all 0.5s ease-in-out",
};

function PdfButton({ href, label = "View PDF" }) {
	return (
		<a
			href={href}
			className="btn mt-2"
			style={pdfButtonStyle}
			target="_blank"
			rel="noreferrer"
			onMouseOver={(e) => {
				e.currentTarget.style.backgroundColor = "#c7bebe";
				e.currentTarget.style.color = "#980606";
			}}
			onMouseOut={(e) => {
				e.currentTarget.style.backgroundColor = "white";
				e.currentTarget.style.color = "#980606";
			}}
		>
			{label}
		</a>
	);
}

const generalInfo = [
	["1.", "NAME OF THE SCHOOL", site.fullName],
	["2.", "AFFILIATION NO.(IF APPLICABLE)", "532077"],
	["3.", "SCHOOL CODE (IF APPLICABLE)", "42093"],
	[
		"4.",
		"COMPLETE ADDRESS WITH PIN CODE",
		"IN FRONT OF AADHAR HOSPITAL SOUTH BYPASS VILLAGE SATROAD KHURD DISTRICT AND TEHSIL HISAR HARYANA",
	],
	["5.", "UDISE CODE", "06124100702"],
	["6.", "PRINCIPAL NAME & QUALIFICATION:", "Mrs. Seema Arora"],
	["7.", "SCHOOL EMAIL ID", site.contactEmail],
	["8.", "CONTACT DETAILS (LANDLINE/MOBILE)", site.phonePrimary],
];

const documentsInfo = [
	[
		"1.",
		"COPIES OF AFFILIATION/UPGRADATION LETTER AND RECENT EXTENSION OF AFFILIATION, IF ANY",
		"assets/pdf/9_TO_12_recognition.pdf",
	],
	[
		"2.",
		"COPIES OF SOCIETIES/TRUST/COMPANY REGISTRATION/RENEWAL CERTIFICATE, AS APPLICABLE",
		"assets/pdf/trust.pdf",
	],
	[
		"3.",
		"COPIES OF RECOGNITION CERTIFICATE UNDER RTE ACT, 2009, AND IT'S RENEWAL IF APPLICABLE Class 1st TO 12th",
		"assets/pdf/recognition_1_to_12th.pdf",
	],
	[
		"4.",
		"COPY OF NO OBJECTION CERTIFICATE (NOC) ISSUED, IF APPLICABLE, BY THE STATE GOVT./UT Class 1st to 12th",
		"assets/pdf/NOC_1st_to_12th.pdf",
	],
	[
		"5.",
		"COPY OF VALID BUILDING SAFETY CERTIFICATE AS PER THE NATIONAL BUILDING CODE",
		"assets/pdf/building.pdf",
	],
	[
		"6.",
		"COPY OF VALID FIRE SAFETY CERTIFICATE ISSUED BY THE COMPETENT AUTHORITY:",
		"assets/pdf/Fire.pdf",
	],
	[
		"7.",
		"COPY OF THE DEO CERTIFICATE SUBMITTED BY THE SCHOOL FOR AFFILIATION/UPGRADATION/EXTENSION OF AFFILIATIONOR SELF CERTIFICATION BY SCHOOL",
		"assets/pdf/deo.pdf",
	],
	[
		"8.",
		"COPIES OF VALID WATER, HEALTH AND SANITATION CERTIFICATES",
		"assets/pdf/Sanitation and hygienic.pdf",
	],
	["9.", "COPIES OF VALID LAND CERTIFICATES", "assets/pdf/land-certificate.pdf"],
	["10.", "MANDATORY PUBLIC DISCLOSURE", "assets/pdf/Mandatory-Disclosure.pdf"],
	[
		"11.",
		"MANDATORY PUBLIC DISCLOSURE",
		"assets/pdf/Mandatory Disclosure Details _ SARAS 7.0.pdf",
	],
];

const resultAndAcademics = [
	["1.", "FEE STRUCTURE OF THE SCHOOL", "assets/pdf/fee.pdf"],
	["2.", "ANNUAL ACADEMIC CALANDER", "assets/pdf/annual.pdf"],
	["3.", "Last Three Years Academic Results", "assets/pdf/lastthreeyearresult.pdf"],
	["4.", "LIST OF SCHOOL MANAGEMENT COMMITTEE (SMC)", "assets/pdf/smc.pdf"],
	["5.", "LIST OF PARENTS TEACHERS ASSOCIATION (PTA) MEMBERS", "assets/pdf/pta.pdf"],
	["6.", "NOC", "assets/pdf/NOC.pdf"],
];

const staffTeaching = [
	["1.", "PRINCIPAL", "1"],
	["2.", "TOTAL NO. OF TEACHERS", "82"],
	["3.", "TEACHERS SECTION RATIO", "1.5"],
	["4.", "DETAILS OF SPECIAL EDUCATOR", "1"],
	["5.", "DETAILS OF COUNSELLOR AND WELLNESS TEACHER", "1"],
];

const infrastructure = [
	["1.", "TOTAL CAMPUS AREA OF THE SCHOOL (IN SQUARE MTR)", "11128"],
	["2.", "NO. AND SIZE OF THE CLASSROOMS (IN SQ MTR)", "40 (500 Sq Ft.)"],
	["3.", "NO. AND SIZE OF LABORATORIES INCLUDING COMPUTER", "7"],
	["4.", "INTERNET FACILITY (Y/N)", "YES"],
	["5.", "NO. OF GIRLS TOILETS", "24"],
	["6.", "NO. OF BOYS TOILETS", "24"],
];

const headerRowStyle = { backgroundColor: "#654f4f" };

const sectionTitleStyle = {
	visibility: "visible",
	animationDuration: "1.5s",
	animationDelay: "0.2s",
	animationName: "fadeInUp",
};

export default function MandatoryDisclosure() {
	return (
		<>
			<Seo title="Mandatory Disclosure" />
			<PageBanner title="Mandatory Disclosure" />
			<div className="container-fuild" data-aos="fade-up">
				<div className="row">
					<section className="inner-entry">
						<div className="container">
							<div className="mainTitle">
								<p className="title-branding mb-2">
									<img
										className="img-fluid"
										src="/assets/webp/SISTransparentLogoWhite.webp"
										alt="logo"
									/>
								</p>
								<h2>Mandatory Disclosure</h2>
							</div>
						</div>
					</section>
				</div>
			</div>
			<section className="section table-section academics-table pt-5">
				<div className="container">
					<div className="row" data-aos="fade-up">
						<div className="table-custom table-responsive p-0" style={{ overflowX: "auto" }}>
							<div
								className="section-title wow fadeInUp"
								data-wow-duration="1.5s"
								data-wow-delay=".2s"
								style={sectionTitleStyle}
							>
								<h2 className="p-color">General Information</h2>
							</div>
							<div className="row justify-content-center">
								<div className="col-md-10 col-12">
									<table className="table table-bordered border-black">
										<tbody>
											<tr className="text-uppercase text-white" style={headerRowStyle}>
												<td>
													<b>S.No.</b>
												</td>
												<td>
													<b>Information</b>
												</td>
												<td>
													<b>Uploaded Details</b>
												</td>
											</tr>
											{generalInfo.map(([sno, info, details]) => (
												<tr key={sno}>
													<td>{sno}</td>
													<td>{info}</td>
													<td className={sno === "7." ? "text-uppercase" : undefined}>
														{details}
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
					<div className="row" data-aos="fade-up">
						<div className="table-custom table-responsive p-0" style={{ overflowX: "auto" }}>
							<div
								className="section-title wow fadeInUp"
								data-wow-duration="1.5s"
								data-wow-delay=".2s"
								style={sectionTitleStyle}
							>
								<h2 className="p-color">DOCUMENTS AND INFORMATION</h2>
							</div>
							<div className="row justify-content-center">
								<div className="col-md-10 col-12">
									<table className="table table-bordered border-black">
										<tbody>
											<tr className="text-uppercase text-white" style={headerRowStyle}>
												<td>
													<b>S.No.</b>
												</td>
												<td>
													<b>Documents/Information</b>
												</td>
												<td>
													<b>Uploaded Details</b>
												</td>
											</tr>
											{documentsInfo.map(([sno, info, href]) => (
												<tr key={sno}>
													<td>{sno}</td>
													<td>{info}</td>
													<td>
														<PdfButton href={href} />
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
					<div className="row" data-aos="fade-up">
						<div className="table-custom table-responsive p-0" style={{ overflowX: "auto" }}>
							<div
								className="section-title wow fadeInUp"
								data-wow-duration="1.5s"
								data-wow-delay=".2s"
								style={sectionTitleStyle}
							>
								<h2 className="p-color">RESULT AND ACADEMICS</h2>
							</div>
							<div className="row justify-content-center">
								<div className="col-md-10 col-12">
									<table className="table table-bordered border-black">
										<tbody>
											<tr className="text-uppercase text-white" style={headerRowStyle}>
												<td>
													<b>S.No.</b>
												</td>
												<td>
													<b>Information</b>
												</td>
												<td>
													<b>Uploaded Details</b>
												</td>
											</tr>
											{resultAndAcademics.map(([sno, info, href]) => (
												<tr key={sno}>
													<td>{sno}</td>
													<td>{info}</td>
													<td>
														<PdfButton href={href} />
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
					<div className="row" data-aos="fade-up">
						<div className="table-custom table-responsive p-0" style={{ overflowX: "auto" }}>
							<div className="section-title">
								<h2 className="p-color">STAFF (TEACHING)</h2>
							</div>
							<div className="row justify-content-center">
								<div className="col-md-10 col-12">
									<table className="table table-bordered border-black">
										<tbody>
											<tr className="text-uppercase text-white" style={headerRowStyle}>
												<td>
													<b>S.No.</b>
												</td>
												<td>
													<b>Information</b>
												</td>
												<td>
													<b>DETAILS</b>
												</td>
											</tr>
											{staffTeaching.map(([sno, info, details]) => (
												<tr key={sno}>
													<td>{sno}</td>
													<td>{info}</td>
													<td>{details}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
					<div className="row" data-aos="fade-up">
						<div className="table-custom table-responsive p-0" style={{ overflowX: "auto" }}>
							<div className="section-title">
								<h2 className="p-color">SCHOOL INFRASTRUCTURE</h2>
							</div>
							<div className="row justify-content-center">
								<div className="col-md-10 col-12">
									<table className="table table-bordered border-black">
										<tbody>
											<tr className="text-uppercase text-white" style={headerRowStyle}>
												<td>
													<b>S.No.</b>
												</td>
												<td>
													<b>Information</b>
												</td>
												<td>
													<b>DETAILS</b>
												</td>
											</tr>
											{infrastructure.map(([sno, info, details]) => (
												<tr key={sno}>
													<td>{sno}</td>
													<td>{info}</td>
													<td>{details}</td>
												</tr>
											))}
											<tr>
												<td>7.</td>
												<td>
													LINK OF YOUTUBE VIDEO OF THE INSPECTION OF SCHOOL COVERING THE
													INFRASTRUCTURE OF THE SCHOOL
												</td>
												<td>
													<PdfButton
														href="https://www.youtube.com/watch?v=3ETdHARlc28"
														label="View"
													/>
												</td>
											</tr>
											<tr>
												<td>8.</td>
												<td>NUMBER OF AUDITORIUMS</td>
												<td>1</td>
											</tr>
											<tr>
												<td>9.</td>
												<td>DIGITALISE LIBRARY</td>
												<td>1</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<link rel="stylesheet" href="/stylesheets/page-title.css" />
			<link rel="stylesheet" href="/stylesheets/academicsAccomplishments.css" />
			<link rel="stylesheet" href="/stylesheets/button.css" />
			<style>{`
	.table-custom .table tr td {
		font-size: 0.7rem;
	}
`}</style>
		</>
	);
}
