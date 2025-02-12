import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true,
	},

	category: { type: String },
	title: { type: String, required: true },
	price: { type: Number, required: true },
	quantity: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema(
	{
		customer: {
			name: { type: String, required: true },
			address: { type: String, required: true },
			phone: { type: String, required: true },
		},
		cart: [cartItemSchema],
		totalAmount: { type: Number, required: true },
		orderStatus: {
			type: String,
			enum: ["created", "paid", "failed"],
			default: "created",
		},
		razorpay: {
			orderId: { type: String, required: true },
			paymentId: { type: String },
			signature: { type: String },
		},
	},
	{
		timestamps: true,
	}
);

export const Order = mongoose.model("Order", orderSchema);
