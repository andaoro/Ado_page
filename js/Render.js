import { GetDataADo, GetTopTracks } from './Fetchs.js'
import { formatNumero } from './utils/FormateoNumber.js'

async function RenderStats() {
    try {
        const data = await GetDataADo()
        //variables html
        const nombre = document.getElementById('nombre_artista')
        const tipo = document.getElementById('type')
        const seguidores = document.getElementById('seguidores')
        const popularidad = document.getElementById('popularidad')

        if (data) {
            nombre.innerHTML = data.name || 'Nombre no disponible';
            seguidores.innerHTML = `Seguidores: ${data.followers ? formatNumero(data.followers.total) : 'N/A'}`;
            popularidad.innerHTML = `Rate: ${data.popularity || 'N/A'}`;
            tipo.innerHTML = data.type || ''
        } else {
            console.log("No se encontraron datos")
        }
    } catch (error) {
        throw new Error(error)
    }
}

async function RenderTopTracks(){
    try {
        const data = await GetTopTracks()
        const topSongs = document.getElementById('top')

        console.log(data)

        if (data) {
            data.tracks.forEach(track => {
                //CREAR ELEMENTOS EN EL DOM
                const card_track = document.createElement('div')
                const image_card = document.createElement('img')
                const song_name = document.createElement('p')
                const previewAudio = document.createElement('audio')
                
                //ESTILOS
                card_track.classList.add('card_songs')
                image_card.classList.add('card_songs_image')
                song_name.classList.add('card_songs_name')


                //VALORES
                image_card.src = track.album.images[0].url
                song_name.innerHTML = track.name
                


                //APPENDCHILDS
                card_track.appendChild(image_card)
                card_track.appendChild(song_name)
                topSongs.appendChild(card_track)
            });
        }
    } catch (error) {
        
    }
}


document.addEventListener('DOMContentLoaded', async () => {
    RenderStats()
    RenderTopTracks()
})