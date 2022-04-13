export interface Provider {
  callbackUrl: string
  id: string
  name: string
  signinUrl: string
  type: string
}

export interface Playlist {
  collaborative: boolean
  description: string | null
  external_urls: { spotify: string }
  href: string
  id: string
  images: Array<{ height?: number; url: string; width?: number }>
  name: string
  owner: {
    display_name?: string
    external_urls: { spotify: string }
    href: string
    id: string
    type: string
    uri: string
  }
  // primary_color: null
  public: boolean | null
  snapshot_id: string
  tracks: { href: string; total: number }
  type: string
  uri: string
}

export type Tracks = Playlist['tracks'] & {
  items: Array<{
    track: {
      name: string
      id: string
      album: {
        name: string
        images: Array<{
          height: string
          url: string
          width: string
        }>
      }
      uri: string
      duration_ms: number
      artists: Array<{
        name: string
        id: string
      }>
    }
  }>
  limit: number
  next: any
  offset: number
  previous: any
}
