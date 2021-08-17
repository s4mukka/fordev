import { RemoteLoadSurveyResult } from './remote-load-survey-result'

import { HttpGetClientSpy, mockRemoteSurveyResultModel } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

import faker from 'faker'

type SutTypes = {
    sut: RemoteLoadSurveyResult
    httpGetClientSpy: HttpGetClientSpy<RemoteLoadSurveyResult.Model>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
    const httpGetClientSpy = new HttpGetClientSpy<RemoteLoadSurveyResult.Model>()
    const sut = new RemoteLoadSurveyResult(url, httpGetClientSpy)

    return {
        sut,
        httpGetClientSpy
    }
}

describe('RemoteLoadSurveyResult', () => {
    test('Should call HttpGetClient with correct Url', async () => {
        const url = faker.internet.url()
        const { sut, httpGetClientSpy } = makeSut(url)
        await sut.load()
        expect(httpGetClientSpy.url).toBe(url)
    })

    test('Should throw AccessDeniedError if HttpGetClient returns 403', async () => {
        const { sut, httpGetClientSpy } = makeSut()

        httpGetClientSpy.response = {
            statusCode: HttpStatusCode.forbidden
        }

        const promise = sut.load()

        await expect(promise).rejects.toThrow(new AccessDeniedError())
    })

    test('Should throw UnexpectedError if HttpGetClient returns 404', async () => {
        const { sut, httpGetClientSpy } = makeSut()

        httpGetClientSpy.response = {
            statusCode: HttpStatusCode.notFound
        }

        const promise = sut.load()

        await expect(promise).rejects.toThrow(new UnexpectedError())
    })

    test('Should throw UnexpectedError if HttpGetClient returns 500', async () => {
        const { sut, httpGetClientSpy } = makeSut()

        httpGetClientSpy.response = {
            statusCode: HttpStatusCode.serverError
        }

        const promise = sut.load()

        await expect(promise).rejects.toThrow(new UnexpectedError())
    })

    test('Should return a SurveyResult on 200', async () => {
        const { sut, httpGetClientSpy } = makeSut()
        const httpResult = mockRemoteSurveyResultModel()
        httpGetClientSpy.response = {
            statusCode: HttpStatusCode.ok,
            body: httpResult
        }

        const httpResponse = await sut.load()

        expect(httpResponse).toEqual({
            question: httpResult.question,
            date: new Date(httpResult.date),
            answers: httpResult.answers
        })
    })
})
