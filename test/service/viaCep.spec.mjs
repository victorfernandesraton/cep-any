import { describe, test, expect } from '@jest/globals'
import { RequestWIthFetch } from '../../src/requester/index.mjs'

import { ViaCepService } from '../../src/service/viacep'

describe('ViaCepService', () => {
	const stub = new ViaCepService(new RequestWIthFetch())

	test('should be a valid cep', async () => {
		const result = await stub.execute('41342430')
		expect(result.state).toEqual('BA')
	})
	test('should be a valid cep with -', async () => {
		const result = await stub.execute('41342-430')
		expect(result.state).toEqual('BA')
		expect(result.city).toEqual('Salvador')
	})
})
