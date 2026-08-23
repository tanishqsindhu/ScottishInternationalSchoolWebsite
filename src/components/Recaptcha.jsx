import { useEffect, useRef } from "react";
import site from "../config/site.js";

// Renders a Google reCAPTCHA v2 widget and exposes its response via ref.
// Usage:
//   const recaptchaRef = useRef();
//   <Recaptcha ref={recaptchaRef} />
//   const token = recaptchaRef.current?.getResponse();
export default function Recaptcha({ ref }) {
	const containerRef = useRef(null);
	const widgetIdRef = useRef(null);

	useEffect(() => {
		if (!site.recaptchaSiteKey) return;
		let cancelled = false;

		const render = () => {
			if (cancelled || widgetIdRef.current !== null || !containerRef.current) return;
			if (window.grecaptcha && window.grecaptcha.render) {
				widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
					sitekey: site.recaptchaSiteKey,
				});
			} else {
				setTimeout(render, 300);
			}
		};
		render();

		return () => {
			cancelled = true;
		};
	}, []);

	useEffect(() => {
		if (!ref) return;
		ref.current = {
			getResponse: () =>
				widgetIdRef.current !== null ? window.grecaptcha.getResponse(widgetIdRef.current) : "",
			reset: () => {
				if (widgetIdRef.current !== null) window.grecaptcha.reset(widgetIdRef.current);
			},
		};
	}, [ref]);

	if (!site.recaptchaSiteKey) return null;

	return <div className="mb-3" ref={containerRef}></div>;
}
