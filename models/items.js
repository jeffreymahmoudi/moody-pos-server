'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemsSchema = Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true }
})

itemsSchema.set('toObject', {
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
})

module.exports = mongoose.model('Items', itemsSchema)
