'use strict'

const express = require('express')

const Menu = require('../models/menu')

const router = express.Router()

router.get('/', (req, res, next) => {
  Menu.find({})
  .then(results => res.json(results))
  .catch(next)
})

module.exports = router
