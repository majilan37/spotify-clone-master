import SpotifyWebApi from 'spotify-web-api-node'

const scopes = [
  'user-read-private',
  'user-read-email',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'user-top-read',
  'user-read-playback-position',
  'user-read-recently-played',
  'user-read-currently-playing',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-read-private',
  'playlist-modify-private',
].join(',')

const params = {
  scope: scopes,
}

const query = new URLSearchParams(params)

const LOGIN_URL = `https://accounts.spotify.com/authorize?${query.toString()}`

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string,
  clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET as string,
})

export default spotifyApi

export { LOGIN_URL }
