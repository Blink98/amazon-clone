const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
	"sk_test_51ILOncL9OWMlZ1lHmo3r25OXphbjWwYYIaGZt1B7c9AVXLPyGbd5Dhnw55z9oSqCOX3MDSR34t47B8cZqOEXcXBM00guCx4pbP"
);

// API //

// App Config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// API Routes
app.get("/", (request, response) => {
	response.status(200).send("Hello world from Cloud Function");
});

app.post("/payments/create", async (request, response) => {
	const total = request.query.total;

	console.log(
		"Payment Request Recieved for this amount >>> ",
		`₹${total / 100}`
	);

	if (total > 0) {
		const paymentIntent = await stripe.paymentIntents.create({
			amount: total,
			currency: "inr",
		});

		// OK - Created
		response.status(201).send({
			clientSecret: paymentIntent.client_secret,
		});
	}
});

// Listen to commands
exports.api = functions.https.onRequest(app);

// Example Endpoint
// http://localhost:5001/clone-f67da/us-central1/api
