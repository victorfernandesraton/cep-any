import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import { RequestWIthFetch } from '../src/requester/index.mjs'

describe('request', () => {
  test('should be make a simple request', async () => {
    const stub = new RequestWIthFetch()
    const result = await stub.execute({ url: 'http://www.google.com' })
    assert.strictEqual(result.status, 200)
  })
})
