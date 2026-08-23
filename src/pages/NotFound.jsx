import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";

export default function NotFound() {
	return (
		<>
			<Seo title="Page Not Found" />
			<div className="container d-flex flex-column justify-content-center align-items-center vh-100 text-center">
				<div className="p-4 border rounded shadow-sm">
					<h1 className="display-4">404</h1>
					<h2 className="mb-4">Page Not Found</h2>
					<p>The page you are looking for does not exist.</p>
					<Link to="/" className="btn btn-primary">
						Back to Home
					</Link>
				</div>
			</div>
		</>
	);
}
