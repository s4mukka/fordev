import React, { useEffect, useState } from 'react'

import Styles from './survey-list-styles.scss'

import { LoadSurveyList } from '@/domain/usecases'

import { useErrorHandler } from '@/presentation/hooks'
import { Header, Footer } from '@/presentation/components'

import { SurveyContext, SurveyListItem, Error } from './components'

type Props = {
    loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
    const handleError = useErrorHandler((error: Error) => {
        setState({ ...state, error: error.message })
    })
    const [state, setState] = useState({
        surveys: [] as LoadSurveyList.Model[],
        error: '',
        reload: false
    })

    useEffect(() => {
        loadSurveyList.loadAll()
            .then(surveys => setState({ ...state, surveys }))
            .catch(handleError)
    }, [state.reload])

    return (
        <div className={Styles.surveyListWrap}>
            <Header />
            <div className={Styles.contentWrap}>
                <h2>Enquetes</h2>
                <SurveyContext.Provider value={{ state, setState }} >
                    { state.error ? <Error /> : <SurveyListItem /> }
                </SurveyContext.Provider>
            </div>
            <Footer />
        </div>
    )
}

export default SurveyList
