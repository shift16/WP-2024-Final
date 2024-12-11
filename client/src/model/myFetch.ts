// Defining API URLs
const ROOT_URL = 'https://wp-2024-final.onrender.com' // TODO MUST CHANGE
const API_URL = ROOT_URL + '/api/v1'

export function api<T>(url: string, requestType: 'GET' | 'POST' | 'PATCH' | 'DELETE', data: object | null, sessionToken: string | null): Promise<T> {
	// Some error handling
	if (requestType === 'POST')
		if (data == null)
			console.error("All POST requests should send information. Therefore, property 'data' shouldn't be null")

	if (requestType === 'GET')
		if (data != null)
			console.error("All GET requestions request information. Therefore, property 'data' should be null")

	// Actual api code
	let returnedPromise: Promise<T>

	if (data != null) {
		returnedPromise = fetch(API_URL + url, {
			method: requestType,
			headers: {
				'Content-Type': 'application/json',
				...(sessionToken != null ? {'Authorization': `Bearer ${sessionToken}`} : {})
			},
			body: JSON.stringify(data)
		}).then((x) => x.json())
	} else {
		returnedPromise = fetch(API_URL + url, {
			method: requestType,
			headers: {
				'Content-Type': 'application/json',
				...(sessionToken != null ? {'Authorization': `Bearer ${sessionToken}`} : {})
			}
		}).then((x) => x.json())
	}

	return returnedPromise
}