import { createContext } from 'react'

type Props = {
    onAnswer: (answer: string) => Promise<void>
}

export default createContext<Props>(null)
