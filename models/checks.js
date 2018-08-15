'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const checksSchema = new Schema({
  tableId: { type: Schema.Types.ObjectId, ref: 'Table', required: true },
  orderedItems: [
    {
      voided: { type: Boolean, default: false },
      itemId: { type: Schema.Types.ObjectId, ref: 'Items' }
    }
  ],
  closed: { type: Boolean, default: false }
}, { timestamps: true })

checksSchema.set('toObject', {
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
})

module.exports = mongoose.model('Checks', checksSchema)
