const mongoose = require('mongoose')
const Schema = mongoose.Schema
const todoSchema = new Schema({
  // id: number,
  name: {
    type: String,
    required: true
  },
  name_en: {
    type: String,
  },
  category: {
    type: String,
    rewuired: true
  },
  image: {
    type: String,
  },
  location: {
    type: String,
    require: true
  },
  phone: {
    type: Number,
    require: true
  },
  google_map: {
    type: Map
  },
  rating: {
    type: number
  },
  description: {
    type: String
  },
})
module.exports = mongoose.model('Todo', todoSchema)