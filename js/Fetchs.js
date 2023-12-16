import { GetAccessTokenSpotify } from "./SpotifyApi.js";

const spotifyAdoId = '6mEQK9m2krja6X1cfsAjfl'

export async function GetDataADo() {
    const url = `https://api.spotify.com/v1/artists/${spotifyAdoId}`
    const token = await GetAccessTokenSpotify()

    const options = {
        method: 'GET',
        headers: {
            'Authorization': `${token.token_type} ${token.access_token}`
        }
    }

    try {
        const response = await fetch(url, options)
        const data = await response.json()

        return data
    } catch (error) {
        console.log(error)
        throw new Error('Ha ocurrido un error con los datos')
    }

}

export async function GetTopTracks() {
    const url = `https://api.spotify.com/v1/artists/${spotifyAdoId}/top-tracks?market=ES`
    const token = await GetAccessTokenSpotify()

    const options = {
        method: 'GET',
        headers: {
            'Authorization': `${token.token_type} ${token.access_token}`,

        }
    }

    try {
        const response = await fetch(url, options)
        const data = await response.json()

        return data;
    } catch (error) {
        throw new Error('Error con el top de canciones')
    }
}
