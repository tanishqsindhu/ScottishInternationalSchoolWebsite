import { useState, useRef } from "react";
import Seo from "../components/Seo.jsx";
import PageBanner from "../components/PageBanner.jsx";
import Recaptcha from "../components/Recaptcha.jsx";
import { api } from "../lib/api.js";
import { useFlash } from "../context/FlashContext.jsx";

export default function UnsubscribeEmail() {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const recaptchaRef = useRef(null);
	const { flash } = useFlash();

	async function handleSubmit(e) {
		e.preventDefault();
		if (!e.target.checkValidity()) {
			e.target.classList.add("was-validated");
			return;
		}
		setLoading(true);
		try {
			const res = await api.post("/newsletter", {
				email,
				action: "unsubscribe",
				recaptcha: recaptchaRef.current?.getResponse(),
			});
			flash("success", res.message);
			setEmail("");
			e.target.classList.remove("was-validated");
			recaptchaRef.current?.reset();
		} catch (err) {
			flash("error", err.message);
		} finally {
			setLoading(false);
		}
	}

	return (
		<>
			<Seo title="News Letter" />
			<PageBanner title="News Letter" />

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
									<img className="img-fluid" src="/assets/webp/SISTransparentLogoWhite.webp" alt="Logo" />
								</p>
								<h2></h2>
							</div>
						</div>
					</section>
				</div>
			</div>
			<section>
				<div className="container mt-2" style={{ marginBottom: "200px" }}>
					<div className="border rounded border-0 border-light d-flex flex-column justify-content-between align-items-center flex-lg-row p-2 p-lg-3">
						<div className="text-center text-lg-start py-3 py-lg-1">
							<h2 className="fw-bold mb-2">
								<strong>Unsubscribing From</strong>
							</h2>
							<p className="mb-0">Getting latest Information.</p>
						</div>
						<form
							className="d-flex justify-content-center flex-wrap my-2 validated-form"
							noValidate
							onSubmit={handleSubmit}
						>
							<div className="my-2">
								<input
									className="form-control"
									type="email"
									name="email"
									placeholder="Your Email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
							<Recaptcha ref={recaptchaRef} />
							<div className="my-2">
								<button className="btn btn-danger ms-sm-2" type="submit" disabled={loading}>
									{loading ? "Processing..." : "Unsubscribe"}
								</button>
							</div>
						</form>
					</div>
				</div>
			</section>
			<link rel="stylesheet" href="/stylesheets/fixedSocial.css" />
			<link rel="stylesheet" href="/stylesheets/contact-us.css" />
			<link rel="stylesheet" href="/stylesheets/page-title.css" />
		</>
	);
}
