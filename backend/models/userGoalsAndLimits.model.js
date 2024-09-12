import mongoose from "mongoose";

const userGoalsAndLimitsSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
		unique: true,  // Each user should have one set of goals and limits
	},
	goals: {
		saving: { type: Number, default: 0 },
		expense: { type: Number, default: 0 },
		investment: { type: Number, default: 0 },
	},
	limits: {
		saving: { type: Number, default: 0 },
		expense: { type: Number, default: 0 },
		investment: { type: Number, default: 0 },
	},
});

const UserGoalsAndLimits = mongoose.model("UserGoalsAndLimits", userGoalsAndLimitsSchema);

export default UserGoalsAndLimits;
