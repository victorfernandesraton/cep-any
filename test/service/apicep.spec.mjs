import { describe, test, expect } from '@jest/globals'
import { RequestWIthFetch } from '../../src/requester'

import { ApiCepService } from '../../src/service/apicep'

describe.skip('ApiCepService', () => {
	const stub = new ApiCepService(new RequestWIthFetch())

	test('should be a valid cep', async () => {
		const result = await stub.execute('41342430')
		expect(result.state).toBe('BA')
		expect(result.city).toBe('Salvador')
	})
	test('should be a valid cep with -', async () => {
		const result = await stub.execute('41342-430')
		expect(result.state).toBe('BA')
		expect(result.city).toBe('Salvador')
	})
})

