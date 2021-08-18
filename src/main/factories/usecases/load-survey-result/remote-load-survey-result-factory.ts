import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { LoadSurveyResult } from '@/domain/usecases'
import { RemoteLoadSurveyResult } from '@/data/usecases'

export const makeRemoteLoadSurveyResult = (surveyId: string): LoadSurveyResult => {
    return new RemoteLoadSurveyResult(makeApiUrl(`/surveys/${surveyId}/results`), makeAuthorizeHttpClientDecorator())
}
