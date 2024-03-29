import { RemoteSurveyResultModel } from '@/data/models'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { SaveSurveyResult } from '@/domain/usecases/save-survey-result'

export class RemoteSaveSurveyResult implements SaveSurveyResult {
    constructor (
        private readonly url: string,
        private readonly httpClient: HttpClient
    ) {}

    async save (params: RemoteSaveSurveyResult.Params): Promise<SaveSurveyResult.Model> {
        const httpResponse = await this.httpClient.request({
            url: this.url,
            method: 'put',
            body: params
        })

        const remoteSurveyResult = httpResponse.body ?? undefined
        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok: return {
                ...remoteSurveyResult,
                date: new Date(remoteSurveyResult?.date)
            }
            case HttpStatusCode.forbidden: throw new AccessDeniedError()
            default: throw new UnexpectedError()
        }
    }
}

export namespace RemoteSaveSurveyResult {
    export type Params = {
        answer: string
    }
    export type Model = RemoteSurveyResultModel
}
