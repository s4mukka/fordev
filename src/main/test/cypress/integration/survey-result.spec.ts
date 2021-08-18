import * as Http from '../utils/survey-result-mocks'
import * as Helper from '../utils/helpers'

import faker from 'faker'

describe('SurveyResult', () => {
    beforeEach(() => {
        Helper.setLocalStorageItem('account', { accessToken: faker.datatype.uuid(), name: faker.name.findName() })
    })

    it('Should present error on UnexpectedError', () => {
        Http.mockUnexpectedError()
        cy.visit('/surveys/any_id')
        cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
    })
})
