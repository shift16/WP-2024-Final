// The controller for session management
const sessionModel = require('../model/session')
const express = require('express')
const router = express.Router()

// API URLs
const ROOT_API_URL = '/login'
const REQUEST_SESSION_API_URL = '/request-session'

router.post(REQUEST_SESSION_API_URL, (req, res) => {
    const { userHandle, userPassword } = req.body

    if (typeof userHandle != 'string') {
        res.status(422).send({ 
            error: 'bad-input', 
            message: 'Username is not of type string' 
        })
        return // Stop execution
    }

    if (typeof userPassword != 'string') {
        res.status(422).send({
            error: 'bad-input',
            message: 'Password is not of type string' 
        })
        return // Stop execution
    }
    
    sessionModel.registerSession(userHandle, userPassword)
        .then(token => {
            if (token != null)
                res
                    .status(200)
                    .send({'token': token})
            else
                res
                    .status(401)
                    .send({
                        error: 'bad-input',
                        message: 'Username or password incorrect'
                    })
        })
})

module.exports = { 'sessionController': router, 'SESSION_ROOT_API_URL': ROOT_API_URL }