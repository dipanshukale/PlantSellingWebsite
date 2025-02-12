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

const HomeDeliveryScehma = new mongoose.Schema(
	{
		customer: {
			name: {
				type: String,
				required: true,
			},
			phone: {
				type: String,
				required: true,
			},
			address: {
				type: String,
				required: true,
			},
		},
		cart: [cartItemSchema],
		orderStatus: {
			type: String,
			enum: ["delivered", "not delivered", "failed"],
			default: "not delivered",
		},
		paymentStatus: {
			type: String,
			enum: ["unpaid", "paid", "failed"],
			default: "unpaid",
		},
		totalAmount: { type: Number, required: true },
	},
	{
		timestamps: true,
	}
);

export const CashOnHomeDeilvery = mongoose.model("HomeDeilvery", HomeDeliveryScehma);
