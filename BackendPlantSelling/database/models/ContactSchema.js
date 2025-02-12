import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"], // Email validation
		},
		message: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export const Contact = mongoose.model("Contact", ContactSchema);
