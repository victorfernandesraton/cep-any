import { describe, test, expect } from '@jest/globals'
import { RequestWIthFetch } from '../src/requester'

describe('request', () => {
	test('should be make a simple request', async () => {
		const stub = new RequestWIthFetch()
		const result = await stub.execute({ url: 'http://www.google.com' })
		expect(result.status).toEqual(200)
	})
})
