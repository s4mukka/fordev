import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { LoadSurveyList } from '@/domain/usecases'
import { RemoteLoadSurveyList } from '@/data/usecases'

export const makeRemoteLoadSurveyList = (): LoadSurveyList => {
    return new RemoteLoadSurveyList(makeApiUrl('/surveys'), makeAuthorizeHttpClientDecorator())
}
