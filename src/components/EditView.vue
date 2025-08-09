<template>
  <div class="container py-5 animate-fadein">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div class="card shadow-lg edit-card">

          <!-- Menu ngay trên form -->
          <nav class="top-menu shadow-sm">
            <ul class="menu-list">
              <li :class="{active: activeTab === 'personal'}" @click="activeTab = 'personal'">
                <i class="bi bi-person"></i> Thông tin cá nhân
              </li>
              <li :class="{active: activeTab === 'social'}" @click="activeTab = 'social'">
                <i class="bi bi-link-45deg"></i> Social Links
              </li>
              <li :class="{active: activeTab === 'projects'}" @click="activeTab = 'projects'">
                <i class="bi bi-briefcase"></i> Dự án cá nhân
              </li>
              <li :class="{active: activeTab === 'languages'}" @click="activeTab = 'languages'">
                <i class="bi bi-code-slash"></i> Ngôn ngữ lập trình
              </li>
            </ul>
          </nav>

          <div class="card-body">

            <!-- Form: Thông tin cá nhân -->
            <form v-if="activeTab === 'personal'" @submit.prevent="submitForm">
              <h2 class="mb-4 text-center text-primary fw-bold">
                <i class="bi bi-pencil-square me-2"></i>Chỉnh sửa thông tin cá nhân
              </h2>
              <div class="mb-3 text-center">
                <img :src="form.avatarUrl " class="avatar-edit mb-2" />
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">Chọn ảnh</label>
                <input type="file" @change="changeAvatar" accept="image/*" class="form-control" />
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">Họ và tên</label>
                <input type="text" v-model="form.fullName" class="form-control" required />
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">Nghề nghiệp</label>
                <input type="text" v-model="form.jobTitle" class="form-control" required />
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">Email</label>
                <input type="email" v-model="form.email" class="form-control" required />
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">Số điện thoại</label>
                <input type="text" v-model="form.phone" class="form-control" required />
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">Mô tả</label>
                <textarea v-model="form.description" class="form-control" rows="3" required></textarea>
              </div>
              <div class="d-flex justify-content-between mt-4">
                <button type="button" class="btn btn-secondary px-4" @click="goBack">
                  <i class="bi bi-arrow-left"></i> Quay lại
                </button>
                <button type="submit" class="btn btn-primary px-4 btn-save">
                  <i class="bi bi-save"></i> Lưu thay đổi
                </button>
              </div>
            </form>

            <!-- Form: Social Links -->

             <form v-if="activeTab === 'social'" @submit.prevent="updateSocialLinks">
    <h2 class="mb-4 text-center text-primary fw-bold">
      <i class="bi bi-link-45deg me-2"></i>Social Links
    </h2>

    <label class="form-label fw-semibold">Facebook</label>
    <input
      type="url"
      class="form-control"
      placeholder="https://facebook.com/"
      v-model="socialLinks.facebook"
    />

    <label class="form-label fw-semibold">Github</label>
    <input
      type="url"
      class="form-control"
      placeholder="https://github.com/"
      v-model="socialLinks.github"
    />

    <label class="form-label fw-semibold">Linkedin</label>
    <input
        type="url"
  class="form-control"
  placeholder="https://www.linkedin.com/"
  v-model="socialLinks.linkedin"
    />

    <div class="text-end mt-3">
      <button type="submit" class="btn btn-primary btn-save">Lưu</button>
    </div>
  </form>


            <!-- Form: Dự án cá nhân -->
             <form v-if="activeTab === 'projects'" @submit.prevent="updateAllProjects">
    <h2 class="mb-4 text-center text-primary fw-bold">
      <i class="bi bi-briefcase me-2"></i>Dự án cá nhân
    </h2>
<button
      type="button"
      class="btn btn-outline-primary mb-3"
      @click="openAddProjectPopup "
    >
      + Thêm dự án
    </button>
    <div class="mb-3" v-for="(project, index) in projects" :key="index">
      <!-- Tên dự án -->
      <label class="form-label fw-semibold">Tên dự án {{ index + 1 }}</label>
      <input type="text" v-model="projects[index].projectName" class="form-control" />

      <!-- Mô tả -->
      <label class="form-label fw-semibold mt-2">Mô tả {{ index + 1 }}</label>
      <textarea v-model="projects[index].description" class="form-control"></textarea>

      <!-- Ngày bắt đầu -->
      <label class="form-label fw-semibold mt-2">Ngày bắt đầu {{ index + 1 }}</label>
      <input type="date" v-model="projects[index].startDate" class="form-control" />

      <!-- Ngày kết thúc -->
      <label class="form-label fw-semibold mt-2">Ngày kết thúc {{ index + 1 }}</label>
      <input type="date" v-model="projects[index].endDate" class="form-control" />

      <!-- URL dự án -->
      <label class="form-label fw-semibold mt-2">URL dự án {{ index + 1 }}</label>
      <input type="url" v-model="projects[index].projectURL" placeholder="https://example.com" class="form-control" />

      <!-- Hình ảnh -->
      <label class="form-label fw-semibold mt-2">Hình ảnh dự án {{ index + 1 }}</label>
      <input type="file" @change="handleFileChange($event, index)" class="form-control" />

      <!-- Nút xóa -->
      <button
        type="button"
        class="btn btn-sm btn-outline-danger mt-2"
        @click="removeProject(index)"
      >
        <i class="bi bi-trash"></i> Xóa dự án
      </button>
      <hr>
    </div>
    <div class="text-end">
      <button type="submit" class="btn btn-primary btn-save">Lưu</button>
    </div>
  </form>
            <div v-if="showAddPopup" class="modal-backdrop">
              <div class="modal-box">
                <h5 class="mb-3">Thêm dự án mới</h5>

                <label class="form-label fw-semibold">Tên dự án</label>
                <input type="text" v-model="newProject.projectName" class="form-control" />

                <label class="form-label fw-semibold mt-2">Mô tả</label>
                <textarea v-model="newProject.description" class="form-control"></textarea>

                <label class="form-label fw-semibold mt-2">Ngày bắt đầu</label>
                <input type="date" v-model="newProject.startDate" class="form-control" />

                <label class="form-label fw-semibold mt-2">Ngày kết thúc</label>
                <input type="date" v-model="newProject.endDate" class="form-control" />

                <label class="form-label fw-semibold mt-2">URL dự án</label>
                <input type="url" v-model="newProject.projectURL" class="form-control" />

                <label class="form-label fw-semibold mt-2">Hình ảnh</label>
                <input type="file" @change="handleFileChange($event, null)" class="form-control" />

                <div class="text-end mt-3">
                  <button class="btn btn-secondary me-2" @click="showAddPopup = false">Hủy</button>
                  <button class="btn btn-primary" @click="addProject">Thêm</button>
                </div>
              </div>
            </div>

            <form v-if="activeTab === 'languages'" @submit.prevent="updateLanguage">
              <h2 class="mb-4 text-center text-primary fw-bold">
                <i class="bi bi-code-slash me-2"></i>Ngôn ngữ lập trình
              </h2>
              <button
      type="button"
      class="btn btn-outline-primary mb-3"
      @click="openAddProgrammingLanguagePopup">
      + Thêm ngôn ngữ
    </button>
              <div class="mb-3" v-for="(lang, index) in prolanguages" :key="index">
                <label class="form-label fw-semibold">Ngôn ngữ {{ index + 1 }}</label>
                <input type="text" v-model="lang.name" class="form-control" placeholder="VD: JavaScript..." />
                <label class="form-label fw-semibold">Hình ảnh {{ index + 1 }}</label>
                <input type="file" @change="handleProlanguageFileChange($event, index)" class="form-control" />
<button
        type="button"
        class="btn btn-sm btn-outline-danger mt-2"
        @click="removeLanguage(index)"
      >
        <i class="bi bi-trash"></i> Xóa ngôn ngữ
      </button>
              </div>

              <div class="text-end">
                <button type="submit" class="btn btn-primary btn-save">Lưu</button>
              </div>
            </form>

             <div v-if="showaddProlanguagePopup" class="modal-backdrop">
              <div class="modal-box">
                <h5 class="mb-3">Thêm ngôn ngữ lập trình</h5>

                <label class="form-label fw-semibold">Tên ngôn ngữ</label>
                <input type="text" v-model="newProgrammingLanguage.name" class="form-control" />
                <label class="form-label fw-semibold mt-2">Hình ảnh</label>
                <input type="file" @change="handleProlanguageFileChange($event, null)" class="form-control" />
                <div class="text-end mt-3">
                  <button class="btn btn-secondary me-2" @click="showaddProlanguagePopup = false">Hủy</button>
                  <button class="btn btn-primary" @click="addProgrammingLanguage">Thêm</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted ,watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const activeTab = ref('personal')

const form = ref({
  fullName: '',
  age: '',
  jobTitle: '',
  email: '',
  phone: '',
  description: '',
  avatarUrl: ''
})
const showaddProlanguagePopup = ref(false);
const showAddPopup = ref(false);
const newProject = ref({
  projectName: '',
  description: '',
  startDate: '',
  endDate: '',
  imageProject: '',
  projectURL: ''
});
const socialLinks = ref({
  facebook: '',
  github: '',
  linkedin: ''
});
const projects = ref([{
   name: '', description: '', startDate: '', endDate: '', imageProject: '' ,projectURL: ''
  }])

const newProgrammingLanguage = ref({
  name: '',
  icon: ''
})
const prolanguages = ref([{
  name: '',
  icon: ''
}])
async function getProlanguages() {
  try {
    const apiUrl = import.meta.env.VITE_API_URL
    const res = await axios.get(`${apiUrl}/api/programminglanguages`)
    if (Array.isArray(res.data)) {
      prolanguages.value = res.data.map(lang => ({
        ...lang,
        icon: lang.icon || ''
      }))
    }
  } catch (e) {
    console.error('Lỗi khi lấy ngôn ngữ lập trình:', e)
  }
}
async function fetchProjects() {
  try {
    const apiUrl = import.meta.env.VITE_API_URL
    const res = await axios.get(`${apiUrl}/api/projects`)

    if (Array.isArray(res.data)) {
      projects.value = res.data.map(project => ({
        ...project,
        imageProject: project.imageProject || '',
        startDate: project.startDate ? project.startDate.split('T')[0] : '',
        endDate: project.endDate ? project.endDate.split('T')[0] : ''
      }))
    }
  } catch (e) {
    console.error('Lỗi khi lấy dự án:', e)
  }
}
async function fetchPersonalInfo() {
  try {
    const apiUrl = import.meta.env.VITE_API_URL
    const res = await axios.get(`${apiUrl}/api/personalinfoes/all`)
    if (res.data && res.data[0]) {
      Object.assign(form.value, res.data[0])
    }
  } catch (e) {
    console.error('Lỗi khi lấy thông tin cá nhân:', e)
  }
}
async function getSocialLinks() {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const res = await axios.get(`${apiUrl}/api/sociallinks`);

    // Nếu API trả về mảng thì lấy phần tử đầu tiên
    const data = Array.isArray(res.data) ? res.data[0] : res.data;

    socialLinks.value.id = data.id || null;
    socialLinks.value.facebook = data.facebook || '';
    socialLinks.value.github = data.github || '';
    socialLinks.value.linkedin = data.linkedIn || '';
  } catch (err) {
    console.error('Lỗi khi lấy social links:', err);
  }
}
async function updateAllProjects() {
  const apiUrl = import.meta.env.VITE_API_URL;

  for (const project of projects.value) {
    const formData = new FormData();
    formData.append('id', project.id);
    formData.append('projectName', project.projectName);
    formData.append('description', project.description);
    formData.append('startDate', project.startDate);
    formData.append('endDate', project.endDate);
    formData.append('projectURL', project.projectURL);

    if (project.imageProject instanceof File) {
      formData.append('imageProject', project.imageProject);
    }

    await axios.put(`${apiUrl}/api/projects/${project.id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }

  alert('Cập nhập dự án thành công!');
  fetchProjects();
}
async function updateSocialLinks() {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    await axios.put(`${apiUrl}/api/sociallinks/${socialLinks.value.id}`, socialLinks.value);
    alert('Cập nhật social links thành công!');
    getSocialLinks();
  } catch (err) {
    console.error('Lỗi khi cập nhật social links:', err);
    alert('Cập nhật social links không thành công. Vui lòng thử lại sau.');
  }
}
async function updateLanguage() {
  try {
    const apiUrl = import.meta.env.VITE_API_URL
    for(const prol of prolanguages.value) {
      const formData = new FormData();
      formData.append('id', prol.id || '');
      formData.append('name', prol.name);
      if (prol.icon instanceof File) {
        formData.append('icon', prol.icon);
      }

      await axios.put(`${apiUrl}/api/programminglanguages/${prol.id || ''}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    }
    alert(`Cập nhật thành công!`)
    getProlanguages()

  } catch (error) {
    console.error('Lỗi khi cập nhật:', error)
    alert('Cập nhật thất bại!')
  }
}
async function addProgrammingLanguage() {
 try{
   const apiUrl = import.meta.env.VITE_API_URL;
    const formData = new FormData();

    formData.append('name', newProgrammingLanguage.value.name);
    if (newProgrammingLanguage.value.icon instanceof File) {
      formData.append('icon', newProgrammingLanguage.value.icon);
    }

    await axios.post(`${apiUrl}/api/programminglanguages`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    alert('Thêm ngôn ngữ lập trình thành công!');
    showaddProlanguagePopup.value = false;
    getProlanguages(); // load lại danh sách ngôn ngữ lập trình
 } catch (error) {
    console.error('Lỗi khi thêm ngôn ngữ lập trình:', error);
    alert('Thêm ngôn ngữ lập trình thất bại!');
 }
 }


async function addProject() {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const formData = new FormData();

    formData.append('projectName', newProject.value.projectName);
    formData.append('description', newProject.value.description);
    formData.append('startDate', newProject.value.startDate);
    formData.append('endDate', newProject.value.endDate);
    formData.append('projectURL', newProject.value.projectURL);

    if (newProject.value.imageProject instanceof File) {
      formData.append('imageProject', newProject.value.imageProject);
    }

    await axios.post(`${apiUrl}/api/projects`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    alert('Thêm dự án thành công!');
    showAddPopup.value = false;
    fetchProjects(); // load lại danh sách
  } catch (error) {
    console.error('Lỗi khi thêm dự án:', error);
    alert('Thêm dự án thất bại!');
  }
}

//delete project
async function removeProject(index) {
  if (!projects.value[index].id) {
    projects.value.splice(index, 1);
    return;
  }
  const apiUrl = import.meta.env.VITE_API_URL;
  try {
    await axios.delete(`${apiUrl}/api/projects/${projects.value[index].id}`);
    projects.value.splice(index, 1);
    alert('Xóa dự án thành công!');
    fetchProjects();
  } catch (error) {
    console.error('Lỗi khi xóa dự án:', error);
    alert('Xóa dự án thất bại!');
  }
}
async function removeLanguage(index) {
  if (!prolanguages.value[index].id) {
    prolanguages.value.splice(index, 1);
    return;
  }
  const apiUrl = import.meta.env.VITE_API_URL;
  try {
    await axios.delete(`${apiUrl}/api/programminglanguages/${prolanguages.value[index].id}`);
    prolanguages.value.splice(index, 1);
    alert('Xóa ngôn ngữ lập trình thành công!');
    getProlanguages();
  } catch (error) {
    console.error('Lỗi khi xóa ngôn ngữ lập trình:', error);
    alert('Xóa ngôn ngữ lập trình thất bại!');
  }
}
async function submitForm() {
  const formData = new FormData()
  formData.append('fullName', form.value.fullName)
  formData.append('jobTitle', form.value.jobTitle)
  formData.append('email', form.value.email)
  formData.append('phone', form.value.phone)
  formData.append('description', form.value.description)
  if (form.value.avatarUrl) {
    formData.append('avatarUrl', form.value.avatarUrl)
  }
  try {
    const apiUrl = import.meta.env.VITE_API_URL
    await axios.put(`${apiUrl}/api/personalinfoes/${form.value.id}`, formData,
      { headers: { 'Content-Type': 'multipart/form-data' } })
    alert('Cập nhật thành công!')
    fetchPersonalInfo() // reload thông tin cá nhân
  } catch (e) {
    console.error('Lỗi khi cập nhật thông tin:', e)
    alert('Cập nhật không thành công. Vui lòng thử lại sau.')
  }

}

function openAddProjectPopup() {
  // Reset form mỗi khi mở popup
  newProject.value = {
    projectName: '',
    description: '',
    startDate: '',
    endDate: '',
    imageProject: '',
    projectURL: ''
  };
  showAddPopup.value = true;
}
function openAddProgrammingLanguagePopup() {
  newProgrammingLanguage.value = {
    name: '',
    icon: ''
  };
  showaddProlanguagePopup.value = true;
}
function changeAvatar(e) {
  form.value.avatarUrl = e.target.files[0]
}
function goBack() {
  router.back()
}
watch(activeTab, (val) => {
  if (val === 'social') {
    getSocialLinks();
  }
});
function handleFileChange(event, index) {
  const file = event.target.files[0];
  if (index !== null) {
    projects.value[index].imageProject = file;
  } else {
    newProject.value.imageProject = file;
  }
}
function handleProlanguageFileChange(event, index) {
  const file = event.target.files[0];
  if (index !== null) {
    prolanguages.value[index].icon = file;
  } else {
    newProgrammingLanguage.value.icon = file;
  }
}
onMounted(() => {
  fetchPersonalInfo(), fetchProjects(), getProlanguages()

})
</script>
<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-box {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
}
</style>
