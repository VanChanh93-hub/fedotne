<template>
  <!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Danh Sách Sản Phẩm</title>
  <!-- Bootstrap 5 CDN -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>

<div class="container mt-5">
  <h2 class="text-center mb-4">Danh Sách Sản Phẩm</h2>
  <div class="table-responsive">
    <table class="table table-hover table-bordered align-middle">
      <thead class="table-primary">
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Tên Sản Phẩm</th>
          <th scope="col">Giá (VNĐ)</th>
          <th scope="col">Mô Tả</th>
        </tr>
      </thead>
      <tbody>
        <!-- Hiển thị dữ liệu từ API -->
        <tr v-for="(product, index) in products" :key="product.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ product.name }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>







</body>
</html>

</template>


<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
const name = ref('')
const price = ref('')
const description = ref('')
const products = ref([])
async function getSanPham() {
  try {
    const res = await axios.get('https://localhost:7057/api/products')
    products.value = res.data
    console.log(products.value)
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}
onMounted(() => {
  getSanPham()
  //, getCate()
})

</script>
