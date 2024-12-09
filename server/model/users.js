const { getConnection } = require('./supabase')

const conn = getConnection()

/**
 * @param {string} userHandle 
 * @param {string} userPassword
 */
async function requestUser(userHandle, userPassword) {
    return await conn
        .from('credentials')
        .select('*')
        .eq('handle', userHandle)
        .eq('password', userPassword)
}

module.exports = {
    requestUser 
}