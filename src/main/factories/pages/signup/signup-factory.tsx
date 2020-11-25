import React from 'react'

import { makeRemoteAddAccount } from '../../usecases/add-account/remote-add-account-factory'
import { makeLocalSaveAccessToken } from '@/main/factories/usecases/save-access-token/local-save-access-token-factory'
import { makeSignUpValidation } from './signup-validation-factory'

import { SignUp } from '@/presentation/pages'

export const makeSignUp: React.FC = () => {
    return (
        <SignUp
            addAccount={makeRemoteAddAccount()}
            validation={makeSignUpValidation()}
            saveAccessToken={makeLocalSaveAccessToken()}
        />
    )
}
