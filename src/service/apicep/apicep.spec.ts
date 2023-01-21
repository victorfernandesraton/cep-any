import { describe, test, expect } from '@jest/globals'
import { RequestWIthFetch } from '../../requester'

import { ApiCepService } from './index'

describe('ApiCepService', () => {
	const stub = new ApiCepService(new RequestWIthFetch())

	test('should be a valid cep', async () => {
		const result = await stub.execute('41342320')
		expect(result.state).toBe('BA')
		expect(result.city).toBe('Salvador')
	})
	test('should be a valid cep with -', async () => {
		const result = await stub.execute('41342-320')
		expect(result.state).toBe('BA')
		expect(result.city).toBe('Salvador')
	})
})
