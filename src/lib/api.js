// Small helper around the Netlify Functions API.
// In dev, run `netlify dev` so /api/* is proxied to functions.
const API_BASE = "/api";

async function request(path, options = {}) {
	const res = await fetch(`${API_BASE}${path}`, {
		headers: { "Content-Type": "application/json" },
		...options,
	});
	const data = await res.json().catch(() => ({}));
	if (!res.ok) {
		throw new Error(data.error || `Request failed (${res.status})`);
	}
	return data;
}

export const api = {
	get: (path) => request(path),
	post: (path, body) => request(path, { method: "POST", body: JSON.stringify(body) }),
};
