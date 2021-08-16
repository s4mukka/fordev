import * as Http from '../utils/survey-list-mocks'
import * as Helper from '../utils/helpers'

import faker from 'faker'

describe('SurveyList', () => {
    beforeEach(() => {
        Helper.setLocalStorageItem('account', { accessToken: faker.datatype.uuid(), name: faker.name.findName() })
    })

    it('Should present error on UnexpectedError', () => {
        Http.mockUnexpectedError()
        cy.visit('')
        cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
    })

    it('Should reload on button click', () => {
        Http.mockUnexpectedError()
        cy.visit('')
        cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
        Http.mockOk()
        cy.getByTestId('reload').click()
        cy.get('li:not(:empty)').should('have.length', 3)
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

    it('Should logout on logout link click', () => {
        Http.mockUnexpectedError()
        cy.visit('')
        cy.getByTestId('logout').click()
        Helper.testUrl('/login')
    })

    it('Should present survey items', () => {
        Http.mockOk()
        cy.visit('')
        cy.get('li:empty').should('have.length', 4)
        cy.get('li:not(:empty)').should('have.length', 3)
        cy.get('li:nth-child(1)').then(li => {
            assert.equal(li.find('[data-testid="day"]').text(), '03')
            assert.equal(li.find('[data-testid="month"]').text(), 'fev')
            assert.equal(li.find('[data-testid="year"]').text(), '2018')
            assert.equal(li.find('[data-testid="question"]').text(), 'Question 1')
            assert.equal(li.find('[data-testid="icon"]').attr('src'), Http.IconName.thumbDown)
        })
    })
})
