import { describe, it, expect } from '@jest/globals'
import { ParamError } from '../src/errors/paramError'
import { RequestWIthFetch } from '../src/requester'
import { CepService } from '../src/service/index'

describe('index.ts', () => {
	const invalidCases = [['555'], ['text'], ['']]
	describe('validation static', () => {
		describe('test parse is valid case', () => {
			it.each([['41342430'], ['41.342.430'], ['41.342-430']])('validate format with %p', (arg) => {
				const data = CepService.generalParse(arg)
				expect(data).toEqual('41342430')
				expect(CepService.validateCep(data)).toBeTruthy()
			})
		})
		describe('test parse is not valid case', () => {
			it.each(invalidCases)('validate format with %p', (arg) => {
				expect(CepService.validateCep(CepService.generalParse(arg))).toBeFalsy()
			})
		})
	})
	describe('validate instances', () => {
		class CepServiceInstance extends CepService {
			async handler(_cep) {
				return {
					cep: '88888888',
					city: 'something',
					neighborhood: 'something',
					street: 'something',
					state: 'something',
				}
			}
		}
		const stub = new CepServiceInstance('test', new RequestWIthFetch())
		it.each(invalidCases)('validate error emition with %p as params', (arg) => {
			expect(stub.execute(arg)).rejects.toThrowError(new ParamError(arg))
		})
	})
})