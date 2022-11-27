import { describe, it, expect, jest } from '@jest/globals'
import { Cep } from '../entity'
import { ParamError } from '../errors/paramError'
import { CepService } from './index'



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
})