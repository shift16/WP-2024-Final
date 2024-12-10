// The controller for session REST API
const usersModel = require('../model/users')
const { registerTokenWithId } = require('../middleware/jwt')
const router = require('express').Router()

// API URLs
const ROOT_API_URL = '/session'
const REQUEST_TOKEN_API_URL = '/request-token'

router.post(REQUEST_TOKEN_API_URL, (req, res, next) => {
    const { userHandle, userPassword } = req.body

    if (typeof userHandle != 'string') {
        return res.status(422).json({ 
            error: 'bad-input', 
            message: 'Username is not of type string' 
        })
    }

    if (typeof userPassword != 'string') {
        return res.status(422).json({
            error: 'bad-input',
            message: 'Password is not of type string' 
        })
    }
    
    return usersModel.getUserIdFromCredentials(userHandle, userPassword)
        .then(userId => {
            if (userId != null)
                res.status(200).json({'token': registerTokenWithId(userId)})
            else
                res.status(401).json({
                        error: 'bad-input',
                        message: 'Username or password incorrect'
                    })
            })
        .catch(next)
})

module.exports = { 
    'sessionController': router, 
    'SESSION_ROOT_API_URL': ROOT_API_URL 
}