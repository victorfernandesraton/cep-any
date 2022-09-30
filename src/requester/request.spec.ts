import { Requester } from '.'
import { describe, test, expect } from '@jest/globals'

describe('request', () => {
	test('should be make a simple request', async () => {
		const result = await Requester({ url: 'http://www.google.com' })
		expect(result.status).toEqual(200)
	})
})
