const userData = require('')
const { getConnection } = require('./supabase')

const conn = getConnection()

// Some API stuff
// conn.from('the_name_of_row?').select("*") I'm assuming the wildcard collects everything
// and conn.from gets data from a row