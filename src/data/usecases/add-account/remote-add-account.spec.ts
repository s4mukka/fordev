import { RemoteAddAccount } from './remote-add-account'

import { HttpPostClientSpy } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'

import { AccountModel } from '@/domain/models'
import { EmailInUseError } from '@/domain/errors'
import { AddAccountParams } from '@/domain/usecases'
import { mockAddAccountParams } from '@/domain/test'

import faker from 'faker'

type SutTypes = {
    sut: RemoteAddAccount
    httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
    const httpPostClientSpy = new HttpPostClientSpy<AddAccountParams, AccountModel>()
    const sut = new RemoteAddAccount(url, httpPostClientSpy)

    return {
        sut,
        httpPostClientSpy
    }
}

describe('RemoteAddAccount', () => {
    test('Should call HttpPostClient with correct URL', async () => {
        const url = faker.internet.url()
        const { sut, httpPostClientSpy } = makeSut(url)

        await sut.add(mockAddAccountParams())

        expect(httpPostClientSpy.url).toBe(url)
    })

    test('Should call HttpPostClient with correct body', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        const AddAccountParams = mockAddAccountParams()

        await sut.add(AddAccountParams)

        expect(httpPostClientSpy.body).toEqual(AddAccountParams)
    })

    test('Should throw EmailInUseError if HttpPostClient returns 403', async () => {
        const { sut, httpPostClientSpy } = makeSut()

        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.forbidden
        }

        const promise = sut.add(mockAddAccountParams())

        await expect(promise).rejects.toThrow(new EmailInUseError())
    })
})
