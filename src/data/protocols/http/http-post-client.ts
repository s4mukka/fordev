import { HttpResponse } from '.'

export type HttpPostParams<T> = {
    url: string
    body?: T
}

export interface HttpPostClient<T, R> {
    post: (parms: HttpPostParams<T>) => Promise<HttpResponse<R>>
}
