const { getUsers, addUser, updateUser, deleteUser } = require('../controllers/users')

const router = require('express').Router()
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler: (req, res, next, opt) => {
        const keyOfHits = Object.keys(opt.store.hits)

        if (keyOfHits.length > 2) {
            return res.status(499).json({
                message: `Too many request, max request is ${opt.max}`
            })
        } else {
            return next()
        }
    }
})


router.get('/', limiter, getUsers)
router.post('/', limiter, addUser)
router.patch('/:id', limiter, updateUser)
router.delete('/:id', limiter, deleteUser)

module.exports = router