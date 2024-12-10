// The controller for friends REST API
const router = require('express').Router()
const friendsModel = require('../model/friends')

// API URLs
const ROOT_API_URL='/friends'
const GET_FRIENDS_API_URL = '/:id'
const ADD_FRIEND_API_URL = '/:id'
const REMOVE_FRIEND_API_URL = '/:id'

router.get(GET_FRIENDS_API_URL, (req, res, next) => {
    const requestedID = Number(req.params.id)
    // Ensure the ID is an integer
    if (requestedID != parseInt(requestedID)) {
        return res.status(422).json({
            'error': 'bad-input',
            'message': 'The requested ID must be of type int'
        })
    }

    const userInfo = req.userInfo
    // Ensure that the user is either an admin or is the current user
    if (userInfo.isAdmin === false)
        if (userInfo.userId !== requestedID)
            return res.status(403).json({
                'error': 'not-authorized', 
                'message': "User does not have permission to get this user's friends"
            })
    
    friendsModel.getUserFriends(requestedID)
        .then(friends => {
            res.status(200).json(friends)
        })
        .catch(next)
})

module.exports = {
    'friendsController': router,
    'FRIENDS_ROOT_API_URL': ROOT_API_URL
}