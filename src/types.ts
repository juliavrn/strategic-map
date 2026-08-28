export interface Theme {
  id: string
  name: string
  description?: string
  value?: number
  image?: string
  objectives?: string[]
  links?: {
    title: string
    url: string
  }[]
  children?: Theme[]
}