import * as Http from '../utils/survey-result-mocks'
import * as Helper from '../utils/helpers'

import faker from 'faker'

describe('SurveyResult', () => {
    beforeEach(() => {
        Helper.setLocalStorageItem('account', { accessToken: faker.datatype.uuid(), name: faker.name.findName() })
    })

    it('Should present error on UnexpectedError', () => {
        Http.mockUnexpectedError()
        cy.visit(`/surveys/${faker.datatype.uuid()}`)
        cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
    })

    it('Should reload on button click', () => {
        Http.mockUnexpectedError()
        cy.visit(`/surveys/${faker.datatype.uuid()}`)
        cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
        Http.mockOk()
        cy.getByTestId('reload').click()
        cy.getByTestId('question').should('exist')
    })

    it('Should logount on AccessDeniedError', () => {
        Http.mockAccessDeniedError()
        cy.visit(`/surveys/${faker.datatype.uuid()}`)
        Helper.testUrl('/login')
    })

    it('Should present survey result', () => {
        const surveyResult = Http.mockOk()
        cy.visit(`/surveys/${faker.datatype.uuid()}`)
        cy.getByTestId('question').should('have.text', surveyResult.question)
        cy.getByTestId('day').should('have.text', '03')
        cy.getByTestId('month').should('have.text', 'fev')
        cy.getByTestId('year').should('have.text', '2018')
        cy.get('li:nth-child(1)').then(li => {
            assert.equal(li.find('[data-testid="answer"]').text(), surveyResult.answers[0].answer)
            assert.equal(li.find('[data-testid="image"]').attr('src'), surveyResult.answers[0].image)
            assert.equal(li.find('[data-testid="percent"]').text(), `${surveyResult.answers[0].percent}%`)
        })
        cy.get('li:nth-child(2)').then(li => {
            assert.equal(li.find('[data-testid="answer"]').text(), surveyResult.answers[1].answer)
            assert.notExists(li.find('[data-testid="image"]'))
            assert.equal(li.find('[data-testid="percent"]').text(), `${surveyResult.answers[1].percent}%`)
        })
    })

    it('Should go to SurveyList on back button click', () => {
        cy.visit('')
        Http.mockOk()
        cy.visit(`/surveys/${faker.datatype.uuid()}`)
        cy.getByTestId('back-button').click()
        Helper.testUrl('/')
    })
})
