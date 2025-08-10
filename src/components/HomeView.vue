<template>
  <!-- Header -->
  <div class="container py-5 animate-fadein position-relative">
    <!-- Nút chỉnh sửa góc phải -->
    <button
      class="btn btn-outline-primary btn-edit position-absolute top-0 end-0 mt-3 me-3"
      style="z-index:10"
      @click="goToEdit"

    >
      <i class="bi bi-pencil-square"></i> Chỉnh sửa
    </button>

    <div class="row align-items-center">
      <!-- Left -->
      <div class="col-md-6 text-center text-md-start">
        <h1 class="fw-bold animate-slidein mb-0">
          Xin chào, mình là <span class="highlight">{{ personalInfo.fullName }}</span>
        </h1>
        <h4 class="text-muted mb-3">{{ personalInfo.jobTitle }}</h4>
        <p>
          <i class="bi bi-envelope-fill text-danger me-2"></i>{{ personalInfo.email }}
        </p>
        <p>
          <i class="bi bi-telephone-fill text-success me-2"></i>{{ personalInfo.phone }}
        </p>
        <div class="social my-3 d-flex gap-2 justify-content-center justify-content-md-start" v-for="link in sociallinks" :key="link.id">
          <a v-if="link.facebook" :href="link.facebook" target="_blank" class="social-anim"><i class="bi bi-facebook"></i></a>
          <a v-if="link.github" :href="link.github" target="_blank" class="social-anim"><i class="bi bi-github"></i></a>
          <a v-if="link.linkedIn" :href="link.linkedIn" target="_blank" class="social-anim"><i class="bi bi-linkedin"></i></a>
        </div>
      </div>

      <!-- Right -->
      <div class="col-md-6 text-center">
        <img :src="personalInfo.avatarUrl" alt="Avatar" class="avatar avatar-anim">
        <div class="card mt-3 animate-fadein-up">
          <div class="card-body ">
            <p class="mb-0" style="font-size: 14px;">
              {{ personalInfo.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Kỹ năng lập trình -->
      <div class="d-flex flex-wrap mt-4 gap-3 justify-content-center animate-fadein-delay">
        <div class="text-center skill-card" v-for="lang in prolanguages" :key="lang.id">
          <img
            :src="lang.icon"
            width="40"
            class="skill-icon hover-grow"
          />
          <div class="small mt-1">{{ lang.name }}</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Dự án cá nhân -->
  <div class="container my-5 animate-fadein-up">
    <h3 class="text-secondary mb-4">📁 Dự án cá nhân</h3>
    <div class="row g-4">
      <div class="col-md-6" v-for="project in projects" :key="project.id">
        <div class="card shadow-sm h-100 project-card">
          <img :src="project.imageProject" class="card-img-top project-img" >
          <div class="card-body">
            <h5 class="card-title">{{ project.projectName }}</h5>
            <p class="card-text">
             {{ project.description }}
            </p>
            <p class="mb-1"><strong>Bắt đầu:</strong> {{ formatDate(project.startDate) }}</p>
            <p class="mb-1"><strong>Kết thúc:</strong> {{ formatDate(project.endDate) }}</p>
            <a :href="project.projectURL" target="_blank" class="card-link">🔗 Xem dự án</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <router-view />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'


const personalInfo = ref({})
const prolanguages = ref([])
const sociallinks = ref([])
const projects = ref([])

async function getpersonalInfo() {
  try {
    const apiUrl = import.meta.env.VITE_API_URL
    const res = await axios.get(`${apiUrl}/api/personalinfoes/all`)
    personalInfo.value = res.data[0]
    console.log(personalInfo.value)
  } catch (error) {
    console.error(error)
  }
}

async function getProLanguages() {
  try {
    const apiUrl = import.meta.env.VITE_API_URL
    const res = await axios.get(`${apiUrl}/api/programminglanguages`)
    prolanguages.value = res.data
    console.log(prolanguages.value)
  } catch (error) {
    console.error(error)
  }
}
async function getSocialLinks() {
  try {
    const apiUrl = import.meta.env.VITE_API_URL
    const res = await axios.get(`${apiUrl}/api/sociallinks`)
    sociallinks.value = res.data
    console.log(sociallinks.value)
  } catch (error) {
    console.error(error)
  }
}


function formatDate(dateString) {
  if (!dateString) return ''
  // Cắt phần T00:00:00 nếu có
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

async function getProjects() {
  try {
    const apiUrl = import.meta.env.VITE_API_URL
    const res = await axios.get(`${apiUrl}/api/projects`)
    projects.value = res.data
  } catch (error) {
    console.error(error)
  }
}

function goToEdit() {
  window.location.href = "https://fedotne-jbzn.vercel.app/edit";
}

onMounted(() => {
  getpersonalInfo()
  getProLanguages()
  getSocialLinks()
  getProjects()
})
</script>


