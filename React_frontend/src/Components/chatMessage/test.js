// let docs = await this.model.aggregate([{ $match: { user_id: mongoose.Types.ObjectId(req.user) } }]).sort({ createdAt: -1 }).group(
//   {
//     _id: '$phone_number',
//     message: { $first: "$message" },
//     contact_id: { $first: "$contact_id" },
//     createdAt: { $first: "$createdAt" },
//     twilio_number: { $first: "$twilio_number" },
//     is_view: { $first: "$is_view" }
//   },
// );

