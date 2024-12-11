// The model for getting data on user's posts
const { getConnection } = require('./supabase')
const conn = getConnection()

async function getAllUserPosts(userId) {
    const { data } = await conn
        .from('posts')
        .select('*')
        .eq('user_id', userId)

    return data
}

async function addPost(userId, newPost) {
    const { error } = await conn
        .from('posts')
        .insert([{
            'user_id': userId,
            ...newPost
        }])
    
    return error
}

// Internal helper function
async function getPost(userId, postId) {
    const { data } = await conn
        .from('posts')
        .select('*')
        .eq('user_id', userId)
        .eq('post_id', postId)

    return data
}

async function deletePost(userId, postId) {
    if (await getPost(userId, postId) === null)
        return 'Post does not exist'

    const { error } = await conn
        .from('posts')
        .delete()
        .eq('user_id', userId)
        .eq('post_id', postId)
    
    return error
}

async function editPost(userId, postId, newPost) {
    const { error } = await conn
        .from('posts')
        .update({
            ...(newPost.content ? {'content': newPost.content} : {}),
            ...(newPost.post_date ? {'post_date': newPost.post_date} : {}),
            ...(newPost.steps_taken ? {'steps_taken': newPost.steps_taken} : {}),
            ...(newPost.distance_traveled ? {'distance_traveled': newPost.distance_traveled} : {}),
            ...(newPost.calories_burned ? {'calories_burned': newPost.calories_burned} : {}),
            ...(newPost.active_minutes ? {'active_minutes': newPost.active_minutes} : {}),
            ...(newPost.workout_intensity ? {'workout_intensity': newPost.workout_intensity} : {}),
        })
        .eq('user_id', userId)
        .eq('post_id', postId)

    return error
}

module.exports = {
    getAllUserPosts,
    addPost,
    deletePost,
    editPost
}