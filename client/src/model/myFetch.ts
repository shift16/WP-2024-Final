// Defining API URLs
const ROOT_URL = 'http://localhost:3000' // TODO MUST CHANGE BACK
const API_URL = ROOT_URL + '/api/v1'

// A userful type
export type APIResponse = {
	message: string
}

export function api<T>(url: string, requestType: 'GET' | 'POST' | 'PATCH' | 'DELETE', data: object | null, sessionToken: string | null): Promise<T | APIResponse> {
	// Some error handling
	if (requestType === 'POST' || requestType === 'PATCH')
		if (data == null)
			console.error("All POST and PATCH requests should send information. Therefore, property 'data' shouldn't be null")

	if (requestType === 'GET' || requestType === 'DELETE')
		if (data != null)
			console.error("All GET and DELETE requests don't send information. Therefore, property 'data' should be null")

	// Actual api code
	let returnedPromise: Promise<T | APIResponse>

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