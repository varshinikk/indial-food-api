import mongoose from 'mongoose'

const Schema = mongoose.Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: "Name required"
  },
  phone_number: {
    type: String,
    required: "Phone Number required"
  },
  email: {
    type: String,
    required: "Email required"
  },
  password: {
    type: String,
    required: "Password required"
  }
})

export default UserSchema;