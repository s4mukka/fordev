import * as Http from './http-mocks'

import faker from 'faker'

export const mockLoadUnexpectedError = (): void => Http.mockServerError(/surveys/, 'GET')
export const mockLoadAccessDeniedError = (): void => Http.mockForbiddenError(/surveys/, 'GET')
export const mockLoadOk = (): LoadSurveyResult.Model => {
    const response = mockLoadSurveyResultModel()
    Http.mockOk(/surveys/, 'GET', response)
    return response
}

export const mockSaveUnexpectedError = (): void => Http.mockServerError(/surveys/, 'PUT')
export const mockSaveAccessDeniedError = (): void => Http.mockForbiddenError(/surveys/, 'PUT')
export const mockSaveOk = (): LoadSurveyResult.Model => {
    const response = mockSaveSurveyResultModel()
    Http.mockOk(/surveys/, 'PUT', response)
    return response
}

const mockLoadSurveyResultModel = (): LoadSurveyResult.Model => ({
    question: faker.random.words(),
    date: new Date('2018-02-03T00:00:00'),
    answers: [
        {
            image: faker.image.image(),
            answer: faker.random.word(),
            count: faker.datatype.number(),
            percent: faker.datatype.number(100),
            isCurrentAccountAnswer: false
        },
        {
            answer: faker.random.word(),
            count: faker.datatype.number(),
            percent: faker.datatype.number(100),
            isCurrentAccountAnswer: false
        }
    ]
})

const mockSaveSurveyResultModel = (): LoadSurveyResult.Model => ({
    question: faker.random.words(),
    date: new Date('2018-02-03T00:00:00'),
    answers: [
        {
            image: faker.image.image(),
            answer: faker.random.word(),
            count: faker.datatype.number(),
            percent: faker.datatype.number(100),
            isCurrentAccountAnswer: false
        },
        {
            answer: faker.random.word(),
            count: faker.datatype.number(),
            percent: faker.datatype.number(100),
            isCurrentAccountAnswer: true
        }
    ]
})

export namespace LoadSurveyResult {
    export type Model = {
        question: string
        answers: AnswerResult[]
        date: Date
    }
}

type AnswerResult = {
    image?: string
    answer: string
    count: number
    percent: number
    isCurrentAccountAnswer: boolean
}
