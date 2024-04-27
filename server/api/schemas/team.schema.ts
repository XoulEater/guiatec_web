import mongoose, { Schema } from "mongoose";
// TODO: delete this file
const teamSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
// Create and export the Teacher model
export default mongoose.model("Team", teamSchema);

// {
//   "id" : "T1",
//   "name" : "Team 1",
//   "description" : "This is the first team",
//   "workPlans" : ["WP1", "WP2"],
//   "members" : [{
//   "name" : "Teacher 1",
//   "email" : "hola@gmail.com  ",
//   "password" : "12345",
//   "photo" : "https://images.pexels.com",
//   "officePNumber" : "123456",
//   "personalPNumber" : "123456",
//   "isLeader" : false,
//   "campus" : "AL"
// }]
// }
