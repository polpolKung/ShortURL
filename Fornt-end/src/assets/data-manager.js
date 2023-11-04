import { getShortUrl, getShortUrlById, createShortUrl } from "./data-handler";
import { ref } from 'vue'

const urlItems = ref([])
const fullUrl = ref("")
const urlObj = ref(null)

const fetchUrl = async ()=> {
    urlItems.value = await getShortUrl()
}

const linkUrl = async (id)=> {
    fullUrl.value = await getShortUrlById(id)
}

const generateUrl = async (full)=> {
    urlObj.value = await createShortUrl(full)
}


export { fetchUrl, linkUrl, generateUrl, urlItems, fullUrl, urlObj }