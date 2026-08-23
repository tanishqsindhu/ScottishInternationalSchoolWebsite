import { NavLink, Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@workspace/ui/components/button";
import site from "../config/site.js";
import "./navbar.css";

const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export default function Navbar() {
	return (
		<nav className="navbar navbar-expand-lg fixed-top custom-navbar">
			<div className="container-fluid">
				{/* Logo & Brand */}
				<Link className="navbar-brand d-flex align-items-center" to="/">
					<img src={site.logoUrl} alt={`${site.fullName} Logo`} width="30" height="24" />
					<span className="ms-2 brand-text">
						<span className="brand-name">{site.name}</span>
						<span className="brand-subtext">{site.subtext}</span>
					</span>
				</Link>

				{/* Mobile Toggle Button */}
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNavDropdown"
					aria-controls="navbarNavDropdown"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				{/* Navbar Links */}
				<div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
					<ul className="navbar-nav">
						<li className="nav-item">
							<NavLink className="nav-link" to="/academics">
								Academics
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/admission">
								Admissions
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/about-us">
								About Us
							</NavLink>
						</li>

						{/* Beyond Classroom Dropdown */}
						<li className="nav-item dropdown">
							<a
								className="nav-link dropdown-toggle"
								href="#"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								Beyond Classroom
							</a>
							<ul className="dropdown-menu">
								<li>
									<Link className="dropdown-item" to="/beyond-classroom/sports">
										Sports
									</Link>
								</li>
							</ul>
						</li>

						{/* Accomplishments Dropdown */}
						<li className="nav-item dropdown">
							<a
								className="nav-link dropdown-toggle"
								href="#"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								Accomplishments
							</a>
							<ul className="dropdown-menu">
								<li>
									<Link className="dropdown-item" to="/accomplishments/academics">
										Academics
									</Link>
								</li>
							</ul>
						</li>

						<li className="nav-item">
							<NavLink className="nav-link" to="/news-events">
								News
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/gallery">
								Gallery
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/contact-us">
								Contact Us
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/mandatory-disclosure">
								Mandatory Disclosure
							</NavLink>
						</li>
						{clerkKey && (
							<li className="nav-item d-flex align-items-center ms-lg-2">
								<SignedIn>
									<UserButton afterSignOutUrl="/" />
								</SignedIn>
								<SignedOut>
									<SignInButton mode="modal">
										<Button variant="ghost" size="sm">
											Sign In
										</Button>
									</SignInButton>
								</SignedOut>
							</li>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
}
