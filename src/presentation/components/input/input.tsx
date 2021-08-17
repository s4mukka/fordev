import React, { useContext, useRef } from 'react'

import Styles from './input-styles.scss'

import Context from '@/presentation/contexts/form/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
    const { state, setState } = useContext(Context)
    const inputRef = useRef<HTMLInputElement>()

    const error = state[`${props.name}Error`]

    return (
        <div
            data-testid={`${props.name}-wrap`}
            className={Styles.inputWrap}
            data-status={error ? 'invalid' : 'valid'}
        >
            <input
                {...props}
                data-testid={props.name}
                ref={inputRef}
                title={error}
                placeholder=" "
                readOnly
                onFocus={event => { event.target.readOnly = false }}
                onChange={event => setState(old => ({ ...old, [event.target.name]: event.target.value }))}
            />
            <label
                data-testid={`${props.name}-label`}
                title={error}
                onClick={() => { inputRef.current.focus() }}
            >
                {props.placeholder}
            </label>
        </div>
    )
}

export default Input
