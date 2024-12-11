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

async function addFriend(currentUserId, newFriendId) {
    await conn
        .from('friends')
        .insert([
            {
                'user_id': currentUserId,
                'friend_id': newFriendId
            },
            {
                'user_id': newFriendId,
                'friend_id': currentUserId
            }
        ])
}

async function removeFriend(currentUserId, removedFriendId) {
    await conn
        .from('friends')
        .delete()
        .eq('user_id', currentUserId)
        .eq('friend_id', removedFriendId)
    
    await conn
        .from('friends')
        .delete()
        .eq('user_id', removedFriendId)
        .eq('friend_id', currentUserId)
}


module.exports = {
    getUserFriends,
    addFriend,
    removeFriend
}