export interface Token {
  name: string
  symbol: string
  address: string
  icon: string
  links?: {
    website?: string
    twitter?: string
    telegram?: string
    discord?: string
  }
  metadata?: {
    supply?: number
    burn?: string
    vesting?: string
    audit?: string
    [key: string]: any
  }
}
