const logger = (req, res, next) => {
    console.log(`body: ${JSON.stringify(req.body)}`)

    return next()
}

const logParam = (req, res, next) => {
    console.log(`body: ${JSON.stringify(req.body)}`)

    return next()
}

module.exports = {logger, logParam}