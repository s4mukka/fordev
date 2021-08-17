import React, { useEffect, useState } from 'react'

import Styles from './survey-list-styles.scss'

import { LoadSurveyList } from '@/domain/usecases'

import { useErrorHandler } from '@/presentation/hooks'
import { Header, Footer, Error } from '@/presentation/components'

import { SurveyListItem } from './components'

type Props = {
    loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
    const handleError = useErrorHandler((error: Error) => {
        setState(old => ({ ...old, error: error.message }))
    })
    const [state, setState] = useState({
        surveys: [] as LoadSurveyList.Model[],
        error: '',
        reload: false
    })

    useEffect(() => {
        loadSurveyList.loadAll()
            .then(surveys => setState(old => ({ ...old, surveys })))
            .catch(handleError)
    }, [state.reload])

    const handleReload = (): void => {
        setState(old => ({
            surveys: [],
            error: '',
            reload: !old.reload
        }))
    }

    return (
        <div className={Styles.surveyListWrap}>
            <Header />
            <div className={Styles.contentWrap}>
                <h2>Enquetes</h2>
                {
                    state.error
                        ? <Error error={state.error} reload={handleReload}/>
                        : <SurveyListItem surveys={state.surveys} />
                }
            </div>
            <Footer />
        </div>
    )
}

export default SurveyList
