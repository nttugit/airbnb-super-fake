<template>
  <div>
    <h1>Cập nhật thông tin bán nhà</h1>
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
            placeholder="Nhà bán bao to"
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
            placeholder="23/51"
            v-model="formData.houseNumber"
          />
        </div>
        <div class="form-group">
          <label for="street">Tên đường:</label>
          <input
            type="text"
            id="street"
            v-model="formData.street"
            placeholder="Cô Giang"
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
            placeholder="1"
          />
        </div>
        <div class="form-group">
          <label for="city">Thành phố:</label>
          <input
            type="text"
            id="city"
            v-model="formData.city"
            placeholder="Hồ Chí Minh"
          />
        </div>
      </div>

      <div class="row">
        <div class="form-group">
          <div>
            <label for="houseType">Loại nhà</label>
            <select id="houseType">
              <option value="1" selected>Chung cư</option>
              <option value="2">Nhà riêng</option>
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
            placeholder="9"
            v-model="formData.numOfRooms"
          />
        </div>
      </div>
      <!-- thong tin cho thue nha -->
      <div class="row">
        <div class="form-group">
          <label for=""><h2>Thông tin bán:</h2></label>
        </div>
      </div>
      <div class="row">
        <div class="form-group">
          <label for="price">Giá bán:</label>
          <input
            type="number"
            id="price"
            v-model="formData.price"
            placeholder="1000000000001"
          />
        </div>
        <div class="form-group">
          <label for="period">Điều kiện bán:</label>
          <input
            type="text"
            id="period"
            v-model="formData.period"
            placeholder="Phải trả trước 70%, số tiền còn lại có thể trả góp trong vòng 3 năm."
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

      <!-- Add other input fields here -->
      <button type="submit">Cập nhật</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
const API_URL = import.meta.env.VITE_SERVER_API;
const UPDATE_SELLING_HOUSE_ROUTE = import.meta.env
  .VITE_UPDATE_SELLING_HOUSE_ROUTE;

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
      const getRentingHousesAPI = `${API_URL}/${UPDATE_SELLING_HOUSE_ROUTE}`;
      // alert("Đang xử lý .....");
      console.log("API: " + getRentingHousesAPI);

      axios
        .put(getRentingHousesAPI, {
          sellingHouseId: "NB00099",
          // price: 1000000000001,
          price: this.formData.price,
        })
        .then((response) => {
          if (response.data == "Success") {
            alert("Cập nhật thành công");
            // this.$router.push({ name: "renting-houses" });
          } else {
            alert("Cập nhật thất bại");
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
