import * as Http from './http-mocks'

import faker from 'faker'

export const mockLoadUnexpectedError = (): void => Http.mockServerError(/surveys/, 'GET')
export const mockLoadAccessDeniedError = (): void => Http.mockForbiddenError(/surveys/, 'GET')
export const mockLoadOk = (): LoadSurveyResult.Model => {
    const response = mockSurveyResultModel()
    Http.mockOk(/surveys/, 'GET', response)
    return response
}

export const mockSaveUnexpectedError = (): void => Http.mockServerError(/surveys/, 'PUT')

const mockSurveyResultModel = (): LoadSurveyResult.Model => ({
    question: faker.random.words(),
    date: new Date('2018-02-03T00:00:00'),
    answers: [
        {
            image: faker.image.image(),
            answer: faker.random.word(),
            count: faker.datatype.number(),
            percent: faker.datatype.number(100),
            isCurrentAccountAnswer: true
        },
        {
            answer: faker.random.word(),
            count: faker.datatype.number(),
            percent: faker.datatype.number(100),
            isCurrentAccountAnswer: false
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
