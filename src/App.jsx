import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Academics from "./pages/Academics.jsx";
import Admissions from "./pages/Admissions.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Gallery from "./pages/Gallery.jsx";
import Jobs from "./pages/Jobs.jsx";
import Magazine from "./pages/Magazine.jsx";
import MandatoryDisclosure from "./pages/MandatoryDisclosure.jsx";
import TermsConditions from "./pages/TermsConditions.jsx";
import PrincipalMessage from "./pages/PrincipalMessage.jsx";
import DirectorMessage from "./pages/DirectorMessage.jsx";
import BeyondClassroom from "./pages/beyondClassroom/BeyondClassroom.jsx";
import BeyondClassroomSports from "./pages/beyondClassroom/Sports.jsx";
import BeyondClassroomCoCurricular from "./pages/beyondClassroom/CoCurricular.jsx";
import AccomplishmentsAcademics from "./pages/accomplishments/Academics.jsx";
import AccomplishmentsSports from "./pages/accomplishments/Sports.jsx";
import AccomplishmentsCoCurricular from "./pages/accomplishments/CoCurricular.jsx";
import NewsAndEvents from "./pages/newsAndEvents/NewsAndEvents.jsx";
import EventPage from "./pages/newsAndEvents/EventPage.jsx";
import UnsubscribeEmail from "./pages/UnsubscribeEmail.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route path="/" element={<Home />} />
				<Route path="/about-us" element={<AboutUs />} />
				<Route path="/academics" element={<Academics />} />
				<Route path="/admission" element={<Admissions />} />
				<Route path="/contact-us" element={<ContactUs />} />
				<Route path="/gallery" element={<Gallery />} />
				<Route path="/jobs" element={<Jobs />} />
				<Route path="/magazine" element={<Magazine />} />
				<Route path="/mandatory-disclosure" element={<MandatoryDisclosure />} />
				<Route path="/terms-conditions" element={<TermsConditions />} />
				<Route path="/principal-message" element={<PrincipalMessage />} />
				<Route path="/director-message" element={<DirectorMessage />} />
				<Route path="/beyond-classroom" element={<BeyondClassroom />} />
				<Route path="/beyond-classroom/sports" element={<BeyondClassroomSports />} />
				<Route path="/beyond-classroom/co-curricular" element={<BeyondClassroomCoCurricular />} />
				<Route path="/accomplishments/academics" element={<AccomplishmentsAcademics />} />
				<Route path="/accomplishments/sports" element={<AccomplishmentsSports />} />
				<Route path="/accomplishments/co-curricular" element={<AccomplishmentsCoCurricular />} />
				<Route path="/news-events" element={<NewsAndEvents />} />
				<Route path="/news-events/:id" element={<EventPage />} />
				<Route path="/newsLetter" element={<UnsubscribeEmail />} />
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	);
}
