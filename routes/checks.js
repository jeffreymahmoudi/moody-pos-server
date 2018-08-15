'use strict';

const express = require('express')
const mongoose = require('mongoose')

const Checks = require('../models/checks')

const router = express.Router()

router.get('/', (req, res, next) => {
  Checks.find({})
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

  Checks.findById(id)
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

router.post('/', (req, res, next) => {
  const { tableId } = req.body

  const newCheck = { tableId }
  Checks.create(newCheck)
  .then(result => {
    res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
  })
  .catch(next)
})

module.exports = router
