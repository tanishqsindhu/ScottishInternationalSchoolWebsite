let index = 0;
const carousel = document.querySelector(".carousel1");
const visibleCount = 4; // Number of visible slides at a time
const buffer = 4; // Number of slides before cloning kicks in

function updateCarousel() {
	const shift = -(index * (100 / visibleCount));
	carousel.style.transition = "transform 0.5s ease-in-out";
	carousel.style.transform = `translateX(${shift}%)`;

	// Clone slides dynamically before reaching the end
	checkAndCloneSlides();
}

function checkAndCloneSlides() {
	const slides = document.querySelectorAll(".slide1");

	// Clone when the user is about to reach the last few slides
	if (index >= slides.length - buffer) {
		slides.forEach((slide) => {
			const clone = slide.cloneNode(true);
			carousel.appendChild(clone);
		});
	}
}

function nextSlide() {
	index++;
	updateCarousel();
}

function prevSlide() {
	if (index > 0) {
		index--;
		updateCarousel();
	}
}

// Attach event listeners
document.getElementById("next").addEventListener("click", nextSlide);
document.getElementById("prev").addEventListener("click", prevSlide);

// Auto-slide every 3 seconds
setInterval(nextSlide, 3000);

// Initial cloning to ensure enough slides
checkAndCloneSlides();
updateCarousel();
