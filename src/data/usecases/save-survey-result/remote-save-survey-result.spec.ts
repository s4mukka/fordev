import { RemoteSaveSurveyResult } from './remote-save-survey-result'

import { HttpClientSpy } from '@/data/test'
import { mockSaveSurveyResultParams } from '@/domain/test'

import faker from 'faker'

type SutTypes = {
    sut: RemoteSaveSurveyResult
    httpClientSpy: HttpClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
    const httpClientSpy = new HttpClientSpy()
    const sut = new RemoteSaveSurveyResult(url, httpClientSpy)

    return {
        sut,
        httpClientSpy
    }
}

describe('RemoteSaveSurveyResult', () => {
    test('Should call HttpClient with correct values', async () => {
        const url = faker.internet.url()
        const { sut, httpClientSpy } = makeSut(url)
        const saveSurveyResultParams = mockSaveSurveyResultParams()
        await sut.save(saveSurveyResultParams)
        expect(httpClientSpy.url).toBe(url)
        expect(httpClientSpy.method).toBe('put')
        expect(httpClientSpy.body).toEqual(saveSurveyResultParams)
    })
})
