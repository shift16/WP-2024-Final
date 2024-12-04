const API_URL = 'http://localhost:3000/api/v1/' // TODO: MUST CHANGE

// export function rest<T>


export function api<T>(url: string, requestType: 'GET' | 'POST', data: any | null): Promise<T> {
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
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		}).then((x) => x.json())
	} else {
		returnedPromise = fetch(API_URL + url, {
			method: requestType,
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((x) => x.json())
	}

	return returnedPromise
}