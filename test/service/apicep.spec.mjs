import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import { RequestWIthFetch } from '../../src/requester/index.mjs'
import { ApiCepService } from '../../src/service/apicep/index.mjs'

describe.skip('ApiCepService', () => {
  const stub = new ApiCepService(new RequestWIthFetch())

  test('should be a valid cep', async () => {
    const result = await stub.execute('41342430')
    assert.strictEqual(result.state, 'BA')
    assert.strictEqual(result.city, 'Salvador')
  })
  test('should be a valid cep with -', async () => {
    const result = await stub.execute('41342-430')

    assert.strictEqual(result.state, 'BA')
    assert.strictEqual(result.city, 'Salvador')
  })
})
