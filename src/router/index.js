import { createRouter, createWebHistory } from "vue-router"
import About from "../components/About.vue"
import Home from "../components/PlacesList.vue"
import CreateRentingHouse from "../components/CreateRentingHouse.vue"
import OwnerRentingHouses from "../components/RentingHouses.vue"
import OwnerRentingHousesPhanTom from "../components/RentingHousesPhantom.vue"
import OwnerRentingHousesPhanTomFix from "../components/RentingHousesPhantomFix.vue"

// DIRTY READ
import OwnerSellingHousesDirtyRead from "../components/SellingHouses.vue"
import OwnerSellingHousesDirtyReadFix from "../components/SellingHousesDirtyReadFix.vue"
import UpdateSellingHouse from "../components/UpdateSellingHouse.vue"


const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    // PHANTOM
    {
        path: '/user/create-renting-house',
        name: 'create-renting-house',
        component: CreateRentingHouse,
    },
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

    // DIRTY READ
    {
        path: '/user/CN00099/selling-houses-dirty-read',
        name: 'selling-houses-dirty-read',
        component: OwnerSellingHousesDirtyRead,
    },
    {
        path: '/user/CN00099/selling-houses-dirty-read-fix',
        name: 'selling-houses-dirty-read-fix',
        component: OwnerSellingHousesDirtyReadFix,
    },
    {
        path: '/update-selling-houses/NB00099',
        name: 'update-selling-houses',
        component: UpdateSellingHouse
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