import React from 'react'

import { makeRemoteAddAccount } from '../../usecases/add-account/remote-add-account-factory'
import { makeLocalUpdateCurrentAccount } from '@/main/factories/usecases/update-current-account/local-update-current-account-factory'
import { makeSignUpValidation } from './signup-validation-factory'

import { SignUp } from '@/presentation/pages'

export const makeSignUp: React.FC = () => {
    return (
        <SignUp
            addAccount={makeRemoteAddAccount()}
            validation={makeSignUpValidation()}
            updateCurrentAccount={makeLocalUpdateCurrentAccount()}
        />
    )
}
