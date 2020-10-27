module.exports = (req, res, next) => {

    // add code for middleware
    res.sendResponse = (data, message = null, status = 200) => {
        return res.status(status).send({
            success: true,
            data: data,
            message: message
        })
    }

    res.sendError = (errors, message = null, status = 400) => {
        return res.status(status).send({
            success: false,
            errors: errors,
            message: message
        })
    }

    return next() // use next to go next router
}
