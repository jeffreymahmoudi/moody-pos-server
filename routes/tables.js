'use strict';

const express = require('express')

const Table = require('../models/table')

const router = express.Router()

router.get('/', (req, res, next) => {
  Table.find()
  .then(results => res.json(results))
  .catch(next)
})

module.exports = router
