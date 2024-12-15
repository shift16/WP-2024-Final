// The controller for users REST API
const router = require('express').Router()
const usersModel = require('../model/users')

// API URLs
const ROOT_API_URL = '/users'
const GET_ALL_USERS_API_URL = '/all'
const GET_MY_INFO_API_URL = '/me'
const GET_USER_API_URL = '/:id'
const UPDATE_USER_API_URL = '/:id'
const DELETE_USER_API_URL = '/:id'

router.get(GET_ALL_USERS_API_URL, (req, res, next) => {
    // Ensure the user is an Admin, or only send public information
    const userInfo = req.userInfo
    if (userInfo.isAdmin === true) {
        usersModel.getAllUsers()
            .then(users => {
                return res.status(200).json(users)
            })
            .catch(next)
    } else {
        usersModel.getAllUsers()
            .then(users => {
                users = users.map(userToModify => {
                    return {
                        'user_id': userToModify.user_id,
                        'picture': userToModify.picture,
                        'email': userToModify.email,
                        'full_name': userToModify.full_name,
                        'handle': userToModify.handle
                    }
                })
                
                return res.status(200).json(users)
            })
            .catch(next)
    }
})

router.get(GET_MY_INFO_API_URL, (req, res, next) => {
    const userInfo = req.userInfo
    
    usersModel.getUserInfo(userInfo.userId)
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
            'message': 'The requested ID must be of type int'
        })
    }
    
    const userInfo = req.userInfo

    // Ensure the user is either an Admin or is the current user, if not, only return public information on the user
    if (userInfo.isAdmin === false)
        if (userInfo.userId !== requestedID)
            return usersModel.getUserInfo(requestedID)
                .then(userInfo => {
                    if (userInfo != null)
                        res.status(200).json({
                            'user_id': userInfo.user_id,
                            'picture': userInfo.picture,
                            'email': userInfo.email,
                            'full_name': userInfo.full_name,
                            'handle': userInfo.handle
                        })
                    else
                        res.status(404).json({
                            'message': 'User does not exist'
                        })
                })

    usersModel.getUserInfo(requestedID)
        .then(userInfo => {
            if (userInfo != null)
                res.status(200).json(userInfo)
            else
                res.status(404).json({
                    'message': 'User does not exist'
                })
        })
        .catch(next)
})

router.patch(UPDATE_USER_API_URL, (req, res, next) => {
    const requestedID = Number(req.params.id)
    
    // Ensure the ID is an integer
    if (requestedID != parseInt(requestedID)) {
        return res.status(422).json({
            'message': 'The requested ID must be of type int'
        })
    }
    
    const userInfo = req.userInfo

    // Ensure the current user is an Admin to use this API
    if (userInfo.isAdmin === false)
        return res.status(403).json({
            'message': "User is not authorized to update user's info"
        })
    
    usersModel.updateUserInformation(requestedID, req.body)
        .then(error => {
            if (error == null)
                res.status(200).json({ message: 'User updated'})
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
            'message': 'The requested ID must be of type int'
        })
    }

    const userInfo = req.userInfo
    // Ensure the current user is an Admin to use this API
    if (userInfo.isAdmin === false)
        return res.status(403).json({
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