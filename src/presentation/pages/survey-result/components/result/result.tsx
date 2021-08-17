import React from 'react'
import FlipMove from 'react-flip-move'
import { useHistory } from 'react-router-dom'

import Styles from './result-styles.scss'

import { Calendar } from '@/presentation/components'
import { LoadSurveyResult } from '@/domain/usecases'

type Props = {
    surveyResult: LoadSurveyResult.Model
}

const Result: React.FC<Props> = ({ surveyResult }: Props) => {
    const history = useHistory()
    return (
        <>
            <hgroup>
                <Calendar date={surveyResult.date} className={Styles.calendarWrap}/>
                <h2 data-testid="question">{surveyResult.question}</h2>
            </hgroup>
            <FlipMove data-testid="answers" className={Styles.answersList}>
                {
                    surveyResult.answers.map((answer) => (
                        <li
                            key={answer.answer}
                            data-testid="answer-wrap"
                            className={answer.isCurrentAccountAnswer ? Styles.active : ''}
                        >
                            {answer.image && <img data-testid="image" src={answer.image} alt={answer.answer}/>}
                            <span data-testid="answer" className={Styles.answer}>{answer.answer}</span>
                            <span data-testid="percent" className={Styles.percent}>{answer.percent}%</span>
                        </li>
                    ))
                }
            </FlipMove>
            <button
                data-testid="back-button"
                className={Styles.button}
                onClick={history.goBack}
            >
                Voltar
            </button>

        </>
    )
}

export default Result
