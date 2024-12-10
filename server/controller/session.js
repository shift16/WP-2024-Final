// The controller for session REST API
const usersModel = require('../model/users')
const { registerTokenWithId } = require('../middleware/jwt')
const router = require('express').Router()

// API URLs
const ROOT_API_URL = '/session'
const LOGIN_API_URL = '/login'
const SIGN_UP_API_URL = '/signup' // TODO

router.post(LOGIN_API_URL, (req, res, next) => {
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
    
    return usersModel.getUserFromCredentials(userHandle, userPassword)
        .then((user) => {
            if (user != null)
                res.status(200).json({'token': registerTokenWithId(user.user_id, user.is_admin)})
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