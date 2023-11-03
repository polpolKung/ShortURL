import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import LinkPage from '../components/LinkPage.vue'
import PageNotfound from '../components/PageNotfound.vue'

const history = createWebHistory()
const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    }, 
    {
        path: '/:notfoundpath(.*)',
        name: 'PageNotfound',
        component: PageNotfound
    },
    {
        path: '/:id',
        name: 'LinkPage',
        component: LinkPage
    }

]

const router = createRouter({history,routes})

export default router