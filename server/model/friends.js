
async function getUserFriends(userId) {
    return await conn
        .from('friends')
        .select('*')
        .eq('user_id', userId)
}