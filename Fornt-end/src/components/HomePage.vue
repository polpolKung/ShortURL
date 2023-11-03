<script setup>
import { fetchUrl, urlItems, generateUrl, urlObj } from '../assets/data-manager' 
import { onBeforeMount, ref } from 'vue'
import QRCode from 'qrcode'
 

onBeforeMount( async () => {
    await fetchUrl()
    
})

const baseUrl = window.location.host;
const fullUrlInput = ref("")
const qrCode = ref("")


const generate = async (full) => {
    console.log(fullUrlInput.value);
    console.log(full);
    await generateUrl(full)

    QRCode.toDataURL(urlObj.short, (err, qrCodeUrl) => {
            if(err) {
                return res.status(500).json({ error: 'QR code generation error' })
            }  
            qrCode.value = qrCodeUrl
})
}



</script>
 
<template>
    <div class="w-screen h-screen ">
        <div class="w-full flex flex-col justify-center items-center">
            <h1 class="m-20 text-7xl ">ShortURL</h1>
            <div class="">
                <input class="border px-8 py-2" type="text" placeholder="Enter the link here" v-model="fullUrlInput">
                <button type="button" class="btn btn-primary border px-8 py-2" @click="generate({fullUrl: fullUrlInput})">Generate</button>
            </div>
            <div v-if="urlObj !== null" class="m-24">
                <a :href="urlObj.short">{{ baseUrl }}/{{  urlObj.short }}</a>
                <img :src="qrCode" alt="">
            </div>
            <div>
                <table class="table table table-striped-columns">
                    <thead>
                    <tr class="border">
                        <th>Full-URL</th>
                        <th>Short-URL</th>
                        <th>click</th>
                    </tr>
                </thead>
                <tbody v-for="(item) in urlItems">
                    <tr>
                        <td>{{ item.full }}</td>
                        <td><a :href=item.short>{{ baseUrl }}/{{ item.short }}</a></td>
                       <td>{{ item.clicks }}</td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
    </div>
    
</template>
 
<style scoped></style>