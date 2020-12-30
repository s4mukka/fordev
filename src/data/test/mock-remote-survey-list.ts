import { RemoteLoadSurveyList } from '@/data/usecases'

import faker from 'faker'

export const mockRemoteSurveyModel = (): RemoteLoadSurveyList.Model => ({
    id: faker.random.uuid(),
    question: faker.random.words(10),
    date: faker.date.recent().toISOString(),
    didAnswer: faker.random.boolean()
})

export const mockRemoteSurveyListModel = (): RemoteLoadSurveyList.Model[] => ([
    mockRemoteSurveyModel(),
    mockRemoteSurveyModel(),
    mockRemoteSurveyModel()
])
