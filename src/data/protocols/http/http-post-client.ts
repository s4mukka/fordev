export type HttpPostParams = {
    url: string
    body?: object
}

export interface HttpPostClient {
    post (parms: HttpPostParams): Promise<void>
}
