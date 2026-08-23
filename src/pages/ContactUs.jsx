import { useEffect, useRef, useState } from "react";
import Seo from "../components/Seo.jsx";
import PageBanner from "../components/PageBanner.jsx";
import Recaptcha from "../components/Recaptcha.jsx";
import { api } from "../lib/api.js";
import { useFlash } from "../context/FlashContext.jsx";
import site from "../config/site.js";

const emptyForm = { name: "", email: "", phone: "", message: "" };

export default function ContactUs() {
	const { flash } = useFlash();
	const [form1, setForm1] = useState(emptyForm);
	const [form2, setForm2] = useState(emptyForm);
	const recaptcha1Ref = useRef(null);
	const recaptcha2Ref = useRef(null);

	// Re-implementation of the page's inline collapse script:
	// close other collapses when opening one, toggle the +/- icon, smooth-scroll.
	useEffect(() => {
		const cleanups = [];

		document.querySelectorAll(".collapseButton").forEach((btn) => {
			const onClick = function () {
				const targetId = this.getAttribute("href");
				const targetCollapse = document.querySelector(targetId);

				// If the clicked collapse is not open, close all others first
				if (targetCollapse && !targetCollapse.classList.contains("show")) {
					document.querySelectorAll(".collapse").forEach((collapse) => {
						if (collapse !== targetCollapse) {
							collapse.classList.remove("show");
							const otherIcon = document.querySelector(`[href="#${collapse.id}"] .text-danger`);
							if (otherIcon) otherIcon.textContent = "+";
						}
					});
				}

				// Scroll to the clicked section smoothly when opening
				const offset = this.getBoundingClientRect().top + window.scrollY - 250; // Adjust 250px for better visibility
				window.scrollTo({ top: offset, behavior: "smooth" });
			};
			btn.addEventListener("click", onClick);
			cleanups.push(() => btn.removeEventListener("click", onClick));
		});

		// Listen for Bootstrap collapse events to toggle icon
		document.querySelectorAll(".collapse").forEach((collapse) => {
			const onShow = function () {
				const btn = document.querySelector(`[href="#${this.id}"] .text-danger`);
				if (btn) btn.textContent = "-";
			};
			const onHidden = function () {
				const btn = document.querySelector(`[href="#${this.id}"] .text-danger`);
				if (btn) btn.textContent = "+";
			};
			collapse.addEventListener("show.bs.collapse", onShow);
			collapse.addEventListener("hidden.bs.collapse", onHidden);
			cleanups.push(() => {
				collapse.removeEventListener("show.bs.collapse", onShow);
				collapse.removeEventListener("hidden.bs.collapse", onHidden);
			});
		});

		return () => cleanups.forEach((fn) => fn());
	}, []);

	const makeSubmit = (form, setForm, recaptchaRef, branch) => async (e) => {
		e.preventDefault();
		if (!e.target.checkValidity()) {
			e.target.classList.add("was-validated");
			return;
		}
		e.target.classList.add("was-validated");
		try {
			const res = await api.post("/contact", {
				user: { ...form, branch },
				recaptcha: recaptchaRef.current?.getResponse(),
			});
			flash("success", res.message);
			setForm(emptyForm);
			recaptchaRef.current?.reset();
			e.target.classList.remove("was-validated");
		} catch (err) {
			flash("error", err.message);
		}
	};

	const renderForm = (form, setForm, recaptchaRef, branch, onSubmit) => (
		<form
			className="border rounded shadow p-3 p-md-4 p-lg-5 validated-form"
			noValidate
			onSubmit={onSubmit}
			style={{ background: "var(--bs-body-bg)" }}
		>
			<h3 className="text-center mb-3 text-uppercase p-color">Leave a message/Enquiry</h3>
			<div className="mb-3">
				<input
					className="form-control"
					type="text"
					name="user[name]"
					placeholder="Name"
					required
					value={form.name}
					onChange={(e) => setForm({ ...form, name: e.target.value })}
				/>
			</div>
			<div className="mb-3">
				<input
					className="form-control"
					type="email"
					name="user[email]"
					placeholder="Email"
					required
					value={form.email}
					onChange={(e) => setForm({ ...form, email: e.target.value })}
				/>
			</div>
			<div className="mb-3">
				<input
					className="form-control"
					type="number"
					name="user[phone]"
					placeholder="Phone Number"
					required
					value={form.phone}
					onChange={(e) => setForm({ ...form, phone: e.target.value })}
				/>
			</div>
			<input type="hidden" name="user[branch]" value={branch} readOnly />
			<div className="mb-3">
				<textarea
					className="form-control"
					name="user[message]"
					placeholder="Message"
					rows="6"
					required
					value={form.message}
					onChange={(e) => setForm({ ...form, message: e.target.value })}
				></textarea>
			</div>
			<Recaptcha ref={recaptchaRef} />
			<div className="mb-3">
				<button className="btn btn-primary w-100" type="submit">
					Send
				</button>
			</div>
		</form>
	);

	const renderAddress = (branch) => (
		<div
			className="border rounded shadow p-3 p-md-4 p-lg-5"
			style={{ background: "var(--bs-body-bg)" }}
		>
			<div className="row">
				<div className="col p-0">
					<address className="address-wrap text-center">
						<div className="form-group p-0">
							<i className="fa-solid fa-map-pin"></i>
							<p>
								<b>Location</b>
								<a
									href={branch.mapUrl}
									target="_blank"
									aria-label="maps link"
									rel="noopener noreferrer"
								>
									{site.fullName} <br />
									{branch.address}
								</a>
							</p>
						</div>
						<div className="form-group p-0">
							<i className="fa-solid fa-mobile-button fa-shake"></i>
							<p className="mb-0">
								<b>Office</b>
								<a href={`tel:${branch.phone.replace(/\s/g, "")}`}>{branch.phone}</a>
							</p>
							<p>(09:30 AM to 06:00 PM)</p>
						</div>
						<div className="form-group p-0">
							<i className="fa-solid fa-at fa-beat"></i>
							<p>
								<b>Email</b>
								<a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
							</p>
						</div>
					</address>
				</div>
			</div>
		</div>
	);

	return (
		<>
			<Seo title="Contact Us" />
			<PageBanner title="Contact us" />
			<div className="container-fluid mt-5 d-flex" style={{ minHeight: "30vh" }}>
				<div className="row w-100 align-self-center">
					<div
						className="row border-top border-bottom border-2"
						style={{ borderColor: "#421b1d", height: "fit-content" }}
					>
						<p className="d-inline-flex gap-1 mb-0">
							<a
								className="p-color collapseButton fs-4"
								data-bs-toggle="collapse"
								href="#collapseBranch1"
								role="button"
								aria-expanded="false"
								aria-controls="collapseExample"
								style={{ color: "#e2b264" }}
							>
								<span id="collapseIcon" className="me-4 me-md-5 text-danger">
									{" "}
									+{" "}
								</span>
								Sector 16 &amp; 17 Branch
							</a>
						</p>
						<div className="collapse my-4" id="collapseBranch1">
							<div className="">
								<div className="row justify-content-center">
									<div className="col-12 col-md-4 m-2 p-0 p-lg-2">
										{renderForm(
											form1,
											setForm1,
											recaptcha1Ref,
											site.branches[0].name,
											makeSubmit(form1, setForm1, recaptcha1Ref, site.branches[0].name)
										)}
									</div>
									<div className="mt-3 mt-md-2 col-12 col-md-7 m-2 p-0 p-lg-2">
										<iframe
											className="rounded"
											src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d871.468638064983!2d75.7270787927539!3d29.127879401045508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f14.1!3m3!1m2!1s0x39123345c6b63d4f%3A0x541ada9d1c5f86e3!2sScottish%20International%20School!5e0!3m2!1sen!2sge!4v1740305838725!5m2!1sen!2sge"
											width="100%"
											height="100%"
											style={{ minHeight: "22rem", border: 0 }}
											allowFullScreen
											referrerPolicy="no-referrer-when-downgrade"
											title="Branch 1 map"
										></iframe>
									</div>
									<div className="mt-3 mt-md-0 col col-lg-11 m-md-3 p-0" id="address-container">
										{renderAddress(site.branches[0])}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div
						className="row border-bottom border-2"
						style={{ borderColor: "#421b1d", height: "fit-content" }}
					>
						<p className="d-inline-flex gap-1 mb-0">
							<a
								className="p-color collapseButton fs-4"
								data-bs-toggle="collapse"
								href="#collapseBranch2"
								role="button"
								aria-expanded="false"
								aria-controls="collapseExample"
								style={{ color: "#e2b264" }}
							>
								<span id="collapseIcon" className="me-4 me-md-5 text-danger">
									+
								</span>{" "}
								South Bypass Branch
							</a>
						</p>
						<div className="my-4" id="collapseBranch2">
							<div className="">
								<div className="row justify-content-center">
									<div className="col-12 col-md-4 m-2 p-0 p-lg-2">
										{renderForm(
											form2,
											setForm2,
											recaptcha2Ref,
											site.branches[1].name,
											makeSubmit(form2, setForm2, recaptcha2Ref, site.branches[1].name)
										)}
									</div>
									<div className="mt-3 mt-md-2 col-12 col-md-7 m-2 p-0 p-lg-2">
										<iframe
											className="rounded"
											src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1953.893533401175!2d75.7592240642523!3d29.11478487957678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f8.1!3m3!1m2!1s0x391235f392de30f3%3A0x4d822866aca9a6de!2sScottish%20International%20School!5e1!3m2!1sen!2sge!4v1740307963106!5m2!1sen!2sge"
											width="100%"
											height="100%"
											style={{ minHeight: "22rem", border: 0 }}
											allowFullScreen
											referrerPolicy="no-referrer-when-downgrade"
											title="Branch 2 map"
										></iframe>
									</div>
									<div className="mt-3 mt-md-0 col col-lg-11 m-md-3 p-0" id="address-container">
										{renderAddress(site.branches[1])}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<link rel="stylesheet" href="/stylesheets/contact-us.css" />
				<style>{`
		.address-wrap {
			font-size: 2rem;
		}
		.address-wrap a {
			text-decoration: underline;
		}
		.address-wrap a:hover {
			color: #e2b264;
		}
	`}</style>
			</div>
		</>
	);
}
