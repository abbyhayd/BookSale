//Random data used for testing
const Rick = {
    name: 'Rick Riordan',
    bio: 'Most known for creating the Percy Jackson series',
    birthDate: '1964-6-5',
    primaryGenre: 'Fantasy'
}
const Neal = {
    name: 'Neal Shusterman',
    bio: 'Created the Arc of a Schythe seres',
    birthDate: '1962-11-12',
    primaryGenre: 'Young Adult Fiction'
}

const invalidAuthor = {
    name: 1234,
    bio: 'abc',
    birthDate :802,
    primaryGenre: true,
    extra : false
}

const PJO = {
    title : 'Percy Jackson & the Olympians: The Lightning Thief',
    ogPublicationDate : '6/8/2025',
    tags : ['Young Adult', 'Fantasy', 'Funny'],
    primaryAuthor :'Rick Riordan',
    editions : [{
        editionNumber: 1,
        edPublicationDate :'6/8/2025'
    }]
}
const HOO = {
    title : 'Son of Neptune',
    ogPublicationDate : '2/21/2017',
    tags : ['Young Adult', 'Fantasy', 'Funny'],
    primaryAuthor :'Rick Riordan',
    editions : [{
        editionNumber: 1,
        edPublicationDate :'2/21/2017'
    }]
}

const Scythe = {
    title : 'Scythe',
    ogPublicationDate : '11/22/2016',
    tags : ['Science Fiction', 'Adventure'],
    primaryAuthor :'Neal Shusterman',
    editions : [{
        editionNumber: 1,
        edPublicationDate :'11/22/2016'
    }]
}

const ed1 = {
    editionNumber : 2,
    edPublicationDate : '1/20/2026'
}

const ed2 = {
    editionNumber : 3,
    edPublicationDate : '1/21/2000'
}

//-----------------------------------------------------
// TESTING FUNCTIONS
//-----------------------------------------------------

//Testing get functions
async function getAuthors(){
     const res = await fetch ('http://localhost:3000/authors')
     const resText = await res.text()

     console.log("\nauthors are: " + resText)
}

async function getBooks(){
    const res = await fetch ('http://localhost:3000/books')
     const resText = await res.text()

     console.log("\nbooks are: " + resText)
}

async function filterBooksByTags(){
    const filters = ['Young Adult', 'Fantasy', 'Funny']

    const res = await fetch(
        `http://localhost:3000/books/filter?tags=${filters}`,
    )

    const resText = await res.text()
    console.log("\nfiltered books by tags are: " + resText)
}

async function filterBooksByAuthor(){
    const authorID = 0

    const res = await fetch(
        `http://localhost:3000/authors/${authorID}/books`
    )
    const resText = await res.text()
    console.log("\nfiltered books by author are: " + resText)
}

async function getSpecificBook(){
    const ID = 1
    const res = await fetch(
        `http://localhost:3000/books/${ID}`
    )
    const resText = await res.text()
    console.log("\nspecific book is: " + resText)
}

async function getEditions(){
    const ID = 1
    const res = await fetch(
        `http://localhost:3000/books/${ID}/editions`
    )
    const resText = await res.text()
    console.log("\neditions are: " + resText)
}


//Testing post functions
async function addAuthor(author){
    const res = await fetch(
        'http://localhost:3000/authors',
        {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(author)
        }
    )

    const resText = await res.text()
    console.log(resText)
}

async function addBook(newBook){

    const res = await fetch(
        'http://localhost:3000/books',
        {
            method: 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(newBook)
        }
    )
    const resText = await res.text()
    console.log(resText)

}

async function addEdition(edition){
    const ID = 1
    const res = await fetch(
        `http://localhost:3000/books/${ID}`,
        {
            method : 'POST',
            header : {
                'Content-type' : 'application/json'
            },
            body : JSON.stringify(edition)
        }
    )

    const resText = await res.text()
    console.log("\nadded edition to book: " + resText)
}

//Testing patch functions
async function updateAuthorBio(){
    const authorID = 0
    const newBio = "This is the new bio for the author"
    
    const res = await fetch(
        `http://localhost:3000/authors/${authorID}`,
        {
            method: "PATCH",
            header:{
                'Content-type' : 'text/plain'
            },
            body : newBio,
        }
    )
    const resText = await res.text()
    console.log(resText)
}

async function updateBookAttribute(){
    const bookID = 1
    const newAttribute = {
        title : "Heroes of Olympus: Son of Neptune"
    }

    const res = await fetch(
        `http://localhost:3000/books/${bookID}`,
        {
            method : 'PATCH',
            headers:{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(newAttribute)
        }
    )
    const resText = await res.text()
    console.log(resText)
}

//Testing delete functions
async function deleteBook(){
    const bookID = 0
    const res = await fetch(
        `http://localhost:3000/books/${bookID}`,
        {
            method : 'DELETE',
            headers:{
                "Content-Type" : "application/json"
            }
        }
    )
    const resText = await res.text()
    console.log(resText)
}

async function deleteEdition(){
    const bookID = 1
    const editionNumber = 1

    const res = await fetch(
        `http://localhost:3000/books/${bookID}/${editionNumber}`,
        {
            method : 'DELETE',
            headers:{
                "Content-Type" : "application/json"
            }
            
        }
    )
    const resText = await res.text()
    console.log(resText)
}


//-----------------------------------------------------
// DRIVERS
//-----------------------------------------------------

await getAuthors()
//await addInvalidAuthor()
await addAuthor(Rick)
await addAuthor(Neal)
await getAuthors()
await updateAuthorBio() //updates Rick Riordan's bio
await getAuthors()

await getBooks()
await addBook(PJO)
await addBook(HOO)
await addBook(Scythe)
await getBooks()
await filterBooksByTags() //return PJO and HOO

await filterBooksByAuthor() //gets books by Rick Riordan
await addEdition(ed1) //adds edition to HOO
await addEdition(ed2) //adds edition to HOO
await getSpecificBook() //gets HOO
await getEditions() //gets editions for HOO
await deleteBook() //delete PJO
await getBooks()
await deleteEdition() //delete edition 1 from HOO
await updateBookAttribute()//changed HOO title to Heroes of Olympus: Son of Neptune
await getBooks()
