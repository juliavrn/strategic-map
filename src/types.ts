export interface Theme {
  name: string
  description?: string
  value?: number
  meta?: Record<string, string>
  children?: Theme[]
}