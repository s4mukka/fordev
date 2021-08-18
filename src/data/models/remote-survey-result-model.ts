export type RemoteSurveyResultModel = {
    question: string
    answers: RemoteSurveyAnswerResultModel[]
    date: string
}

export type RemoteSurveyAnswerResultModel = {
    image?: string
    answer: string
    count: number
    percent: number
    isCurrentAccountAnswer: boolean
}
