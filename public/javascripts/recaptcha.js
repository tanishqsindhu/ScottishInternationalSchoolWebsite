// reCAPTCHA v3 handler
document.addEventListener("DOMContentLoaded", function () {
	// Home page contact form
	const contactForm = document.getElementById("contact-us-form");
	if (contactForm) {
		contactForm.addEventListener("submit", function (e) {
			e.preventDefault();
			executeRecaptcha(contactForm, "contact");
		});
	}

	// Contact page forms (both branches)
	const contactForms = document.querySelectorAll(".validated-form");
	contactForms.forEach((form, index) => {
		if (form.action.includes("/contact-us")) {
			form.addEventListener("submit", function (e) {
				e.preventDefault();
				executeRecaptcha(form, "contact_" + index);
			});
		}
	});

	// Newsletter form
	const newsletterForm = document.querySelector('form[action="/newsLetter"]');
	if (newsletterForm) {
		newsletterForm.addEventListener("submit", function (e) {
			e.preventDefault();
			executeRecaptcha(newsletterForm, "newsletter");
		});
	}
});

function executeRecaptcha(form, action) {
	grecaptcha.ready(function () {
		grecaptcha.execute(recaptchaSiteKey, { action: action }).then(function (token) {
			// Find the hidden input field for the token
			let tokenInput = form.querySelector('input[name="g-recaptcha-response"]');
			if (!tokenInput) {
				// Create it if it doesn't exist
				tokenInput = document.createElement("input");
				tokenInput.type = "hidden";
				tokenInput.name = "g-recaptcha-response";
				form.appendChild(tokenInput);
			}
			// Set the token
			tokenInput.value = token;
			// Submit the form
			form.submit();
		});
	});
}
