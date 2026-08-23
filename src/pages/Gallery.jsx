import { useEffect, useMemo, useRef, useState } from "react";
import Seo from "../components/Seo.jsx";
import PageBanner from "../components/PageBanner.jsx";
import { api } from "../lib/api.js";
import site from "../config/site.js";

const PAGE_SIZE = 12;

const columnCountFor = (width) => (width < 576 ? 1 : width < 992 ? 2 : 3);

// Estimate a card's relative height so items can be distributed into the
// shortest column (approximates the original offsetHeight-based masonry).
function estimateHeight(post) {
	const ratio = post._ratio;
	let h = 1 / ratio; // media frame height relative to column width
	h += 0.55; // card body base (date row, paddings)
	if (post.title) h += 0.18;
	if (post.message) h += Math.min(post.message.length, 150) / 300;
	return h;
}

function FbPostCard({ post, idx }) {
	// Prefer the rich media array; fall back to the legacy single image
	const media = post._media;
	const carouselId = `fbPostCarousel${idx}`;
	const frameStyle = { aspectRatio: post._ratio.toFixed(3) };

	// Long descriptions: show only the first third, with a link to the full post
	let isLong = false;
	let shownMessage = post.message;
	if (post.message) {
		isLong = post.message.length > 150;
		if (isLong) {
			const third = Math.ceil(post.message.length / 3);
			const cut = post.message.lastIndexOf(" ", third);
			shownMessage = post.message.slice(0, cut > 0 ? cut : third).trimEnd();
		}
	}

	return (
		<div className="fb-masonry-item">
			<div className="card fb-post-card">
				{media.length > 1 ? (
					/* Multi-photo/video album: carousel */
					<div
						id={carouselId}
						className="carousel slide fb-media-frame"
						style={frameStyle}
						data-bs-ride="carousel"
					>
						<div className="carousel-indicators">
							{media.map((m, mIdx) => (
								<button
									key={mIdx}
									type="button"
									data-bs-target={`#${carouselId}`}
									data-bs-slide-to={mIdx}
									className={mIdx === 0 ? "active" : undefined}
									aria-current={mIdx === 0 ? "true" : undefined}
									aria-label={`Slide ${mIdx + 1}`}
								></button>
							))}
						</div>
						<div className="carousel-inner h-100">
							{media.map((m, mIdx) => (
								<div
									key={mIdx}
									className={`carousel-item h-100 ${mIdx === 0 ? "active" : ""}`}
									data-bs-interval="4000"
								>
									{m.type === "video" && m.source ? (
										<video
											className="fb-post-media fb-video"
											muted
											loop
											playsInline
											preload="metadata"
											poster={m.src || ""}
										>
											<source src={m.source} type="video/mp4" />
										</video>
									) : (
										<img
											src={m.src}
											className="fb-post-media"
											alt={`${post.title || "Facebook post"} - photo ${mIdx + 1}`}
											loading="lazy"
										/>
									)}
								</div>
							))}
						</div>
						<button
							className="carousel-control-prev"
							type="button"
							data-bs-target={`#${carouselId}`}
							data-bs-slide="prev"
						>
							<span className="carousel-control-prev-icon" aria-hidden="true"></span>
							<span className="visually-hidden">Previous</span>
						</button>
						<button
							className="carousel-control-next"
							type="button"
							data-bs-target={`#${carouselId}`}
							data-bs-slide="next"
						>
							<span className="carousel-control-next-icon" aria-hidden="true"></span>
							<span className="visually-hidden">Next</span>
						</button>
						<span className="fb-media-count">
							<i className="fa-regular fa-images me-1"></i>
							{media.length}
						</span>
					</div>
				) : media.length === 1 ? (
					<div className="fb-media-frame" style={frameStyle}>
						{media[0].type === "video" && media[0].source ? (
							<>
								<video
									className="fb-post-media fb-video"
									muted
									loop
									playsInline
									preload="metadata"
									poster={media[0].src || ""}
									controls
								>
									<source src={media[0].source} type="video/mp4" />
								</video>
								<span className="fb-media-count">
									<i className="fa-solid fa-video me-1"></i>Video
								</span>
							</>
						) : media[0].type === "video" ? (
							/* Video without a playable source: thumbnail with play overlay linking to Facebook */
							<a href={post.url} target="_blank" rel="noopener" className="fb-video-thumb">
								<img
									src={media[0].src}
									className="fb-post-media"
									alt={post.title || "Facebook video"}
									loading="lazy"
								/>
								<span className="fb-play-overlay">
									<i className="fa-solid fa-circle-play"></i>
								</span>
							</a>
						) : (
							<a href={post.url} target="_blank" rel="noopener">
								<img
									src={media[0].src}
									className="fb-post-media"
									alt={post.title || "Facebook post"}
									loading="lazy"
								/>
							</a>
						)}
					</div>
				) : null}
				<div className="card-body d-flex flex-column">
					{post.title ? <h5 className="card-title">{post.title}</h5> : null}
					{post.message ? (
						<p className="card-text fb-post-message">
							{shownMessage}
							{isLong ? (
								<>
									&hellip;{" "}
									<a href={post.url} target="_blank" rel="noopener" className="fb-show-more">
										Show more
									</a>
								</>
							) : null}
						</p>
					) : null}
					<div className="mt-auto d-flex justify-content-between align-items-center pt-3">
						<small className="text-muted">
							<i className="fa-regular fa-calendar me-1"></i>
							{new Date(post.created_time).toLocaleDateString("en-IN", {
								day: "numeric",
								month: "short",
								year: "numeric",
							})}
						</small>
						<a href={post.url} target="_blank" rel="noopener" className="btn btn-sm btn-outline-primary">
							<i className="fa-brands fa-facebook me-1"></i>View Post
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default function Gallery() {
	const [posts, setPosts] = useState([]);
	const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
	const [cols, setCols] = useState(() =>
		typeof window !== "undefined" ? columnCountFor(window.innerWidth) : 3
	);
	const gridRef = useRef(null);
	const sentinelRef = useRef(null);

	useEffect(() => {
		let cancelled = false;
		api
			.get("/posts")
			.then((data) => {
				if (cancelled) return;
				const sorted = [...(data.posts || [])].sort(
					(a, b) => new Date(b.created_time) - new Date(a.created_time)
				);
				setPosts(sorted);
			})
			.catch(() => {
				if (!cancelled) setPosts([]);
			});
		return () => {
			cancelled = true;
		};
	}, []);

	// Precompute media array + clamped aspect ratio per post (same math as the EJS)
	const items = useMemo(
		() =>
			posts.map((post) => {
				const media =
					post.media && post.media.length > 0
						? post.media
						: post.image_url
						? [{ type: "photo", src: post.image_url, source: null }]
						: [];
				const first = media[0];
				let ratio = first && first.width && first.height ? first.width / first.height : 4 / 3;
				ratio = Math.min(Math.max(ratio, 0.7), 1.9);
				return { ...post, _media: media, _ratio: ratio };
			}),
		[posts]
	);

	// Masonry: distribute visible items into flex columns (shortest first,
	// using estimated heights instead of the original offsetHeight measurement)
	const columns = useMemo(() => {
		const colItems = Array.from({ length: cols }, () => []);
		const colHeights = Array(cols).fill(0);
		items.slice(0, visibleCount).forEach((post, idx) => {
			let shortest = 0;
			for (let i = 1; i < cols; i++) {
				if (colHeights[i] < colHeights[shortest]) shortest = i;
			}
			colItems[shortest].push({ post, idx });
			colHeights[shortest] += estimateHeight(post);
		});
		return colItems;
	}, [items, visibleCount, cols]);

	// Re-layout when the column count changes (debounced)
	useEffect(() => {
		let resizeTimer;
		const onResize = () => {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(() => {
				setCols(columnCountFor(window.innerWidth));
			}, 150);
		};
		window.addEventListener("resize", onResize);
		return () => {
			clearTimeout(resizeTimer);
			window.removeEventListener("resize", onResize);
		};
	}, []);

	// Infinite scroll: auto-load more posts when the sentinel appears
	useEffect(() => {
		const sentinel = sentinelRef.current;
		if (!sentinel) return;
		if (!("IntersectionObserver" in window)) {
			// Fallback: no IntersectionObserver, just show everything
			setVisibleCount(items.length);
			return;
		}
		const scrollObserver = new IntersectionObserver(
			(entries) => {
				if (entries.some((e) => e.isIntersecting)) {
					setVisibleCount((v) => Math.min(v + PAGE_SIZE, items.length));
				}
			},
			{ rootMargin: "400px 0px" }
		);
		scrollObserver.observe(sentinel);
		return () => scrollObserver.disconnect();
	}, [items.length]);

	// Video autoplay (only while visible) + carousel init with video pause/play on slide
	useEffect(() => {
		const grid = gridRef.current;
		if (!grid) return;

		const videoObserver =
			"IntersectionObserver" in window
				? new IntersectionObserver(
						(entries) => {
							entries.forEach((entry) => {
								if (entry.isIntersecting) {
									entry.target.play().catch(() => {
										/* autoplay blocked - ignore */
									});
								} else {
									entry.target.pause();
								}
							});
						},
						{ threshold: 0.4 }
				  )
				: null;

		if (videoObserver) {
			grid.querySelectorAll("video.fb-video").forEach((v) => videoObserver.observe(v));
		}

		const slidHandlers = [];
		grid.querySelectorAll(".fb-media-frame.carousel").forEach((el) => {
			if (!el.dataset.fbInit) {
				el.dataset.fbInit = "1";
				if (window.bootstrap?.Carousel) {
					window.bootstrap.Carousel.getOrCreateInstance(el, {
						interval: 4000,
						ride: "carousel",
						touch: true,
						pause: "hover",
					});
				}
			}
			const onSlid = () => {
				el.querySelectorAll("video.fb-video").forEach((v) => v.pause());
				const activeVideo = el.querySelector(".carousel-item.active video.fb-video");
				if (activeVideo) activeVideo.play().catch(() => {});
			};
			el.addEventListener("slid.bs.carousel", onSlid);
			slidHandlers.push([el, onSlid]);
		});

		return () => {
			videoObserver?.disconnect();
			slidHandlers.forEach(([el, fn]) => el.removeEventListener("slid.bs.carousel", fn));
		};
	}, [columns]);

	return (
		<>
			<Seo title="Gallery" />
			<PageBanner title="Gallery" />
			<svg xmlns="http://www.w3.org/2000/svg" className="d-none">
				<symbol id="info-fill" viewBox="0 0 16 16">
					<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
				</symbol>
			</svg>
			<div className="container mt-5">
				{/* Social Media Navigation Tabs */}
				<ul className="nav nav-tabs social-tabs mb-4" id="socialTabs" role="tablist">
					<li className="nav-item" role="presentation">
						<button
							className="nav-link active"
							id="facebook-tab"
							data-bs-toggle="tab"
							data-bs-target="#facebook"
							type="button"
							role="tab"
							aria-controls="facebook"
							aria-selected="true"
						>
							<i className="fa-brands fa-facebook me-2"></i>Facebook
						</button>
					</li>
					<li className="nav-item" role="presentation">
						<button
							className="nav-link"
							id="youtube-tab"
							data-bs-toggle="tab"
							data-bs-target="#youtube"
							type="button"
							role="tab"
							aria-controls="youtube"
							aria-selected="false"
						>
							<i className="fa-brands fa-youtube me-2"></i>YouTube
						</button>
					</li>
				</ul>

				{/* Tab Content */}
				<div className="tab-content" id="socialTabsContent">
					{/* Facebook Tab */}
					<div
						className="tab-pane fade show active"
						id="facebook"
						role="tabpanel"
						aria-labelledby="facebook-tab"
					>
						<div className="row">
							<div className="col-12 text-center mb-4">
								<h2 className="section-title">Our Facebook Updates</h2>
								<p className="lead">Stay connected with our latest announcements and events</p>
							</div>
						</div>
						{items.length > 0 ? (
							<>
								<div className="fb-masonry" id="fbPostsGrid" ref={gridRef}>
									{columns.map((colItems, colIdx) => (
										<div className="fb-masonry-col" key={colIdx}>
											{colItems.map(({ post, idx }) => (
												<FbPostCard key={post.post_id || idx} post={post} idx={idx} />
											))}
										</div>
									))}
								</div>

								{/* Infinite scroll sentinel: more posts load automatically when this comes into view */}
								<div
									id="fbScrollSentinel"
									ref={sentinelRef}
									data-page-size={PAGE_SIZE}
									className={`text-center py-4 ${visibleCount < items.length ? "" : "d-none"}`}
								>
									<div className="spinner-border text-secondary" role="status">
										<span className="visually-hidden">Loading more posts...</span>
									</div>
								</div>
							</>
						) : (
							<div className="row">
								<div className="col-12 text-center">
									<p className="text-muted">
										No posts available at the moment. Please check back later.
									</p>
								</div>
							</div>
						)}

						<div className="text-center mt-4">
							<a href={site.facebookUrl} target="_blank" rel="noopener" className="btn btn-primary">
								<i className="fa-brands fa-facebook me-2"></i>Visit Our Facebook Page
							</a>
						</div>
					</div>

					{/* YouTube Tab */}
					<div className="tab-pane fade" id="youtube" role="tabpanel" aria-labelledby="youtube-tab">
						<div className="row">
							<div className="col-12 text-center mb-4">
								<h2 className="section-title">Our YouTube Channel</h2>
								<p className="lead">Watch videos from our school events and activities</p>
							</div>
						</div>
						<div className="row">
							<div className="col-lg-8 mx-auto">
								<div className="youtube-container">
									<iframe
										width="100%"
										height="515"
										src="https://www.youtube.com/embed/3UaVy0B4mBA?si=CUi80jAr7V_8_Ye-"
										title="YouTube video player"
										frameBorder="0"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
										referrerPolicy="strict-origin-when-cross-origin"
										allowFullScreen
									></iframe>
								</div>

								<div className="text-center mt-4">
									<a href={site.youtubeUrl} target="_blank" rel="noopener" className="btn btn-danger">
										<i className="fa-brands fa-youtube me-2"></i>Visit Our YouTube Channel
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<style>{`
		/* Tab Navigation Styling */
		.social-tabs {
			border-bottom: 1px solid #dee2e6;
			justify-content: center;
		}

		.social-tabs .nav-link {
			margin-bottom: -1px;
			border: 1px solid transparent;
			border-top-left-radius: 0.25rem;
			border-top-right-radius: 0.25rem;
			font-weight: 500;
			padding: 0.75rem 1.5rem;
			transition: all 0.3s ease;
		}

		.social-tabs .nav-link:hover {
			border-color: #e9ecef #e9ecef #dee2e6;
		}

		.social-tabs .nav-link.active {
			color: #495057;
			background-color: #fff;
			border-color: #dee2e6 #dee2e6 #fff;
		}

		/* Masonry layout: items distributed into flex columns */
		.fb-masonry {
			display: flex;
			gap: 1.5rem;
			align-items: flex-start;
		}

		.fb-masonry-col {
			flex: 1 1 0;
			min-width: 0;
		}

		.fb-masonry-item {
			margin-bottom: 1.5rem;
		}

		.fb-masonry-item.fb-hidden {
			display: none;
		}

		/* Facebook Post Cards */
		.fb-post-card {
			border: none;
			border-radius: 12px;
			box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
			overflow: hidden;
			transition: transform 0.3s ease, box-shadow 0.3s ease;
		}

		.fb-post-card:hover {
			transform: translateY(-5px);
			box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
		}

		/* Media frame: adaptive aspect ratio (set inline per post) with a dark letterbox background */
		.fb-media-frame {
			position: relative;
			width: 100%;
			aspect-ratio: 4 / 3; /* fallback; overridden inline per post */
			background: #111;
			overflow: hidden;
		}

		.fb-media-frame a {
			display: block;
			width: 100%;
			height: 100%;
		}

		.fb-post-media {
			width: 100%;
			height: 100%;
			object-fit: cover;
			display: block;
			transition: transform 0.4s ease;
		}

		.fb-post-card:hover img.fb-post-media {
			transform: scale(1.04);
		}

		/* Videos keep their full frame (no cropping) */
		video.fb-post-media {
			object-fit: contain;
		}

		/* Media count / video badge */
		.fb-media-count {
			position: absolute;
			top: 10px;
			right: 10px;
			background: rgba(0, 0, 0, 0.6);
			color: #fff;
			font-size: 0.75rem;
			padding: 3px 10px;
			border-radius: 20px;
			z-index: 3;
		}

		/* Play overlay for videos without a direct source */
		.fb-video-thumb {
			position: relative;
		}

		.fb-play-overlay {
			position: absolute;
			inset: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 3.5rem;
			color: rgba(255, 255, 255, 0.9);
			background: rgba(0, 0, 0, 0.25);
			transition: background 0.3s ease;
		}

		.fb-video-thumb:hover .fb-play-overlay {
			background: rgba(0, 0, 0, 0.45);
		}

		/* Carousel controls: subtle, appear on hover */
		.fb-media-frame .carousel-control-prev,
		.fb-media-frame .carousel-control-next {
			width: 15%;
			opacity: 0;
			transition: opacity 0.3s ease;
		}

		.fb-media-frame:hover .carousel-control-prev,
		.fb-media-frame:hover .carousel-control-next {
			opacity: 0.9;
		}

		/* Touch devices have no hover: keep controls visible */
		@media (hover: none) {
			.fb-media-frame .carousel-control-prev,
			.fb-media-frame .carousel-control-next {
				opacity: 0.8;
			}
		}

		.fb-media-frame .carousel-indicators {
			margin-bottom: 0.5rem;
		}

		.fb-media-frame .carousel-indicators button {
			width: 8px;
			height: 8px;
			border-radius: 50%;
		}

		.fb-post-message {
			color: #555;
			white-space: pre-line; /* keep Facebook line breaks */
			word-break: break-word;
		}

		.fb-show-more {
			color: #1877f2; /* Facebook blue */
			font-weight: 500;
			text-decoration: none;
			white-space: nowrap;
		}

		.fb-show-more:hover {
			text-decoration: underline;
		}

		/* YouTube Container */
		.youtube-container {
			position: relative;
			width: 100%;
			background: white;
			border-radius: 8px;
			box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
			overflow: hidden;
		}

		/* Section Title Styling */
		.section-title {
			position: relative;
			margin-bottom: 1.5rem;
			color: #333;
		}

		.section-title:after {
			content: '';
			display: block;
			width: 80px;
			height: 3px;
			background: #eabd57;
			margin: 15px auto 0;
		}

		@media (max-width: 768px) {
			.social-tabs .nav-link {
				padding: 0.5rem 1rem;
				font-size: 0.9rem;
			}
		}
	`}</style>
		</>
	);
}
