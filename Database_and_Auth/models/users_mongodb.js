import { MongoClient} from 'mongodb'
import * as argon2 from 'argon2'


const url = 'mongodb://localhost:27017'
let client

async function getUsers(){
  if(!client){
    client = new MongoClient(url)
    await client.connect()
  }
  return client.db('HW2').collection('users')
}

export async function checkUserByUsername(checkUsername){
  const users = await getUsers()
  const result = await users.findOne({username : checkUsername})

  return result
}

export async function addUser(newUser){
  const users = await getUsers()
  const response = await users.insertOne(newUser)
  return response.insertedId.toString()
}

export async function loginUser(user){
  const users = await getUsers()
  const checkUsername = user.username
  const checkPassword = user.password

  const result = await users.findOne({username : checkUsername})
  const salt = result.salt

  return await argon2.verify(result.password, checkPassword + salt)

}
