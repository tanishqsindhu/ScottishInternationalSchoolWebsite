// reCAPTCHA v2 handler
document.addEventListener("DOMContentLoaded", function () {
	// Home page contact form
	const contactForm = document.getElementById("contact-us-form");
	if (contactForm) {
		contactForm.addEventListener("submit", function (e) {
			// The form will be submitted normally, reCAPTCHA v2 takes care of validation
		});
	}

	// Contact page forms (both branches)
	const contactForms = document.querySelectorAll(".validated-form");
	contactForms.forEach((form, index) => {
		if (form.action.includes("/contact-us")) {
			form.addEventListener("submit", function (e) {
				// The form will be submitted normally, reCAPTCHA v2 takes care of validation
			});
		}
	});

	// Newsletter form
	const newsletterForm = document.querySelector('form[action="/newsLetter"]');
	if (newsletterForm) {
		newsletterForm.addEventListener("submit", function (e) {
			// The form will be submitted normally, reCAPTCHA v2 takes care of validation
		});
	}
});

// Add reCAPTCHA widget to forms when loaded
document.addEventListener("DOMContentLoaded", function () {
	// Get all forms that need reCAPTCHA
	const formsNeedingRecaptcha = document.querySelectorAll(
		'form.validated-form, form[action="/newsLetter"], #contact-us-form'
	);

	formsNeedingRecaptcha.forEach((form, index) => {
		// Find the hidden input field
		const existingInput = form.querySelector('input[name="g-recaptcha-response"]');
		if (existingInput) {
			// Create a div for the reCAPTCHA widget before the submit button
			const recaptchaDiv = document.createElement("div");
			recaptchaDiv.className = "g-recaptcha mb-3";
			recaptchaDiv.setAttribute("data-sitekey", recaptchaSiteKey);

			// Insert the reCAPTCHA div before the submit button
			const submitButton = form.querySelector('button[type="submit"]');
			if (submitButton) {
				const parentElement = submitButton.parentElement;
				parentElement.parentNode.insertBefore(recaptchaDiv, parentElement);
			} else {
				// If no submit button, just append to form
				form.appendChild(recaptchaDiv);
			}
		}
	});
});
