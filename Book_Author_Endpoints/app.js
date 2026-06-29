import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import bodyParser from 'body-parser'

import authorRouter from './endpoints/authors.js'
import bookRouter from './endpoints/books.js'

const app = express()

app.use(morgan('combined')) // logs request & response info to console
app.use(express.json()) // transforms JSON into JS objects and vice versa in request & response bodies
app.use(cookieParser()) // transforms cookies from a single string into an object/map
app.use(bodyParser.text())// allows you to parse request bodies as strings

app.use('/authors', authorRouter)
app.use('/books', bookRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const port = process.env.PORT ?? 3000
app.listen(port, () => {
  console.log(`server running on port ${port}`)
})