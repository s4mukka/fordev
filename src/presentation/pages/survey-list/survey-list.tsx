import React from 'react'

import Styles from './survey-list-styles.scss'

import { Header, Icon, IconName, Footer } from '@/presentation/components'

const SurveyList: React.FC = () => {
    return (
        <div className={Styles.surveyListWrap}>
            <Header />
            <div className={Styles.contentWrap}>
                <h2>Enquetes</h2>
                <ul>
                    <li>
                        <div className={Styles.surveyContent}>
                            <Icon className={Styles.iconWrap} iconName={IconName.thumbUp} />
                            <time>
                                <span className={Styles.day}>28</span>
                                <span className={Styles.month}>03</span>
                                <span className={Styles.year}>2020</span>
                            </time>
                            <p>Qual é seu framework web favorito?</p>
                        </div>
                        <footer>Ver Resultado</footer>
                    </li>
                </ul>
            </div>
            <Footer />
        </div>
    )
}

export default SurveyList
