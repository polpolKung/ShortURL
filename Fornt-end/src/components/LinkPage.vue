<script setup>
import { linkUrl, fullUrl } from '../assets/data-manager' 
import { onBeforeMount } from 'vue'
import { useRoute } from 'vue-router';
const { params } = useRoute()

 

onBeforeMount( async () => {
    await linkUrl(params.id)
})

</script>
 
<template>
<div>

</div>
</template>
 
<style scoped>

</style>