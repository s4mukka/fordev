import { RemoteLoadSurveyResult } from './remote-load-survey-result'

import { HttpClientSpy, mockRemoteSurveyResultModel } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

import faker from 'faker'

type SutTypes = {
    sut: RemoteLoadSurveyResult
    httpClientSpy: HttpClientSpy<RemoteLoadSurveyResult.Model>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
    const httpClientSpy = new HttpClientSpy<RemoteLoadSurveyResult.Model>()
    const sut = new RemoteLoadSurveyResult(url, httpClientSpy)

    return {
        sut,
        httpClientSpy
    }
}

describe('RemoteLoadSurveyResult', () => {
    test('Should call HttpClient with correct Url', async () => {
        const url = faker.internet.url()
        const { sut, httpClientSpy } = makeSut(url)
        await sut.load()
        expect(httpClientSpy.url).toBe(url)
        expect(httpClientSpy.method).toBe('get')
    })

    test('Should throw AccessDeniedError if HttpClient returns 403', async () => {
        const { sut, httpClientSpy } = makeSut()

        httpClientSpy.response = {
            statusCode: HttpStatusCode.forbidden
        }

        const promise = sut.load()

        await expect(promise).rejects.toThrow(new AccessDeniedError())
    })

    test('Should throw UnexpectedError if HttpClient returns 404', async () => {
        const { sut, httpClientSpy } = makeSut()

        httpClientSpy.response = {
            statusCode: HttpStatusCode.notFound
        }

        const promise = sut.load()

        await expect(promise).rejects.toThrow(new UnexpectedError())
    })

    test('Should throw UnexpectedError if HttpClient returns 500', async () => {
        const { sut, httpClientSpy } = makeSut()

        httpClientSpy.response = {
            statusCode: HttpStatusCode.serverError
        }

        const promise = sut.load()

        await expect(promise).rejects.toThrow(new UnexpectedError())
    })

    test('Should return a SurveyResult on 200', async () => {
        const { sut, httpClientSpy } = makeSut()
        const httpResult = mockRemoteSurveyResultModel()
        httpClientSpy.response = {
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
