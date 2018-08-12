'use strict';

const express = require('express')

const Tables = require('../models/tables')

const router = express.Router()

router.get('/', (req, res, next) => {
  Tables.find({})
  .then(results => res.json(results))
  .catch(next)
})

module.exports = router
