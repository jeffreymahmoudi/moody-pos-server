'use strict'

const express = require('express')

const Items = require('../models/item')

const router = express.Router()

router.get('/', (req, res, next) => {
  Items.find()
  .then(results => res.json(results))
  .catch(next)
})

module.exports = router
