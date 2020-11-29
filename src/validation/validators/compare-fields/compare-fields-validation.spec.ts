import { CompareFieldsValidation } from './compare-fields-validation'
import { InvalidFieldError } from '@/validation/errors'

import faker from 'faker'

const makeSut = (field: string, valueToCompare: string): CompareFieldsValidation => new CompareFieldsValidation(field, valueToCompare)

describe('CompareFieldsValidation', () => {
    test('Should return error if compare is invalid', () => {
        const field = faker.database.column()
        const fieldToCompare = faker.database.column()
        const sut = makeSut(field, fieldToCompare)
        const error = sut.validate({
            [field]: 'any_value',
            [fieldToCompare]: 'other_value'
        })

        expect(error).toEqual(new InvalidFieldError())
    })

    test('Should return falsy if compare is valid', () => {
        const valueToCompare = faker.random.word()
        const field = faker.database.column()
        const fieldToCompare = faker.database.column()
        const sut = makeSut(field, fieldToCompare)
        const error = sut.validate({
            [field]: valueToCompare,
            [fieldToCompare]: valueToCompare
        })

        expect(error).toBeFalsy()
    })
})
