import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Error, Footer, Header, Loading } from '@/presentation/components'
import { LoadSurveyResult } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'
import { Result } from './components'

import Styles from './survey-result-styles.scss'

type Props = {
    loadSurveyResult: LoadSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
    const history = useHistory()

    const handleError = useErrorHandler((error: Error) => {
        setState(old => ({ ...old, surveyResult: null, error: error.message }))
    })

    const [state, setState] = useState({
        isLoading: false,
        error: '',
        surveyResult: null as LoadSurveyResult.Model,
        reload: false
    })

    useEffect(() => {
        (async () => {
            try {
                const surveyResult = await loadSurveyResult.load()
                setState(old => ({ ...old, surveyResult }))
            } catch (error) {
                handleError(error)
            }
        })()
    }, [state.reload])

    const handleReload = (): void => {
        setState(old => ({
            isLoading: false,
            surveyResult: null,
            error: '',
            reload: !old.reload
        }))
    }

    return (
        <div className={Styles.surveyResultWrap}>
            <Header />
            <div data-testid="survey-result" className={Styles.contentWrap}>
                {state.surveyResult && <Result surveyResult={state.surveyResult} />}
                {state.isLoading && <Loading />}
                {state.error && <Error error={state.error} reload={handleReload} />}
            </div>
            <Footer />
        </div>
    )
}

export default SurveyResult
