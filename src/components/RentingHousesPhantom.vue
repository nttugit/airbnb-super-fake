<script>
const API_URL = import.meta.env.VITE_SERVER_API;
const OWNER_RENTING_HOUSE_PHANTOM_ROUTE = import.meta.env
  .VITE_OWNER_RENTING_HOUSE_PHANTOM_ROUTE;
const PHOTOS = [
  "https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2255&q=80",
  "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
  "https://images.unsplash.com/photo-1556020685-ae41abfc9365?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2249&q=80",
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
  "https://images.unsplash.com/photo-1505693314120-0d443867891c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2591&q=80",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
  "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2255&q=80",
  "https://images.unsplash.com/photo-1522156373667-4c7234bbd804?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjF9&auto=format&fit=crop&w=930&q=80",
  "https://images.unsplash.com/photo-1494203484021-3c454daf695d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80",
  "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80",
];

export default {
  data() {
    return {
      // Initialize data properties
      mainData: {
        chuNha: {},
        danhSachNhaChoThue: [],
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
        const getRentingHousesAPI = `${API_URL}/${OWNER_RENTING_HOUSE_PHANTOM_ROUTE}/${this.userID}`;
        console.log("API: " + getRentingHousesAPI);
        const response = await fetch(getRentingHousesAPI);
        const data = await response.json();
        this.mainData = data;
        this.mainData.danhSachNhaChoThue.map((house, index) => {
          house.photo = PHOTOS[index];
        });
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
      <h3>
        Số lượng nhà cho thuê của chủ nhà
        <i>{{ mainData.chuNha.tenKH }}</i>
        : {{ mainData.chuNha.soLuongNhaChoThue }}
      </h3>
    </div>
    <ul>
      <RentingHouseCard
        v-for="(house, id) in mainData.danhSachNhaChoThue"
        :key="id"
        :price="house.tienThue1Thang"
        :photo="house.photo"
        :title="house.title"
        :type="house.tenLoaiNha"
        :rooms="house.soLuongPhong"
      ></RentingHouseCard>
    </ul>
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

  h3 {
    font-weight: 600;
    font-size: 1.8rem;
    color: #333333;
    margin-left: 35px;
  }

  span {
    font-weight: 500;
    font-size: 1.4rem;
    color: #4f4f4f;
  }
}
</style>
