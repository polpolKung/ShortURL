<script setup >
import { fetchUrl, urlItems, generateUrl, urlObj } from '../assets/data-manager'
import { onBeforeMount, ref } from 'vue'
import QRCode from 'qrcode'

onBeforeMount(async () => {
    await fetchUrl()
    setTimeout(() => {
        opacity.value = 1;
    }, 100)

})

const baseUrl = window.location.href
const fullUrlInput = ref("")
const imgQrCode = ref("")
const showCopiedMessage = ref(false)
const urlPattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9]+\.[a-zA-Z]{2,}(\S*)?$/
const opacity = ref(0)


const generate = async (full) => {
    const validUrl = urlPattern.test(full.fullUrl)
    if (full.fullUrl !== "" && validUrl) {
        await generateUrl(full)
        await fetchUrl()
        generateQrCode(urlObj.value)
    }

}

const generateQrCode = (item) => {
    fullUrlInput.value = item.full
    urlObj.value = item
    QRCode.toDataURL(window.location.href + item.short,
        { width: 300, height: 300 }, (err, qrcode) => {
            if (err) {
                console.error(err);
            } else {
                imgQrCode.value = qrcode;
            }
        });
    window.scrollTo(0, 0)
}


const copy = async (url) => {
    await navigator.clipboard.writeText(url)
    showCopiedMessage.value = true
    setTimeout(() => {
        showCopiedMessage.value = false
    }, 1500)
   
}

const saveImg = () => {
  const downloadLink = document.createElement('a');
  downloadLink.href = imgQrCode.value
  downloadLink.download = 'qrCode.png'
  downloadLink.click();
} 




</script>
 
<template>
    <div class="w-screen h-screen bg-zinc-950">
        
        <div class="bg-zinc-950 w-full flex flex-col justify-center items-center transition-all duration-500 " :style="{ opacity: opacity }" >
            
            <h1 class="m-20 text-7xl text-white font-bold " >ShortURL</h1>

            

            <div class="flex w-full justify-center">
                <input class="input input-bordered w-3/6 px-8 py-2" type="text" placeholder="Enter the link here"
                    v-model="fullUrlInput">
                <button type="button" class=" bg-green-900 hover:bg-green-950 text-white font-bold rounded px-8 py-2"
                    @click="generate({ fullUrl: fullUrlInput })">Generate</button>
            </div>
            <img :src="imgQrCode" class="rounded-3xl m-4 transition-all duration-500 opacity-100" :class="imgQrCode !== '' ? 'opacity-100': 'opacity-0'"/>
            <button v-if="imgQrCode !== ''" @click="saveImg" :class="imgQrCode !== '' ? 'opacity-100': 'opacity-0'"
                class=" transition-all ease-in-out hover:-translate-y-1 hover:scale-110 duration-300  bg-green-900 hover:bg-green-950 text-white font-bold rounded px-8 py-2 mb-3">Save Image</button>
            
            <div v-if="urlObj !== null" class="mb-3">
                <div class="flex bg-emerald-700 p-3 rounded-2xl">
                    <div class="flex items-center justify-center">
                        <router-link :to="{ name: 'LinkPage', params: { id: urlObj.short } }" target="_blank"><a class="text-white" :href="urlObj.short" target="_blank">{{ baseUrl }}{{ urlObj.short }}</a></router-link>
                    </div>
                    <div class="mx-3">
                        <button type="button" 
                            class=" transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300  bg-green-900 hover:bg-green-950 text-white font-bold rounded px-8 py-2 "
                            @click.prevent="copy(baseUrl + urlObj.short)">Copy</button>
                    </div>
                </div>
            </div>
        
            <div class="absolute w-40 h-20 ">
                    <div  class="transition-all duration-200  border-2 bg-black p-2 mb-3 rounded-lg text-white w-full h-full flex items-center justify-center"
                          :class="showCopiedMessage ? 'opacity-100': 'opacity-0'">
                        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="ml-2 font-bold text-xl">Copy URL</span>
                    </div>
                </div>

            <div class="w-full h-full flex justify-center items-center my-5">
                <table class="border-t-4 border-emerald-700 w-8/12 text-white ">
                    <thead>
                        <tr class=" text-center">
                            <th class="p-2">Full-URL</th>
                            <th class="p-2">Short-URL</th>
                            <th class="p-2">Click</th>
                            <th class="p-2">Qrcode</th>
                        </tr>
                    </thead>
                    <tbody v-for="(item) in urlItems">
                        <tr class="text-center">
                            <td><a class="p-2 text-white" :href="item.full" target="_blank">{{ item.full }}</a></td>
                            <td><router-link :to="{ name: 'LinkPage', params: { id: item.short } }" target="_blank"><a class="p-2 text-white" :href="item.short" target="_blank" >{{ baseUrl }}{{ item.short }}</a></router-link></td>
                            <td class="p-2">{{ item.clicks }}</td>
                            <td class="p-2 flex justify-center ">
                                <button class="transition  ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 bg-green-900 hover:bg-green-950 p-2 rounded-lg mr-2"
                                    @click="copy(baseUrl+item.short)">
                                    <svg id='Copy_24' width='24' height='24' viewBox='0 0 24 24'
                                        xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'>
                                        <rect width='24' height='24' stroke='none' fill='#000000' opacity='0' />


                                        <g transform="matrix(1 0 0 1 12 12)">
                                            <path
                                                style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255, 255, 255); fill-rule: nonzero; opacity: 1;"
                                                transform=" translate(-12, -12)"
                                                d="M 4 2 C 2.895 2 2 2.895 2 4 L 2 18 L 4 18 L 4 4 L 18 4 L 18 2 L 4 2 z M 8 6 C 6.895 6 6 6.895 6 8 L 6 20 C 6 21.105 6.895 22 8 22 L 20 22 C 21.105 22 22 21.105 22 20 L 22 8 C 22 6.895 21.105 6 20 6 L 8 6 z M 8 8 L 20 8 L 20 20 L 8 20 L 8 8 z"
                                                stroke-linecap="round" />
                                        </g>
                                    </svg>
                                </button>

                                <button class="transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 bg-green-900 hover:bg-green-950 text-white font-bold rounded px-8 py-2 "
                                    @click="generateQrCode(item)">Generate
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</template>
 
<style scoped>

</style>