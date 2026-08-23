export function json(statusCode, body) {
	return {
		statusCode,
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	};
}

export async function verifyRecaptcha(token) {
	if (!process.env.RECAPTCHA_SECRET_KEY) return true; // not configured -> skip
	if (!token) return false;
	const params = new URLSearchParams({
		secret: process.env.RECAPTCHA_SECRET_KEY,
		response: token,
	});
	const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: params.toString(),
	});
	const data = await res.json();
	return data.success === true;
}
