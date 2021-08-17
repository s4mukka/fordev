import React from 'react'
import FlipMove from 'react-flip-move'

import { Footer, Header, Loading } from '@/presentation/components'

import Styles from './survey-result-styles.scss'

const SurveyResult: React.FC = () => {
    return (
        <div className={Styles.surveyResultWrap}>
            <Header />
            <div className={Styles.contentWrap}>
                <h2>Qual é seu framework web favorito?</h2>
                <FlipMove className={Styles.answersList}>
                    <li>
                        <img src="https://fordevs.herokuapp.com/static/img/logo-react.png"/>
                        <span className={Styles.answer}>ReactJS</span>
                        <span className={Styles.percent}>50%</span>
                    </li>
                    <li className={Styles.active}>
                        <img src="https://fordevs.herokuapp.com/static/img/logo-vue.png"/>
                        <span className={Styles.answer}>Vue</span>
                        <span className={Styles.percent}>30%</span>
                    </li>
                    <li>
                        <img src="https://fordevs.herokuapp.com/static/img/logo-angular.png"/>
                        <span className={Styles.answer}>Angular</span>
                        <span className={Styles.percent}>20%</span>
                    </li>
                </FlipMove>
                <button>Voltar</button>
                {false && <Loading />}
            </div>
            <Footer />
        </div>
    )
}

export default SurveyResult