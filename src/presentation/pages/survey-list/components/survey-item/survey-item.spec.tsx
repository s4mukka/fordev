import React from 'react'
import { render, screen } from '@testing-library/react'

import { mockSurveyModel } from '@/domain/test'

import { IconName } from '@/presentation/components'

import SurveyItem from './survey-item'

describe('SurveyItem Component', () => {
    test('Should render with correct values', () => {
        const survey = mockSurveyModel()

        survey.didAnswer = true
        survey.date = new Date('2020-12-12T00:00:00')

        render(<SurveyItem survey={survey} />)

        expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
        expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
        expect(screen.getByTestId('day')).toHaveTextContent('12')
        expect(screen.getByTestId('month')).toHaveTextContent('dez')
        expect(screen.getByTestId('year')).toHaveTextContent('2020')
    })
})
