const { Router } = require('express')
const controller = require('./dna.controller')
const router = Router()

router.post('/mutation', controller.findOrCreate)

router.get('/stats', controller.getStats)

module.exports = router
