import * as Http from '../support/survey-list-mocks'
import * as Helper from '../support/helpers'

import faker from 'faker'

const populateFields = (): void => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
}

describe('SurveyList', () => {
    beforeEach(() => {
        Helper.setLocalStorageItem('account', { accessToken: faker.datatype.uuid(), name: faker.name.findName() })
    })

    it('Should present error on UnexpectedError', () => {
        Http.mockUnexpectedError()
        cy.visit('')
        cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
    })

    it('Should logount on AccessDeniedError', () => {
        Http.mockAccessDeniedError()
        cy.visit('')
        Helper.testUrl('/login')
    })

    it('Should present correct username', () => {
        Http.mockUnexpectedError()
        cy.visit('')
        const { name } = Helper.getLocalStorageItem('account')
        cy.getByTestId('username').should('contain.text', name)
    })
})
