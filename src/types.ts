export interface ContentItem {
  title: string
  description: string
}

export interface ContentSection {
  title: string
  items: ContentItem[]
}

export interface Theme {
  id?: string
  name: string
  value?: number
  sections?: ContentSection[]
  children?: Theme[]
}