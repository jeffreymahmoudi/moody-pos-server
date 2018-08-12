'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tablesSchema = Schema({
  number: {type: Number, required: true, unique: true }
})

tablesSchema.set('toObject', {
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
})

module.exports = mongoose.model('Tables', tablesSchema)
