import { GetAccessTokenSpotify } from "./SpotifyApi.js";
import { formatNumero } from "./utils/FormateoNumber.js";

const spotifyAdoId = '6mEQK9m2krja6X1cfsAjfl'

async function GetDataADo() {
    const url = `https://api.spotify.com/v1/artists/${spotifyAdoId}`
    const token = await GetAccessTokenSpotify()

    //variables html
    const nombre = document.getElementById('nombre_artista')
    const tipo = document.getElementById('type')
    const seguidores = document.getElementById('seguidores')
    const popularidad = document.getElementById('popularidad')

    const options = {
        method: 'GET',
        headers: {
            'Authorization': `${token.token_type} ${token.access_token}`
        }
    }

    try {
        const response = await fetch(url, options)
        const data = await response.json()

        if (data) {
            nombre.innerHTML = data.name || 'Nombre no disponible';
            seguidores.innerHTML = `Seguidores: ${data.followers ? formatNumero(data.followers.total) : 'N/A'}`;
            popularidad.innerHTML = `Rate: ${data.popularity || 'N/A'}`;
            tipo.innerHTML = data.type || ''
        }
    } catch (error) {
        console.log(error)
        throw new Error('Ha ocurrido un error con los datos')
    }

}

async function GetTopTracks() {
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
        const topSongs = document.getElementById('top')

        if (data) {
            data.tracks.forEach(track => {
                const card_track = document.createElement('div')
                const image_card = document.createElement('img')
                const song_name = document.createElement('p')

                card_track.classList.add('card_songs')
                image_card.classList.add('card_songs_image')
                song_name.classList.add('card_songs_name')

                image_card.src = track.album.images[0].url
                song_name.innerHTML = track.name
                


                card_track.appendChild(image_card)
                card_track.appendChild(song_name)
                topSongs.appendChild(card_track)
            });
        }

    } catch (error) {
        throw new Error('Error con el top de canciones')
    }
}


document.addEventListener('DOMContentLoaded', async () => {
    await GetDataADo()
    await GetTopTracks()
})