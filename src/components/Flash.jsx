import { useFlash } from "../context/FlashContext.jsx";

export default function Flash() {
	const { success, error, clear } = useFlash();

	if (!success && !error) return null;

	return (
		<>
			{success && (
				<div className="alert alert-success alert-dismissible fade show mb-0" role="alert">
					<strong>Success!</strong> {success}.
					<button type="button" className="btn-close" onClick={clear} aria-label="Close"></button>
				</div>
			)}
			{error && (
				<div className="alert alert-danger alert-dismissible fade show mb-0" role="alert">
					<strong>Oh No Error Happened!</strong> {error}.
					<button type="button" className="btn-close" onClick={clear} aria-label="Close"></button>
				</div>
			)}
		</>
	);
}
