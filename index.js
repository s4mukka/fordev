const fallback = require('express-history-api-fallback')
const express = require('express')
const app = express()
const root = `${__dirname}/dist`
app.disable('x-powered-by')
app.use(express.static(root))
app.use(fallback('index.html', { root: root }))
app.listen(process.env.PORT || 3000)
