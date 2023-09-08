import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router"
import RentingHouseCard from "./components/RentingHouseCard.vue"

const app = createApp(App);
app.use(router);
app.component("RentingHouseCard", RentingHouseCard);
app.use(createPinia());
app.mount("#app");
