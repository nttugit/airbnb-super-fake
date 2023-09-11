<script>
// import axios from "axios";

const API_URL = import.meta.env.VITE_SERVER_API;
const OWNER_SELLING_HOUSE_DIRTY_READ_ROUTE = import.meta.env
  .VITE_OWNER_SELLING_HOUSE_DIRTY_READ_ROUTE;
import PHOTOS from "../stores/photos.json";

export default {
  data() {
    return {
      // Initialize data properties
      mainData: {
        danhSachNhaBan: [],
      },
      fullUrl: window.location.href,
      pathname: "", // Pathname (e.g., '/products/12345')
      // query: "", // Query string (e.g., '?param1=value1&param2=value2')
      userID: "",
    };
  },
  created() {
    // Fetch data or perform any asynchronous operations here
    const url = new URL(this.fullUrl);
    this.pathname = url.pathname;
    this.userID = this.pathname.split("/")[2];

    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const getSellingHousesAPI = `${API_URL}/${OWNER_SELLING_HOUSE_DIRTY_READ_ROUTE}/${this.userID}`;
        console.log("API: " + getSellingHousesAPI);
        const response = await fetch(getSellingHousesAPI);

        const data = await response.json();

        this.mainData = data;
        this.mainData.danhSachNhaBan.map((house, index) => {
          house.photo = PHOTOS[index];
        });
        console.log("MAIN DATA: " + this.mainData);
        // USE axios
        // const response = await axios.get(getRentingHousesAPI);
        // console.log("Data received:", response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
};
</script>

<template>
  <div v-if="mainData">
    <div class="num-of-renting-houses">
      <h2>Danh sách nhà bán của chủ nhà</h2>
    </div>
    <ul>
      <RentingHouseCard
        v-for="(house, id) in mainData.danhSachNhaBan"
        :key="id"
        :price="house.giaBan"
        :photo="house.photo"
        :title="house.title"
        :type="house.tenLoaiNha"
        :rooms="house.soLuongPhong"
      ></RentingHouseCard>
    </ul>
  </div>
  <div v-else>
    <h1>Loading...</h1>
  </div>
</template>

<style lang="scss" scoped>
ul {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(35rem, 40rem));
  justify-content: center;
  gap: 3.2rem;
}

.num-of-renting-houses {
  font-family: "Montserrat", sans-serif;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.5rem;

  h2 {
    font-weight: 600;
    font-size: 2rem;
    color: #333333;
    // margin-left: 125px;
    // text-align: center;
    margin: 0 auto;
  }

  span {
    font-weight: 500;
    font-size: 1.4rem;
    color: #4f4f4f;
  }
}
</style>
