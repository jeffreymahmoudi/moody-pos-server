'use strict';

const express = require('express')
const mongoose = require('mongoose')

const Check = require('../models/check')

const router = express.Router()

router.post('/', (req, res, next) => {
  const { tableId } = req.body

  const newCheck = { tableId }
  Check.create(newCheck)
  .then(result => {
    res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
  })
  .catch(next)
})

router.get('/', (req, res, next) => {
  Check.find({})
    .populate('orderedItems')
    .sort({ 'updatedAt': 'desc' })
    .then(results => res.json(results))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  Check.findById(id)
    .populate('orderedItems')
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    })
})

router.put('/:id/addItem', (req, res, next) => {
  const { id } = req.params
  const { itemId } = req.body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    const err = new Error('The `itemId` is not valid');
    err.status = 400;
    return next(err);
  }

  Check.findByIdAndUpdate( id,
    { $push: {orderedItems: itemId } },
    { new: true }
  )
  .populate('orderedItems')
  .then(result => {
    if (result) {
      res.json(result);
    } else {
      next();
    }
  })
  .catch(next)
})

router.put('/:id/close', (req, res, next) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  Check.findByIdAndUpdate( id,
    { closed: true}, { new: true } )
    .populate('orderedItems')
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    })
})

module.exports = router
