// The model for session management
const { requestUser } = require("./users")
const jwt = require('jsonwebtoken')
require('dotenv').config()

/**
 * @param {string} userHandle
 * @param {string} userPassword 
 * @return {Promise<string> | Promise<null>}
 */
async function registerSession(userHandle, userPassword) {
    const registeredSession = await requestUser(userHandle, userPassword)
    const requestedCredential = registeredSession.data[0]

    if (requestedCredential != null) {
        const token = jwt.sign(
            { data: userHandle },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        )
        return token
    } else {
        return null
    }
}

/**
 * @param {string} token
 * @returns {string | null}
 */
function getSession(token) {
    let session
    try {
        session = jwt.verify(token, process.env.JWT_SECRET_KEY)
    } catch (error) {
        if (error.name == 'JsonWebTokenError')
            session = null
    }

    return session
}

module.exports = {
    getSession,
    registerSession
}