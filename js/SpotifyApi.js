export async function GetAccessTokenSpotify(){
    const url = 'https://accounts.spotify.com/api/token'
    const clientID = '0ed06f3337d444eab8b22a5bc941e3bb'
    const clientSecret = 'e98cec8f3a434639b77a941c1cd8c330'


    const opciones = {
        method:'POST',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientID + ':' + clientSecret),
        },
        body: 'grant_type=client_credentials'
    }

    try {
        const response = await fetch(url,opciones)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
        throw new Error('Ha ocurrido un error al obtener el token')
    }
}

