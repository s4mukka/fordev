export type SurveyResultModel = {
    question: string
    answers: SurveyResultAnswerResultModel[]
    date: Date
}

export type SurveyResultAnswerResultModel = {
    image?: string
    answer: string
    count: number
    percent: number
    isCurrentAccountAnswer: boolean
}
