import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { ParamError } from '../src/errors/paramError.mjs'
import { RequestWIthFetch } from '../src/requester/index.mjs'
import { CepService } from '../src/service/index.mjs'

describe('index.ts', () => {
  const invalidCases = ['555', 'text', '']
  describe.skip('validation static', () => {
    it('test parse is valid case', () => {
      ['41342430', '41.342.430', '41.342-430'].forEach(arg => {
        const data = CepService.generalParse(arg)
        assert.strictEqual(data, '41342430')
        assert.strictEqual(CepService.validateCep(data), true)
      })
    })
  })
  it.skip('test parse is not valid case', () => {
    invalidCases.forEach(arg => {
      assert.strictEqual(CepService.validateCep(CepService.generalParse(arg)), false)
    })
  })
  it('validate instances', () => {
    class CepServiceInstance extends CepService {
      async handler (_cep) {
        return {
          cep: '88888888',
          city: 'something',
          neighborhood: 'something',
          street: 'something',
          state: 'something'
        }
      }
    }
    const stub = new CepServiceInstance('test', new RequestWIthFetch())
    invalidCases.forEach(arg => {
      assert.rejects(async () => { await stub.execute(arg) }, new ParamError(arg))
    })
  })
})
