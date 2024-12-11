// The controller for session REST API
const usersModel = require('../model/users')
const { registerTokenWithId } = require('../middleware/jwt')
const router = require('express').Router()

// API URLs
const ROOT_API_URL = '/session'
const LOGIN_API_URL = '/login'
const SIGN_UP_API_URL = '/signup'

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

router.post(SIGN_UP_API_URL, (req, res, next) => {
    let { picture, email, full_name, handle, password } = req.body
    picture = picture ? picture : 'default'
    
    if (email == null)
        return res.status(400).json({
            'message': 'Property "email" was not provided'
        })
    
    if (full_name == null)
        return res.status(400).json({
            'message': 'Property "full_name" was not provided'
        })

    if (handle == null)
        return res.status(400).json({
            'message': 'Property "handle" was not provided'
        })

    if (password == null)
        return res.status(400).json({
            'message': 'Property "password" was not provided'
        })

    const newUser = {
        'picture': picture,
        'email': email,
        'full_name': full_name,
        'handle': handle,
        'password': password
    }

    usersModel.addNewUser(newUser)
        .then(error => {
            if (error != null)
                res.status(400).json(error)
            else {
                usersModel.getUserFromCredentials(handle, password)
                    .then(user => {
                        res.status(200).json({
                            'token': registerTokenWithId(
                                user.user_id,
                                false // Only existing admins can make other users admins
                            )
                    })
                })
                .catch(next)
            }
        })
        .catch(next)
})

module.exports = { 
    'sessionController': router, 
    'SESSION_ROOT_API_URL': ROOT_API_URL 
}