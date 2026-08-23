import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AOS from "aos";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import FixedSocials from "./FixedSocials.jsx";
import Flash from "./Flash.jsx";
import { FlashProvider } from "../context/FlashContext.jsx";

export default function Layout() {
	const { pathname } = useLocation();

	useEffect(() => {
		AOS.init({ offset: 150, duration: 800, delay: 150, mirror: true });
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
		AOS.refreshHard();
	}, [pathname]);

	return (
		<FlashProvider>
			<Navbar />
			<main className="flex-grow-1">
				<FixedSocials />
				<Flash />
				<Outlet />
			</main>
			<Footer />
		</FlashProvider>
	);
}
