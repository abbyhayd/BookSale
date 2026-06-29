const authors = []

function getNextID(){
    if(authors.length === 0) return authors.length

    if(authors.at(-1).id >= authors.length){
        return authors.at(-1).id + 1
    }else{
        return authors.length
    }
}

export function getAuthors(){
    return authors
}

export function getAuthor(id){
    return authors[id]
}
export function getAuthorByName(name){
    return authors.find(author => author.name === name)
}

export function getName(id){
    return authors.find(author => author.id === id).name
}

export function checkExists(id){
    return (id >= 0 && id < authors.length)
}

export function checkAuthorExists(name){
    return authors.some(author => author.name === name)
}

export function createAuthor(newAuthor){
    newAuthor.id = getNextID()
    authors.push(newAuthor)
    return newAuthor.id
}