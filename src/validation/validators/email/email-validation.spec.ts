import { EmailValidation } from './email-validation'
import { InvalidFieldError } from '@/validation/errors'

import faker from 'faker'

const makeSut = (): EmailValidation => new EmailValidation(faker.database.column())

describe('EmailValidation', () => {
    test('Should return erro if email is invalid', () => {
        const sut = makeSut()
        const error = sut.validate(faker.random.word())

        expect(error).toEqual(new InvalidFieldError())
    })

    test('Should return falsy if email is valid', () => {
        const sut = makeSut()
        const error = sut.validate(faker.internet.email())

        expect(error).toBeFalsy()
    })
})
