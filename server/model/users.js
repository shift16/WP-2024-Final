// The model for getting data on the user
const { getConnection } = require('./supabase')
const conn = getConnection()

async function getUserFromCredentials(userHandle, userPassword) {
    const { data } = await conn
        .from('users')
        .select('*')
        .eq('handle', userHandle)
        .eq('password', userPassword)

    if (data.length == 1)
        return data[0]
    else
        return null
}

async function getUserInfo(userId) {
    const { data } = await conn
        .from('users')
        .select('*')
        .eq('user_id', userId)

    if (data.length == 1)
        return data[0]
    else
        return null
}

async function getAllUsers() {
    const { data } = await conn
        .from('users')
        .select('*')

    return data
}

async function addNewUser(newUser) {
    const { error } = await conn
        .from('users')
        .insert([newUser])

    return error
}

// Helper function found from StackOverflow
function isObjEmpty(obj) {
    for (let prop in obj)
        if (Object.hasOwn(obj, prop))
            return false

    return true
}

async function updateUserInformation(userId, newInfo) {
    if (isObjEmpty(newInfo))
        return 'JSON is empty'

    const { error } = await conn
        .from('users')
        .update({
            ...(newInfo.picture ? { 'picture': newInfo.picture } : {}),
            ...(newInfo.email ? { 'email': newInfo.email } : {}),
            ...(newInfo.full_name ? { 'full_name': newInfo.full_name } : {}),
            ...(newInfo.is_admin ? { 'is_admin': newInfo.is_admin } : {}),
            ...(newInfo.total_steps_taken ? { 'total_steps_taken': newInfo.total_steps_taken } : {}),
            ...(newInfo.total_calories_burned ? { 'total_calories_burned': newInfo.total_calories_burned } : {}),
            ...(newInfo.total_active_minutes ? { 'total_active_minutes': newInfo.total_active_minutes } : {}),
            ...(newInfo.average_intensity ? { 'average_intensity': newInfo.average_intensity } : {}),
            ...(newInfo.handle ? { 'handle': newInfo.handle } : {}),
            ...(newInfo.password ? { 'password': newInfo.password } : {}),
        })
        .eq('user_id', userId)

    return error
}

async function deleteUser(userId) {
    if (await getUserInfo(userId) == null) {
        return 'User does not exist'
    }

    const { error } = await conn
        .from('users')
        .delete()
        .eq('user_id', userId)

    return error
}

async function getUserIdFromHandle(userHandle) {
    const { data } = await conn
        .from('users')
        .select('*')
        .eq('handle', userHandle)
    
    if (data.length === 1)
        return data[0].user_id
    else
        return null
}

module.exports = {
    getUserFromCredentials,
    getUserInfo,
    addNewUser,
    updateUserInformation,
    deleteUser,
    getAllUsers,
    getUserIdFromHandle
}