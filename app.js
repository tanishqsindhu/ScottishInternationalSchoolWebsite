if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const mongoSanitize = require("express-mongo-sanitize");
const flash = require("connect-flash");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const ExpressError = require("./utils/ExpressError");
const User = require("./models/user");
const { verifyRecaptcha } = require("./middleware");

// Route Imports
const beyondClassroomRoute = require("./routes/beyondClassroom");
const accomplishmentsRoute = require("./routes/accomplishments");
const newsAndEventsRoute = require("./routes/newsAndEvents");
const newsLetterRoute = require("./routes/newsLetter");
const userRoute = require("./routes/user");
const { sendMail } = require("./utils/nodemailer");

// Environment Variables
const SECRET = process.env.SECRET || "fallbackSecret";
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/mydb";
const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose
	.connect(DB_URL)
	.then(() => console.log("✅ Connected to MongoDB"))
	.catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Express App Initialization
const app = express();
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware Setup
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(mongoSanitize({ replaceWith: "_" }));

// Session Store Configuration
const store = MongoStore.create({
	mongoUrl: DB_URL,
	touchAfter: 24 * 60 * 60,
	crypto: { secret: SECRET },
});

store.on("error", (e) => console.error("SESSION STORE ERROR:", e));

app.use(
	session({
		store,
		name: "sessionId",
		secret: SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production", // Secure in production
			sameSite: "lax",
			expires: Date.now() + 1000 * 60 * 60 * 3, // 3 hours
			maxAge: 1000 * 60 * 60 * 3,
		},
	})
);

app.use(flash());

// Passport Authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Global Middleware for Flash Messages & User Data
app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	res.locals.success = req.flash("success");
	res.locals.error = req.flash("error");
	res.locals.errorMessage = "";
	res.locals.currentPath = req.originalUrl; // Add current path for dynamic canonical URLs
	next();
});

// Routes
app.use("/beyond-classroom", beyondClassroomRoute);
app.use("/newsLetter", newsLetterRoute);
app.use("/news-events", newsAndEventsRoute);
app.use("/accomplishments", accomplishmentsRoute);
app.use("/", userRoute);

// Home Route
app.get("/", async (req, res, next) => {
	try {
		const currentPage = "home";
		const news = await require("./models/newsAndEvents").find({});
		news.sort(
			(a, b) =>
				new Date(`${b.year}-${b.month}-${b.date}`) - new Date(`${a.year}-${a.month}-${a.date}`)
		);
		const { parentTestimonial } = await require("./models/home").findOne();
		res.render("home", { news, parentTestimonial, currentPage });
	} catch (err) {
		next(err);
	}
});

// Contact Us Route
app
	.route("/contact-us")
	.get((req, res) => {
		const currentPage = "contactus";
		res.render("contact-us", { currentPage });
	})
	.post(verifyRecaptcha, async (req, res, next) => {
		try {
			const newContact = new (require("./models/contactUs"))({
				...req.body.user,
				date: Date.now(),
			});
			await newContact.save();
			// Define the email options
			const mailOptions = {
				from: "broadcastscottish@gmail.com",
				to: "info.sis.hsr@gmail.com",
				subject: `Requested for contancting on The Scotts Website by ${
					newContact.name
				} at ${newContact.date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} for ${
					newContact.branch
				} Branch`,
				html: `<div style="font-family: Arial, sans-serif; max-width: 600px; background: #ffffff; padding: 20px; margin: 20px auto; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
							<!-- Header Section with Logo -->
							<div style="display: flex; justify-content: space-between; align-items: center;">
								<h2>📩 New Contact Us Form Submission</h2>
								<img src="https://res.cloudinary.com/djfy7fvq1/image/upload/f_auto,q_auto/v1/Scottish/hkoqggo9z6nyp29xior8" alt="School Logo" style="max-width: 100px; height: auto; margin-left:200px">
							</div>
							<hr>

							<!-- Contact Details -->
							<p><strong>Name:</strong> ${newContact.name}</p>
							<p><strong>Email:</strong> ${newContact.email}</p>
							<p><strong>Phone:</strong> ${newContact.phone}</p>
							<p><strong>Date:</strong> ${newContact.date.toLocaleString("en-IN", {
								timeZone: "Asia/Kolkata",
							})}</p>
							
							<p><strong>Message:</strong></p>
							<p>${newContact.message}</p>
							
							<hr>
							<p style="text-align: center; font-size: 14px; color: #999;">This email was generated automatically. Please do not reply.</p>
						</div>

						`,
			};
			sendMail(mailOptions);
			req.flash("success", "We Have Recieved Your Request and will contact you Shortly");
			res.redirect("/");
		} catch (err) {
			next(err);
		}
	});

app.get("/admission", (req, res) => {
	const currentPage = "admissions";
	res.render("admissions", { currentPage });
});

app.get("/gallery", async (req, res) => {
	const currentPage = "gallery";

	// Removed post fetching as we're only using embedded Facebook feed and YouTube
	res.render("gallery", { currentPage });
});

app.get("/jobs", async (req, res) => {
	const currentPage = "jobs";
	const jobs = await require("./models/jobs").find({});

	res.render("jobs", { jobs, currentPage });
});
// Static Page Routes
const staticPages = [
	"about-us",
	"academics",
	"principal-message",
	"director-message",
	"mandatory-disclosure",
	"terms-conditions",
	"magazine",
];
staticPages.forEach((page) =>
	app.get(`/${page}`, (req, res) => {
		const currentPage = page;
		res.render(page, { currentPage });
	})
);

// app.get('/calenders',(req,res)=>{
//     // const errorMessage='underConstruction'
//     res.render('calenders/homePage');
// })
// app.get('/calenders/add',(req,res)=>{
//     res.render('calenders/addForm');
// })
// app.post('/calenders',(req,res)=>{
//     console.log(req)
//     res.render('calenders/HomePage');
// })

// 404 Error Handler
app.all("*", (req, res, next) => {
	next(new ExpressError("Page Not Found", 404));
});

// General Error Handler
app.use((err, req, res, next) => {
	const { statusCode = 500, message = "Something Went Wrong!" } = err;
	if (process.env.NODE_ENV === "production") {
		try {
			const ErrorLogSchema = require("./models/errorLog"); // Ensure errorLog schema exists
			new ErrorLogSchema({ statusCode, message, stack: err.stack, date: new Date() }).save();
		} catch (error) {
			console.error("Error Logging Failed:", error);
		}
	}
	const currentPage = "error";
	res
		.status(statusCode)
		.render("error", { err, returnTo: req.session.returnTo || "/", currentPage });
});

// // Initialize Facebook Posts Scheduler
// if (process.env.ENABLE_FACEBOOK_POSTS === "true") {
// 	const Scheduler = require("./services/scheduler");
// 	Scheduler.startFacebookPostScheduler(process.env.FACEBOOK_UPDATE_INTERVAL || 60);
// }

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
