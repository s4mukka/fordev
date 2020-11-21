import React from 'react'
import ReactDOM from 'react-dom'

import '@/presentation/styles/global.scss'

import Router from '@/presentation/router/router'

ReactDOM.render(
    <Router />,
    document.getElementById('main')
)
