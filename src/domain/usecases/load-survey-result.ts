export interface LoadSurveyResult {
    load: () => Promise<LoadSurveyResult.Model>
}

export namespace LoadSurveyResult {
    export type Model = {
        question: string
        answers: AnswerResult[]
        date: Date
    }
}

type AnswerResult = {
    image?: string
    answer: string
    count: number
    percent: number
}
