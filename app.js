require('dotenv').config()

const express = require('express')
require('express-group-routes');
const { logParam } = require('./middlewares/logger')
const winston = require('winston');
const { combine, timestamp, label, prettyPrint } = winston.format;
const path = require('path')

const logger = winston.createLogger({
    format: combine(
        label({ label: 'right meow!' }),
        timestamp(),
        prettyPrint()
    ),
    level: 'info',
    defaultMeta: { service: 'order-service' },
    transports: [
      new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    ],
});

const userRouter = require('./routes/users')
const orderRouter = require('./routes/orders');

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/public', express.static(path.join('.', 'public')))
app.use(logParam)
app.set('view engine', 'ejs')

app.get('/hello', (req, res, next) => {
    return res.status(200).json({
        message: 'Hello World from hot reload'
    })
})

app.use('/orders', orderRouter)

app.group('/api/v1', (router) => {
    router.use('/users', userRouter)
})

// 404 middleware
app.use('*', (req, res, next) => {
    return res.status(404).json({
        message: 'endpoint not found'
    })
})

// error middleware
app.use((err, req, res, next) => {
    logger.error(JSON.stringify(err))

    const status = err.code || 500
    const message = err.message || 'internal server error'

    return res.status(status).json({
        message
    })
})

module.exports = app