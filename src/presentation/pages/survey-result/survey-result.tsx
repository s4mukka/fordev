import React, { useEffect, useState } from 'react'

import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'
import { Error, Footer, Header, Loading } from '@/presentation/components'
import { Result, SurveyResultContext } from './components'

import Styles from './survey-result-styles.scss'

type Props = {
    loadSurveyResult: LoadSurveyResult
    saveSurveyResult: SaveSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult, saveSurveyResult }: Props) => {
    const handleError = useErrorHandler((error: Error) => {
        setState(old => ({ ...old, surveyResult: null, error: error.message, isLoading: false }))
    })

    const [state, setState] = useState({
        isLoading: false,
        error: '',
        surveyResult: null as LoadSurveyResult.Model,
        reload: false
    })

    const onAnswer = async (answer: string): Promise<void> => {
        setState(old => ({ ...old, isLoading: true }))
        try {
            await saveSurveyResult.save({ answer })
        } catch (error) {
            handleError(error)
        }
    }

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
            <SurveyResultContext.Provider value={{ onAnswer }}>
                <div data-testid="survey-result" className={Styles.contentWrap}>
                    {state.surveyResult && <Result surveyResult={state.surveyResult} />}
                    {state.isLoading && <Loading />}
                    {state.error && <Error error={state.error} reload={handleReload} />}
                </div>
            </SurveyResultContext.Provider>
            <Footer />
        </div>
    )
}

export default SurveyResult
