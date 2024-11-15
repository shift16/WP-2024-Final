export async function rest(url) {
	const data = await fetch(url)
	return await data.json()
}