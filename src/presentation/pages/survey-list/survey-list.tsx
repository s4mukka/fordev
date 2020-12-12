import React from 'react'

import Styles from './survey-list-styles.scss'

import { Header, Footer } from '@/presentation/components'
import { SurveyItem, SurveyItemEmpty } from './components'

const SurveyList: React.FC = () => {
    return (
        <div className={Styles.surveyListWrap}>
            <Header />
            <div className={Styles.contentWrap}>
                <h2>Enquetes</h2>
                <ul>
                    <SurveyItem />
                    <SurveyItemEmpty />
                </ul>
            </div>
            <Footer />
        </div>
    )
}

export default SurveyList
