export interface ComicDto {
  id: number
  digitalId: number
  title: string
  issueNumber: number
  variantDescription: string
  description: string
  modified: string
  isbn: string
  upc: string
  diamondCode: string
  ean: string
  issn: string
  format: string
  pageCount: number
  textObjects: TextObject[]
  resourceURI: string
  urls: Url[]
  series: Series
  variants: string[]
  collections: string[]
  collectedIssues: string[]
  dates: Date[]
  prices: Price[]
  thumbnail: Thumbnail
  images: Image[]
  creators: Creators
  characters: Characters
  stories: Stories
  events: Events
}

export interface TextObject {
  type: string
  language: string
  text: string
}

export interface Url {
  type: string
  url: string
}

export interface Series {
  resourceURI: string
  name: string
}

export interface Date {
  type: string
  date: string
}

export interface Price {
  type: string
  price: number
}

export interface Thumbnail {
  path: string
  extension: string
}

export interface Image {
  path: string
  extension: string
}

export interface Creators {
  available: number
  collectionURI: string
  items: Item[]
  returned: number
}

export interface Item {
  resourceURI: string
  name: string
  role: string
}

export interface Characters {
  available: number
  collectionURI: string
  items: CharactersItems[]
  returned: number
}

export interface CharactersItems {
  resourceURI: string
  name: string
}

export interface Stories {
  available: number
  collectionURI: string
  items: StoriesItems[]
  returned: number
}

export interface StoriesItems {
  resourceURI: string
  name: string
  type: string
}

export interface Events {
  available: number
  collectionURI: string
  items: string[]
  returned: number
}
