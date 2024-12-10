// The model used to manage a user's friends
const { getConnection } = require('./supabase')
const conn = getConnection()

async function getUserFriends(userId) {
    const { data } = await conn
        .from('friends')
        .select('*')
        .eq('user_id', userId)
    
    return data
}




module.exports = {
    getUserFriends
}