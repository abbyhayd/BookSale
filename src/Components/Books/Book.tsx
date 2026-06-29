export interface Book{
    id : number,
    title : string,
    subtitle : string,
    ogPublicationDate: string,
    tags : Array<String>,
    primaryAuthor : string,
    editions : Array<Object>
}