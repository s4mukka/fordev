import React from 'react'
import { useParams } from 'react-router-dom'

import { makeRemoteLoadSurveyResult, makeRemoteSaveSurveyResult } from '@/main/factories/usecases'

import { SurveyResult } from '@/presentation/pages'

export const makeSurveyResult: React.FC = () => {
    const { surveyId } = useParams<{surveyId: string}>()
    return (
        <SurveyResult
            loadSurveyResult={makeRemoteLoadSurveyResult(surveyId)}
            saveSurveyResult={makeRemoteSaveSurveyResult(surveyId)}
        />
    )
}
