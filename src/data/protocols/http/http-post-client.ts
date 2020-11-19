export type HttpPostParams = {
    url: string
}

export interface HttpPostClient {
    post (parms: HttpPostParams): Promise<void>
}
