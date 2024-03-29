import { LoadSurveyResult } from '@/domain/usecases'
import { SaveSurveyResult } from '@/domain/usecases/save-survey-result'

import faker from 'faker'

export const mockSurveyResultModel = (): LoadSurveyResult.Model => ({
    question: faker.random.words(10),
    date: faker.date.recent(),
    answers: [
        {
            image: faker.image.image(),
            answer: faker.random.word(),
            count: faker.datatype.number(),
            percent: faker.datatype.number(),
            isCurrentAccountAnswer: true
        },
        {
            answer: faker.random.word(),
            count: faker.datatype.number(),
            percent: faker.datatype.number(),
            isCurrentAccountAnswer: false
        }
    ]
})

export const mockSaveSurveyResultParams = (): SaveSurveyResult.Params => ({
    answer: faker.random.word()
})

export class LoadSurveyResultSpy implements LoadSurveyResult {
    callsCount = 0
    surveyResult = mockSurveyResultModel()

    async load (): Promise<LoadSurveyResult.Model> {
        this.callsCount++
        return this.surveyResult
    }
}

export class SaveSurveyResultSpy implements SaveSurveyResult {
    params: SaveSurveyResult.Params
    callsCount = 0
    surveyResult = mockSurveyResultModel()

    async save (params: SaveSurveyResult.Params): Promise<SaveSurveyResult.Model> {
        this.params = params
        this.callsCount++
        return this.surveyResult
    }
}
