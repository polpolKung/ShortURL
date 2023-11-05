import router from '../router/router.js'

const API_HOST = import.meta.env.VITE_ROOT_API + "/api/shortUrls"

const  getShortUrl = async() => {
    try {
        const res = await fetch(`${API_HOST}`, {
        })
        if (res.ok) {
            const url = res.json()
            return url
        }
        else throw new Error('Error, data is error!')
    } catch (error) {

        throw new Error(error)
    }
}

const  getShortUrlById = async(id) => {
    try {
        const res = await fetch(`${API_HOST}/${id}`, {
        })
        if (res.ok) {
            const redirectURL = await res.text()
            window.location.href = redirectURL
        } else if(res.status === 404) {
            router.push({ name: 'PageNotfound', params: { notfoundpath: id} })
        }
        else throw new Error('Error, data is error!')
    } catch (error) {

        throw new Error(error)
    }
}

const  createShortUrl = async(full) => {
    try {
        const res = await fetch(`${API_HOST}`, {
            method: 'POST',
            body: JSON.stringify(full),
            headers: {
                'Content-Type': 'application/json' 
            }
        })
        if (res.ok) {
            const url = await res.json()
            return url
        } else if (res.status === 400) {
            return false
        }
        else throw new Error('Error, data is error!')
    } catch (error) {

        throw new Error(error)
    }
}


export { getShortUrl, getShortUrlById, createShortUrl}