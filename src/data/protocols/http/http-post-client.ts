import { HttpResponse } from '.'

export type HttpPostParams = {
    url: string
    body?: any
}

export interface HttpPostClient<R = any> {
    post: (parms: HttpPostParams) => Promise<HttpResponse<R>>
}
