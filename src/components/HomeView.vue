<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Danh Sách Sản Phẩm</h2>
    <div class="table-responsive">
      <table class="table table-hover table-bordered align-middle">
        <thead class="table-primary">
          <tr>
            <th>STT</th>
            <th>Tên Sản Phẩm</th>
            <th>Giá (VNĐ)</th>
            <th>Mô Tả</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in products" :key="product.id">
            <th>{{ index + 1 }}</th>
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const products = ref([])

async function getSanPham() {
  try {
    const apiUrl = import.meta.env.VITE_API_URL
    const res = await axios.get(`${apiUrl}/api/products`)
    products.value = res.data
    console.log(products.value)
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getSanPham()
})
</script>
