let index = 0;
const carousel = document.querySelector(".carousel1");
let slides = [...document.querySelectorAll(".slide1")]; // Convert NodeList to Array
let visibleCount = getVisibleCount();
const buffer = visibleCount; // Number of extra slides to clone for infinite looping

function getVisibleCount() {
	if (window.innerWidth < 600) return 2; // Mobile
	if (window.innerWidth < 900) return 3; // Tablet
	if (window.innerWidth > 1500) return 6; // Extra Wide Display
	return 4; // Desktop default
}

function updateCarousel() {
	const slideWidth = 100 / visibleCount; // Calculate width for each slide
	const shift = -(index * slideWidth);
	carousel.style.transition = "transform 0.5s ease-in-out";
	carousel.style.transform = `translateX(${shift}%)`;
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
	} else {
		index = document.querySelectorAll(".slide1").length - visibleCount; // Jump to end
		carousel.style.transition = "none";
		carousel.style.transform = `translateX(-${index * (100 / visibleCount)}%)`;
		setTimeout(() => {
			carousel.style.transition = "transform 0.5s ease-in-out";
			prevSlide();
		}, 50);
	}
}

// Adjust slide width dynamically
function adjustSlides() {
	visibleCount = getVisibleCount();
	index = 0; // Reset index on resize

	// Update each slide's width
	document.querySelectorAll(".slide1").forEach((slide) => {
		slide.style.flex = `0 0 ${100 / visibleCount}%`;
	});

	checkAndCloneSlides();
}

// Attach event listeners
document.getElementById("next").addEventListener("click", nextSlide);
document.getElementById("prev").addEventListener("click", prevSlide);
window.addEventListener("resize", adjustSlides);

// Auto-slide every 3 seconds
setInterval(nextSlide, 3000);

// Initial setup
adjustSlides();
