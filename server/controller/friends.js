// The controller for friends REST API
const router = require('express').Router()
const friendsModel = require('../model/friends')

// API URLs
const ROOT_API_URL='/friends'
const GET_FRIENDS_API_URL = '/get'
const ADD_FRIEND_API_URL = '/add'
const REMOVE_FRIEND_API_URL = ''