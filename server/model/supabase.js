require("dotenv").config()
const { createClient } = require('@supabase/supabase-js')

console.log(process.env.SUPABASE_URL)

module.exports = {
	getConnection() {
		return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERET_KEY)
	}
}