import { createRouter, createWebHistory } from "vue-router"
import About from "../components/About.vue"
import Home from "../components/PlacesList.vue"
import OwnerRentingHouses from "../components/RentingHouses.vue"
import OwnerRentingHousesPhanTom from "../components/RentingHousesPhantom.vue"
import OwnerRentingHousesPhanTomFix from "../components/RentingHousesPhantomFix.vue"


const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    // PHANTOM
    {
        path: '/user/CN00001/renting-houses',
        name: 'renting-houses',
        component: OwnerRentingHouses,
    },
    {
        path: '/user/CN00001/renting-houses-phantom',
        name: 'renting-houses-phantom',
        component: OwnerRentingHousesPhanTom,
    },
    {
        path: '/user/CN00001/renting-houses-phantom-fix',
        name: 'renting-houses-phantom-fix',
        component: OwnerRentingHousesPhanTomFix,
    },
    {
        path: '/about',
        name: 'about',
        component: About,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;