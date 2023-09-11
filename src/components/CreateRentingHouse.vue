<template>
  <div>
    <h1>Tạo tin nhà cho thuê</h1>
    <form @submit.prevent="submitForm">
      <div class="row">
        <div class="form-group"></div>
        <div class="form-group"></div>
      </div>
      <!-- Title -->
      <div class="row">
        <div class="form-group">
          <label for="title">Tiêu đề:</label>
          <input
            type="text"
            id="title"
            v-model="formData.title"
            placeholder="Cho thuê nhà gần trường Sư Phạm, Tự Nhiên, Sài Gòn"
            required
          />
        </div>
      </div>

      <!-- Address -->
      <div class="row">
        <div class="form-group">
          <label for=""><h2>Địa chỉ:</h2></label>
        </div>
      </div>
      <!-- So nha, ten duong-->
      <div class="row">
        <div class="form-group">
          <label for="houseNumber">Số nhà:</label>
          <input
            type="text"
            id="houseNumber"
            placeholder="64/12/2"
            v-model="formData.houseNumber"
            required
          />
        </div>
        <div class="form-group">
          <label for="street">Tên đường:</label>
          <input
            type="text"
            id="street"
            v-model="formData.street"
            placeholder="An Dương Vương"
            required
          />
        </div>
      </div>
      <!-- quan, thanh pho -->

      <div class="row">
        <div class="form-group">
          <label for="district">Quận/Huyện:</label>
          <input
            type="text"
            id="district"
            v-model="formData.district"
            placeholder="5"
            required
          />
        </div>
        <div class="form-group">
          <label for="city">Thành phố:</label>
          <input
            type="text"
            id="city"
            v-model="formData.city"
            placeholder="Hồ Chí Minh"
            required
          />
        </div>
      </div>

      <div class="row">
        <div class="form-group">
          <div>
            <label for="houseType">Loại nhà</label>
            <select id="houseType" v-model="formData.houseType">
              <option value="1">Chung cư</option>
              <option value="2" selected>Nhà riêng</option>
              <option value="3">Đất nền dự án</option>
              <option value="4">Đất nền dự án</option>
              <option value="5">Biệt thự, liền kề</option>
              <option value="6">Trang trại, khu nghỉ dưỡng</option>
              <!-- Add more house types as needed -->
            </select>
          </div>
        </div>
        <div class="form-group">
          <label for="numOfRooms">Số lượng phòng:</label>
          <input
            type="number"
            id="numOfRooms"
            placeholder="3"
            v-model="formData.numOfRooms"
            required
          />
        </div>
      </div>
      <!-- thong tin cho thue nha -->
      <div class="row">
        <div class="form-group">
          <label for=""><h2>Thông tin cho thuê:</h2></label>
        </div>
      </div>
      <div class="row">
        <div class="form-group">
          <label for="rentalPrice">Giá cho thuê (tháng):</label>
          <input
            type="number"
            id="rentalPrice"
            v-model="formData.rentalPrice"
            placeholder="6500000"
            required
          />
        </div>
        <div class="form-group">
          <label for="period">Thời hạn thuê:</label>
          <input
            type="number"
            id="period"
            v-model="formData.period"
            placeholder="18"
            required
          />
        </div>
      </div>

      <!-- Hinh anh -->
      <div class="row">
        <div class="form-group">
          <label for="images">Hình ảnh (tối thiểu 3 hình):</label>
          <input
            type="file"
            id="images"
            ref="imageInput"
            multiple
            @change="previewImages"
          />
          <div class="image-preview" v-if="imagePreviews.length > 0">
            <div v-for="(preview, index) in imagePreviews" :key="index">
              <img
                :src="preview"
                alt="Image Preview"
                width="100"
                height="100"
              />
            </div>
          </div>
        </div>
      </div>

      <button type="submit">Tạo</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
const API_URL = import.meta.env.VITE_SERVER_API;
const CREATE_RENTING_HOUSE_ROUTE = import.meta.env
  .VITE_CREATE_RENTING_HOUSE_ROUTE;

export default {
  data() {
    return {
      formData: {
        images: [],
        title: "",
        rentalPrice: null,
        // Add other form fields here
      },
      imagePreviews: [],
    };
  },
  methods: {
    previewImages() {
      this.imagePreviews = [];
      const files = this.$refs.imageInput.files;
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreviews.push(e.target.result);
        };
        reader.readAsDataURL(files[i]);
      }
    },
    submitForm() {
      const getRentingHousesAPI = `${API_URL}/${CREATE_RENTING_HOUSE_ROUTE}`;
      // alert("Đang xử lý .....");
      console.log("API: " + getRentingHousesAPI);

      axios
        .post(getRentingHousesAPI, {
          title: "Cho thuê nhà gần trường Sư Phạm, Tự Nhiên, Sài Gòn",
          houseId: "N000005",
          ownerId: "CN00001",
          rentalPrice: 6500000,
          period: 18,
        })
        .then((response) => {
          if (response.data == "Success") {
            alert("Tạo thành công");
            this.$router.push({ name: "renting-houses" });
          } else {
            alert("Tạo thất bại");
            // window.location.reload();
            // this.$router.push({ name: "create-renting-house" });
          }
          //   console.log("API response:", response.data);
          // Clear form fields or perform other actions as needed
          //   this.formData = {
          //     images: [],
          //     title: "",
          //     rentalPrice: null,
          //     // Reset other form fields
          //   };
          //   this.imagePreviews = [];
          //   alert(response.data);
        })
        .catch((error) => {
          console.error("API error:", error);
        });
    },
  },
};
</script>

<style scoped>
/* Add CSS styling for your form here */
.container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

h1 {
  text-align: center;
  font-size: 30px;
}

form {
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.form-group {
  flex: 1;
}

label {
  font-weight: bold;
  margin-bottom: 5px; /* Adjust the margin-bottom for spacing */
  font-size: 15px;
}

input[type="text"],
input[type="number"],
input[type="file"],
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 10px 0;
}

button[type="submit"] {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}

/* Add more styling as needed */
</style>
