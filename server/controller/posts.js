// The controller for the posts REST API
const router = require('express').Router()
const postsModel = require('../model/posts')
const friendsModel = require('../model/friends')
const usersModels = require('../model/users')

// API URLs
const ROOT_API_URL= '/posts'
const GET_ALL_USER_POSTS_API_URL= '/all/:id'
const GET_FRIENDS_POSTS='/friends'
const ADD_USER_POST_API_URL= '/'
const DELETE_USER_POST_API_URL = '/:id'
const UPDATE_POST_API_URL = '/:id'

router.get(GET_ALL_USER_POSTS_API_URL, (req, res, next) => {
    const requestedID = Number(req.params.id)
    
    // Ensure the ID is an integer
    if (requestedID != parseInt(requestedID)) {
        return res.status(422).json({
            'message': 'The requested ID must be of type int'
        })
    }

    // Ensure the user requested is the current user
    const userInfo = req.userInfo

    if (userInfo.userId !== requestedID)
        return res.status(403).json({
            'message': "Only the logged in user's posts can be requested at once"
        })
    
    postsModel.getAllUserPosts(requestedID)
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(next)
})

router.get(GET_FRIENDS_POSTS, (req, res, next) => {
    const currentUserId = req.userInfo.userId

    friendsModel.getUserFriends(currentUserId)
        .then(friends => {
            const friendsPosts = {}
            let friendsAdded = 0

            for (const friend of friends) {
                const friendId = friend.friend_id

                postsModel.getAllUserPosts(friendId)
                    .then(posts => {
                        usersModels.getUserInfo(friendId)
                            .then(userInfo => {
                                friendsPosts[userInfo.handle] = posts
                                friendsAdded++
        
                                if (friendsAdded === friends.length)
                                    res.status(200).json(friendsPosts)
                            })
                            .catch(next)
                    })
                    .catch(next)
            }
        })
        .catch(next) // /\ Callback hell!
})

router.post(ADD_USER_POST_API_URL, (req, res, next) => {
    const currentUserId = req.userInfo.userId
    const newPost = req.body

    postsModel.addPost(currentUserId, newPost)
        .then(error => {
            console.log(error)
            if (error == null)
                res.status(200).json({
                    'message': 'Post added'
                })
            else
                res.status(400).json(error)
        })
        .catch(next)
})

router.delete(DELETE_USER_POST_API_URL, (req, res, next) => {
    const currentUserId = req.userInfo.userId
    const requestedPostId = req.params.id
    
    postsModel.deletePost(currentUserId, requestedPostId)
        .then(error => {
            if (error == null)
                res.status(200).json({
                    'message': 'Post removed'
                })
            else
                res.status(400).json(error)
        })
        .catch(next)

})

router.patch(UPDATE_POST_API_URL, (req, res, next) => {
    const currentUserId = req.userInfo.userId
    const requestedPostId = req.params.id
    const updatedPost = req.body

    postsModel.editPost(currentUserId, requestedPostId, updatedPost)
        .then(error => {
            if (error == null)
                res.status(200).json({
                    'message': 'Post updated'
                })
            else
                res.status(400).json(error)
        })
        .catch(next)
})

module.exports = {
    'postsController': router,
    'POSTS_ROOT_API_URL': ROOT_API_URL
}