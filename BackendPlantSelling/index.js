// Import required modules
import "../BackendPlantSelling/database/connection.js"; // Ensure this connection file is correct
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
const { text } = bodyParser;
import { config } from "dotenv";
import crypto from "crypto";
import Razorpay from "razorpay";
import nodemailer from "nodemailer";
import { Order } from "./database/models/OrderSchema.js";
import { Contact } from "./database/models/ContactSchema.js";
import { CashOnHomeDeilvery } from "./database/models/HomeDeliverySchema.js";


config({ path: "./config.env" });


const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(text());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS settings to allow requests from the frontend
app.use(
	cors({
		origin: ["https://plantsellingwebsite-adminpanel.onrender.com","https://plantsellingwebsite.onrender.com"],
		methods: ["POST", "PUT", "DELETE", "GET"],
		credentials: true,
	})
);

// Initialize Razorpay with environment variables
const razorpayInstance = new Razorpay({
	key_id: "rzp_live_zFquZDYMOOSpfX", // Razorpay key ID from environment
	key_secret: "8V1yLdylvPPVIAx3tu5MTNFH", // Razorpay secret from environment
});

// Create an order route
app.post("/create-order", async (req, res) => {
	const { customer, cart, total } = req.body;

	// Validate the request body
	if (!customer || !total || !cart) {
		return res.status(400).json({ error: "Missing required fields" });
	}

	console.log("Cart:", cart);

	const options = {
		amount: total * 100, // Razorpay expects the amount in paise
		currency: "INR",
		receipt: `order_receipt_${Math.random()}`,
	};

	try {
		// Create a Razorpay order
		const order = await razorpayInstance.orders.create(options);

		// Create a new order entry in the database
		const newOrder = new Order({
			customer,
			cart,
			totalAmount: total,
			orderStatus: "created",
			razorpay: {
				orderId: order.id,
			},
		});

		await newOrder.save();

		// Respond with the order ID
		res.json({ orderId: order.id });
	} catch (error) {
		console.error("Error creating Razorpay order:", error);
		res.status(500).json({ error: "Failed to create order" });
	}
});

// Payment success route
app.post("/payment-success", async (req, res) => {
	const { orderId, paymentId, signature } = req.body;

	// Your Razorpay secret key from the Razorpay dashboard
	const razorpaySecret = "manjushakale3082";
	try {
		const shasum = crypto.createHmac("sha256", razorpaySecret);
		shasum.update(`${orderId}|${paymentId}`);
		const expectedSignature = shasum.digest("hex");

		// Compare the generated signature with the one provided by Razorpay
		if (expectedSignature === signature) {
			// Find the order in the database
			const order = await Order.findOne({ "razorpay.orderId": orderId });

			if (!order) {
				return res.status(404).json({ message: "Order not found" });
			}

			// Update the order with payment details
			order.razorpay.paymentId = paymentId;
			order.razorpay.signature = signature;
			order.orderStatus = "paid";
			order.updatedAt = new Date();

			await order.save();
			res.json({ message: "Payment successful and order updated" });
		} else {
			res.status(400).json({ message: "Invalid signature, payment verification failed" });
		}
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
});


//contact form
app.post("/contact", async(req, res) => {
	
	try {
		const { email, message } = req.body;
		if (!email || !message) {
			return res.status(400).json({ error: "All fields are required" });
		}

		const newContact = new Contact({ email, message });
		await newContact.save();

		res.status(201).json({ message: "Your message has been sent successfully" });

	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}

});

// Cash on Delivery route to store home delivery orders
app.post("/cash-on-delivery", async (req, res) => {
  try {
    const { customer, cart, total } = req.body;

    // Validate the request body to ensure all fields are provided
    if (!customer|| !cart || !total) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create a new HomeDelivery record in the database
	  const newHomeDelivery = new CashOnHomeDeilvery({
	  customer,	
      cart,
      totalAmount : total,
    });

    // Save the HomeDelivery order to the database
    await newHomeDelivery.save();

    // Respond with success
    res.status(201).json({
      message: "Cash on Delivery order created successfully",
      orderId: newHomeDelivery._id, // Return the order ID
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/Cash-on-delivery-orders/:orderId/payment", async (req, res) => {
	const { orderId } = req.params;
	const { paymentStatus } = req.body;

	try {
		const updatedOrder = await CashOnHomeDeilvery.findByIdAndUpdate(
			orderId,
			{ paymentStatus },
			{ new: true }
		);

		if (!updatedOrder) {
			return res.status(404).json({ error: "Order not found" });
		}

		res.json({ message: "Payment status updated successfully", data: updatedOrder });
	} catch (error) {
		res.status(500).json({ message: "Error updating order", error: error });
	}
})

app.put("/Cash-on-delivery-orders/:orderId", async (req, res) => {
	const { orderId } = req.params;
	const { orderStatus } = req.body;
	
	try {
		const updatedOrder = await CashOnHomeDeilvery.findByIdAndUpdate(
			orderId,
			{ orderStatus },
			{ new: true },
		)

		if (!updatedOrder) {
			return res.status(404).json({ message: "Order not found" });
		}

		res.json(updatedOrder);
	} catch (error) {
		res.status(500).json({ message: "server error" });
	}
});



app.get("/Cash-on-delivery-orders", async (req, res) => {
	try {
		const orders = await CashOnHomeDeilvery.find();
		res.status(200).json({ success: true, data: orders });
	} catch (error) {
		res.status(500).json({ message: "server error" });
	}
});

//Online order
app.get("/online-orders", async (req, res) => {
	try {
		const onlineOrder = await Order.find({ orderStatus: "paid" });
		res.status(200).json({ success: true, data: onlineOrder });
	} catch (error) {
		res.status(500).json({ message: "server error" });
	}
});

app.get("/contact-queries", async (req, res) => {
	try {
		const queries = await Contact.find();
		res.json({data: queries});
	} catch (error) {
		res.status(500).json({ message: "server error" });
	}
});

app.delete("/contact-queries/:id", async (req, res) => {
	try {
		const queryId = req.params.id;
		await Contact.findByIdAndDelete(queryId);
		res.status(200).json({ message: "Query deleted successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Failed to delete query" });
	}
});


//send a mail to customers
app.post("/send-email", async (req, res) => {
	const { email, message } = req.body;

	const transporter = nodemailer.createTransport({	
		host: process.env.SMTP_HOST,
		port: process.env.SMTP_PORT,
		service: process.env.SMTP_SERVICE,
		auth: {
			user: process.env.SMTP_MAIL,
			pass: process.env.SMTP_PASS,
		},
	});

	const mailOptions = {
		from: "dipanshukale2003@gmail.com",
		to: email,
		subject: "Response to your Query",
		text: message,
	};

	try {
		await transporter.sendMail(mailOptions);
		res.status(200).json({ success: true, message: "Email sent successfully" });
	} catch (error) {
		console.error("Error sending email:", error);
		res.status(500).json({ success: false, message: "Error sending email" });
	}
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	})
	.on("error", (err) => {
		console.error("Server failed to start due to error:", err);
});
