import * as Http from '../utils/login-mocks'
import * as Helper from '../utils/helpers'
import * as FormHelper from '../utils/form-helpers'

import faker from 'faker'

const populateFields = (): void => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
}

const simulateValidSubmit = (): void => {
    populateFields()
    cy.getByTestId('submit').click()
}

describe('Login', () => {
    beforeEach(() => {
        cy.visit('login')
    })

    it('Should load with correct initial state', () => {
        cy.getByTestId('email').should('have.attr', 'readOnly')
        FormHelper.testInputStatus('email', 'Campo obrigatório')

        cy.getByTestId('password').should('have.attr', 'readOnly')
        FormHelper.testInputStatus('password', 'Campo obrigatório')

        cy.getByTestId('submit').should('have.attr', 'disabled')
        cy.getByTestId('error-wrap').should('not.have.descendants')
    })

    it('Should present error state if form is invalid', () => {
        cy.getByTestId('email').focus().type(faker.random.word())
        FormHelper.testInputStatus('email', 'Campo inválido')

        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(4))
        FormHelper.testInputStatus('password', 'Campo inválido')

        cy.getByTestId('submit').should('have.attr', 'disabled')
        cy.getByTestId('error-wrap').should('not.have.descendants')
    })

    it('Should present valid state if form is valid', () => {
        cy.getByTestId('email').focus().type(faker.internet.email())
        FormHelper.testInputStatus('email')

        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
        FormHelper.testInputStatus('password')

        cy.getByTestId('submit').should('not.have.attr', 'disabled')
        cy.getByTestId('error-wrap').should('not.have.descendants')
    })

    it('Should present InvalidCredentialsError on 401', () => {
        Http.mockInvalidCredentialsError()
        simulateValidSubmit()
        FormHelper.testMessageError('Credenciais inválidas')
        Helper.testUrl('/login')
    })

    it('Should present UnexpectedError on default error cases', () => {
        Http.mockUnexpectedError()
        simulateValidSubmit()
        FormHelper.testMessageError('Algo de errado aconteceu. Tente novamente em breve.')
        Helper.testUrl('/login')
    })

    it('Should present save accessToken if valid credentials are provided', () => {
        Http.mockOk()
        simulateValidSubmit()
        cy.getByTestId('error-wrap').should('not.have.descendants')
        Helper.testUrl('/')
        Helper.testLocalStorageItem('account')
    })

    it('Should prevent multiple submits', () => {
        Http.mockOk()
        populateFields()
        cy.getByTestId('submit').dblclick()
        cy.wait('@request')
        Helper.testHttpCallsCount(1)
    })

    it('Should not call submit if form is invalid', () => {
        Http.mockOk()
        cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')
        Helper.testHttpCallsCount(0)
    })
})
