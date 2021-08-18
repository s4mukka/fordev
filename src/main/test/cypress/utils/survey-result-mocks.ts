import * as Http from './http-mocks'

import faker from 'faker'

export const mockUnexpectedError = (): void => Http.mockServerError(/surveys/, 'GET')
export const mockAccessDeniedError = (): void => Http.mockForbiddenError(/surveys/, 'GET')
export const mockOk = (): void => Http.mockOk(/surveys/, 'GET', mockSurveyResultModel())

const mockSurveyResultModel = (
    date: Date = faker.date.past(),
    question: string = faker.random.words(10),
    didAnswer: boolean = faker.datatype.boolean()
): LoadSurveyResult.Model => ({
    question,
    date,
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
