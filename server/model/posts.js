
async function getUserPosts(userId) {
    return await conn
        .from('posts')
        .select('*')
        .eq('user_id', userId)
}