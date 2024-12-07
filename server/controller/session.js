// Handles all session management

// External functions being used
const { requestUser } = require("../model/users")
require('dotenv').config()
const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()


/**
 * @typedef Session
 * @property {string} userHandle
 * @property {string} token
 */

/**
 * An array of session objects.
 * @type {Session[]}
*/

let sessions = []

/**
 * 
 * @param {string} userHandle
 * @param {string} token 
 */
function registerSession(userHandle, token) {
    sessions.push({
        "userHandle": userHandle,
        "token": token
    })
}

/**
 * 
 * @param {string} token 
 * @returns {Session}
 */

function getSession(token) {
    return sessions.filter((value) => {
        return value.token === token
    })
}

/**
 * 
 * @param {string} token 
 */
function removeSession(token) {
    sessions = sessions.filter((value) => {
        return value.token !== token
    })
}

/**
 * @param {string} token
 */
function verifySessionToken(token) {   
    console.log(jwt.verify(token, SECRET_KEY))
}


router.post("/request-session", (req, res) => {
    /**
     * @type UserLogin
    */
    const { userHandle, userPassword } = req.body

    if (typeof userHandle !== 'string')
        res.status(400).send('Bad Request')

    if (typeof userPassword !== 'string')
        res.status(400).send('Bad Request')
    
    requestUser(userHandle, userPassword)
        .then((postResponse) => {
            const data = postResponse.data

            if (data.length != 0) {
                const token = jwt.sign(
                    userHandle,
                    process.env.JWT_SECRET_KEY
                )
                registerSession(userHandle, token)

                res.status(200).send({ 'token': token })

            } else {
                res.status(400).send({ 'status': 'User does not exist!\n'})
            }
        })
})

module.exports = {
    router,
    getSession,
    removeSession
}