export interface ILang {
  name: string,
  native: string,
  rus: string
}

export interface ILanguages {
  [name: string]: ILang
}

export interface ITranslates {
  [name: string]: string
}

export interface IFile {
  ext: string
  hash: string
  id: number
  image_height: number | null
  image_width: number | null
  name: string
  path: string
  path_768: string | null
  path_1080: string | null
  path_1334: string | null
  path_1920: string | null
  size: number
  type: "image" | 'video'
  thumbnail: null | IFile
}

export interface IMeta {
  count: number
  current_page: number
  links: object | null
  per_page: number
  total: number
  total_pages: number
}

