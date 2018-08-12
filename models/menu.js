'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const menuSchema = Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true }
})

menuSchema.set('toObject', {
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
})

module.exports = mongoose.model('Menu', menuSchema)
