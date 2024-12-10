// The controller for user REST API
const router = require('express').Router()
const usersModel = require('../model/users')

// API URLs
const ROOT_API_URL = '/users'
const GET_ALL_USERS_API_URL = '/all'
const GET_USER_API_URL = '/:id'
const ADD_USER_API_URL = '/'
const UPDATE_USER_API_URL = '/:id'
const DELETE_USER_API_URL = '/:id'

router.get(GET_ALL_USERS_API_URL, (req, res, next) => {
    // Ensure the user is an Admin
    const userInfo = req.userInfo
    if (userInfo.isAdmin === false)
        return res.status(403).json({
            'error': 'not-authorized',
            'message': "User does not have permission to get all user's info"
        })
    
    usersModel.getAllUsers()
        .then(users => {
            return res.status(200).json(users)
        })
        .catch(next)
})

router.get(GET_USER_API_URL, (req, res, next) => {
    const requestedID = Number(req.params.id)
    
    // Ensure the ID is an integer
    if (requestedID != parseInt(requestedID)) {
        return res.status(422).json({
            'error': 'bad-input',
            'message': 'The requested ID must be of type int'
        })
    }
    
    const userInfo = req.userInfo

    // Ensure the user is either an Admin or is the current user
    if (userInfo.isAdmin === false)
        if (userInfo.userId !== requestedID)
            return res.status(403).json({
                'error': 'not-authorized', 
                'message': "User does not have permission to get this user's info"
            })

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

// Anyone can use this API
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
    
    const userInfo = req.userInfo

    // Ensure the current user is an Admin to use this API
    if (userInfo.isAdmin === false)
        return res.status(403).json({
            'error': 'not-authorized',
            'message': "User is not authorized to update user's info"
        })
    
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

    const userInfo = req.userInfo
    // Ensure the current user is an Admin to use this API
    if (userInfo.isAdmin === false)
        return res.status(403).json({
            'error': 'not-authorized',
            'message': "User is not authorized to update user's info"
        })

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