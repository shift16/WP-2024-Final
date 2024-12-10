// The controller for user REST API
const router = require('express').Router()
const usersModel = require('../model/users')

// API URLs
const ROOT_API_URL = '/users'
const GET_USER_API_URL = '/:id'
const ADD_USER_API_URL = '/'
const UPDATE_USER_API_URL = '/:id'
const DELETE_USER_API_URL = '/:id'

router.get(GET_USER_API_URL, (req, res, next) => {
    const requestedID = Number(req.params.id)
    
    // Ensure the ID is an integer
    if (requestedID != parseInt(requestedID)) {
        return res.status(422).json({
            'error': 'bad-input',
            'message': 'The requested ID must be of type int'
        })
    }

    usersModel.getUserInfo(requestedID)
        .then(userInfo => {
            if (userInfo != null)
                res.status(200).json(userInfo)
            else
                res.status(404).json({
                    'error': 'bad-input',
                    'message': 'User does not exist'
                })
        })
        .catch(next)
})

router.post(ADD_USER_API_URL, (req, res, next) => {
    usersModel.addNewUser(req.body)
        .then(error => {
            if (error == null)
                res.status(200).json('User added')
            else
                res.status(400).json(error)
        })
        .catch(next)
})

router.patch(UPDATE_USER_API_URL, (req, res, next) => {
    const requestedID = Number(req.params.id)
    
    // Ensure the ID is an integer
    if (requestedID != parseInt(requestedID)) {
        return res.status(422).json({
            'error': 'bad-input',
            'message': 'The requested ID must be of type int'
        })
    }

    usersModel.updateUserInformation(requestedID, req.body)
        .then(error => {
            if (error == null)
                res.status(200).json('User updated')
            else
                res.status(400).json(error)
        })
        .catch(next)
})

router.delete(DELETE_USER_API_URL, (req, res, next) => {
    const requestedID = Number(req.params.id)
    
    // Ensure the ID is an integer
    if (requestedID != parseInt(requestedID)) {
        return res.status(422).json({
            'error': 'bad-input',
            'message': 'The requested ID must be of type int'
        })
    }

    usersModel.deleteUser(requestedID)
        .then(error => {
            if (error == null)
                res.status(200).json('User deleted')
            else
                res.status(400).json(error)
        })
        .catch(next)
})

module.exports = {
    'usersController': router,
    'USER_ROOT_API_URL': ROOT_API_URL
}