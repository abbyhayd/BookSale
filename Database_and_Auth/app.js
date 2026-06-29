import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import * as z from 'zod'
import crypto from 'crypto'
import * as argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({path: './.env'})

import * as user_model from './models/users_mongodb.js'
import reviewRouter from "./routers/reviewRouter.js"

const app = express()

app.use(morgan('combined')) // logs request & response info to console
app.use(express.json()) // transforms JSON into JS objects and vice versa in request & response bodies
app.use(cookieParser()) // transforms cookies from a single string into an object/map
app.use(express.text())// allows you to parse request bodies as strings

app.use('/reviews', reviewRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const userSchema = z.object({
  username : z.string(),
  password : z.string()
})

function generateSalt(length = 16){
  return crypto.randomBytes(length).toString('hex')
}

export function auth (req, res, next){
  const authCookie = req.cookies['authcookie']

  if(authCookie == null) return res.status(401).send("Please log in")
    
  jwt.verify(authCookie, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
    if(err) return res.status(403).send("Forbidden")
    req.user = user
    next()
  })
}

app.post('/signup', async (req, res)=>{
  const data = req.body
  const result = userSchema.safeParse(data)

  if(result){
    const newUsername = data.username
    const newPassword = data.password

    if(await user_model.checkUserByUsername(newUsername)){
      //username already exists
      res.status(400).send("User already exists")
    }else{
      //user doesn't exist
      const userSalt = generateSalt()
      const encryptedPass = await argon2.hash(newPassword + userSalt)

      const newUser = {
        username : newUsername,
        password : encryptedPass,
        salt : userSalt
      }

      const id = await user_model.addUser(newUser)
      res.status(201).send(`${req.baseUrl}/${id}`)
    }
  }else{
    res.status(400).send("Invalid input")
  }
})

app.post('/login', async (req, res)=>{
  const data = req.body
  const result = userSchema.safeParse(data)

  if(result){
    const username = data.username

    if(await user_model.checkUserByUsername(username) && await user_model.loginUser(data)){
      
      const token = jwt.sign({username}, process.env.ACCESS_TOKEN_SECRET)
      res.cookie('authcookie', token, {maxAge:3600000, httpOnly: true})

      res.status(200).send("Log in successful")
    }else{
      res.status(400).send("Unsuccessful login")
    }
    
  }else{
    res.status(400).send("Invalid input")
  }
})

app.post('/logout', (req, res)=>{
  const cookie = req.cookies;
    for (var prop in cookie) {
        if (!cookie.hasOwnProperty(prop)) {
            continue;
        }    
        res.cookie(prop, '', {expires: new Date(0)});
    }
    res.status(200).send("Log out successful")
})

const port = process.env.PORT ?? 3001
app.listen(port, () => {
  console.log(`server running on port ${port}`)
})