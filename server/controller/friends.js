// The controller for friends REST API
const router = require('express').Router()
const friendsModel = require('../model/friends')
const usersModel = require('../model/users')

// API URLs
const ROOT_API_URL='/friends'
const GET_FRIENDS_API_URL = '/:id'
const ADD_FRIEND_API_URL = '/'
const REMOVE_FRIEND_API_URL = '/'

router.get(GET_FRIENDS_API_URL, (req, res, next) => {
    const requestedID = Number(req.params.id)
    // Ensure the ID is an integer
    if (requestedID != parseInt(requestedID)) {
        return res.status(422).json({
            'message': 'The requested ID must be of type int'
        })
    }

    const userInfo = req.userInfo
    // Ensure that the user is either an admin or is the current user
    if (userInfo.isAdmin === false)
        if (userInfo.userId !== requestedID)
            return res.status(403).json({
                'message': "User does not have permission to get this user's friends"
            })
    
    friendsModel.getUserFriends(requestedID)
        .then(friends => {
            res.status(200).json(friends)
        })
        .catch(next)
})

// Anyone can add another user as a friend
router.post(ADD_FRIEND_API_URL, (req, res, next) => {
    const requestedHandle = req.body.handle
    const currentUserId = req.userInfo.userId
    
    usersModel.getUserIdFromHandle(requestedHandle)
        .then(newFriendId => {
            // Ensure the handle exists
            if (newFriendId === null)
                return res.status(404).json({
                    'message': `User with the handle '${requestedHandle}' does not exist`
                })
            
            // Ensure that the user isn't trying to friend themselves
            if (newFriendId === currentUserId)
                return res.status(409).json({
                    'message': 'You cannot friend yourself'
                })
            
            // Ensure the two users aren't friends already
            friendsModel.getUserFriends(currentUserId)
                .then(friends => {
                    for (const friendRelation of friends) {
                        if (friendRelation.friend_id === newFriendId)
                            return res.status(409).json({
                                'message': 'These two users are already friends'
                            })
                    }

                    // If there are no issues, then add them as a friend
                    friendsModel.addFriend(currentUserId, newFriendId)
                        .then(_ => {
                            res.status(200).json({
                                'message': 'Added friend'
                            })
                        })
                        .catch(next)
                })
                
        })
        .catch(next)
})

router.delete(REMOVE_FRIEND_API_URL, (req, res, next) => {
    const requestedHandle = req.body.handle
    const currentUserId = req.userInfo.userId
    
    usersModel.getUserIdFromHandle(requestedHandle)
        .then(oldFriendId => {
            // Ensure the handle exists
            if (oldFriendId === null)
                return res.status(404).json({
                    'message': `User with the handle '${requestedHandle}' does not exist`
                })
            
            // Ensure the two users are friends
            friendsModel.getUserFriends(currentUserId)
                .then(friends => {
                    let isFriends = false
                    for (const friendRelation of friends) {
                        if (friendRelation.friend_id === oldFriendId)
                            isFriends = true
                    }

                    if (isFriends === false)
                        return res.status(409).json({
                            'message': 'These two users are not friends'
                        })

                    // If there are no issues, then remove them as a friend
                    friendsModel.removeFriend(currentUserId, oldFriendId)
                    .then(_ => {
                            res.status(200).json({
                                'message': 'Removedvv friend'
                            })
                        })
                        .catch(next)
                })
                
        })
        .catch(next)
})

 

module.exports = {
    'friendsController': router,
    'FRIENDS_ROOT_API_URL': ROOT_API_URL
}